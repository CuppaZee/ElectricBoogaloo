import { StatzeePlayerDay } from "@cuppazee/api/statzee/player/day";
import { CuppaZeeDB, Type, Category, TypeState, TypeTags } from "@cuppazee/db";

export enum UserActivityType {
  Capture = "capture",
  Deploy = "deploy",
  Capon = "capon",
  PassiveDeploy = "passive_deploy",
}

export interface UserActivityItem {
  key: string;
  type: UserActivityType;
  creator?: string;
  capper?: string;
  code: string;
  name: string;
  icon: string;
  points: number;
  sub_captures?: UserActivityItem[];
  time: string;
  group_capture?: boolean;
  sub?: boolean;
  munzee_type?: Type;
}

export interface UserActivityOverviewType {
  points: number;
  count: number;
  types: {
    [icon: string]: {
      points: number;
      count: number;
    };
  };
}

export interface UserActivityData {
  categories: Category[];
  list: UserActivityItem[];
  points: number;
  overview: {
    [t: string]: UserActivityOverviewType;
  };
}

export interface UserActivityFilters {
  activity: Set<UserActivityType>;
  state: Set<TypeState>;
  category: Set<Category>;
}

export function generateUserActivityData(
  db: CuppaZeeDB,
  data: StatzeePlayerDay["response"]["data"],
  filters: UserActivityFilters,
  username?: string,
): UserActivityData | undefined {
  if (!data) {
    return undefined;
  }
  const activityList: UserActivityItem[] = [];

  // Bouncer Hosts
  for (const capture of data.captures.filter(
    i =>
      db.getType(i.pin)?.has_tag(TypeTags.BouncerHost) ||
      i.pin.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./) ||
      db.getType(i.pin)?.has_tag(TypeTags.DestinationBouncer) ||
      db.getType(i.pin)?.has_tag(TypeTags.DestinationRooms)
  )) {
    activityList.push({
      type: UserActivityType.Capture,
      creator: username,
      capper: capture.username,
      code: capture.code,
      name: capture.friendly_name,
      icon: capture.pin,
      points: Number(capture.points),
      sub_captures: [],
      time: capture.captured_at,
      group_capture: true,
      key: `c/${capture.capture_id}/${username}`,
      munzee_type: db.getType(capture.pin) || undefined,
    });
  }

  // Regular Captures
  for (const capture of data.captures.filter(
    i =>
      !(
        db.getType(i.pin)?.has_tag(TypeTags.BouncerHost) ||
        i.pin.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./) ||
        db.getType(i.pin)?.has_tag(TypeTags.DestinationBouncer) ||
        db.getType(i.pin)?.has_tag(TypeTags.DestinationRooms)
      )
  )) {
    const bouncerHost = activityList.findIndex(
      i => i.group_capture && i.time === capture.captured_at
    );
    if (bouncerHost !== -1) {
      activityList[bouncerHost].sub_captures?.push({
        type: UserActivityType.Capture,
        creator: capture.username,
        capper: username,
        code: capture.code,
        name: capture.friendly_name,
        icon: capture.pin,
        points: Number(capture.points),
        time: capture.captured_at,
        key: `c/${capture.capture_id}/${username}`,
        sub: true,
        munzee_type: db.getType(capture.pin) || undefined,
      });
    } else {
      activityList.push({
        type: UserActivityType.Capture,
        creator: capture.username,
        capper: username,
        code: capture.code,
        name: capture.friendly_name,
        icon: capture.pin,
        points: Number(capture.points),
        sub_captures: [],
        time: capture.captured_at,
        key: `c/${capture.capture_id}/${username}`,
        munzee_type: db.getType(capture.pin) || undefined,
      });
    }
  }

  // Capons
  for (const capture of data.captures_on) {
    const ownCapture = activityList.findIndex(
      i =>
        i.type === "capture" &&
        i.time === capture.captured_at &&
        i.creator === username &&
        i.code === capture.code &&
        i.icon === capture.pin
    );
    if (ownCapture !== -1) {
      activityList[ownCapture].sub_captures?.push({
        type: UserActivityType.Capon,
        creator: username,
        capper: capture.username,
        code: capture.code,
        name: capture.friendly_name,
        icon: capture.pin,
        points: Number(capture.points_for_creator),
        sub: true,
        time: capture.captured_at,
        key: `co/${capture.capture_id}/${username}`,
        munzee_type: db.getType(capture.pin) || undefined,
      });
    } else {
      activityList.push({
        type: UserActivityType.Capon,
        creator: username,
        capper: capture.username,
        code: capture.code,
        name: capture.friendly_name,
        icon: capture.pin,
        points: Number(capture.points_for_creator),
        sub_captures: [],
        time: capture.captured_at,
        key: `co/${capture.capture_id}/${username}`,
        munzee_type: db.getType(capture.pin) || undefined,
      });
    }
  }

  // Deploys
  for (const deploy of data.deploys) {
    activityList.push({
      type: db.getType(deploy.pin)?.has_tag(TypeTags.Scatter)
        ? UserActivityType.PassiveDeploy
        : UserActivityType.Deploy,
      creator: username,
      code: deploy.code,
      name: deploy.friendly_name,
      icon: deploy.pin,
      points: Number(deploy.points),
      time: deploy.deployed_at,
      key: `d/${deploy.id}/${username}`,
      munzee_type: db.getType(deploy.pin) || undefined,
    });
  }

  const userActivityData: UserActivityData = {
    list: activityList
      .filter(i => {
        return [i, ...i.sub_captures ?? []].some(item => {
          if (!filters) return true;
          if (filters.activity.size !== 0 && !filters.activity.has(item.type)) return false;
          let g = item.munzee_type;
          if (!g) return true;
          if (filters.state.size !== 0 && !filters.state.has(g.state)) return false;
          if (filters.category.size !== 0 && (!g.category || !filters.category.has(g.category)))
            return false;
          return true;
        });
      })
      .sort((a, b) => new Date(b.time).valueOf() - new Date(a.time).valueOf()),

    categories: Array.from(
      ([] as UserActivityItem[])
        .concat(...activityList.map(i => [i, ...(i.sub_captures ?? [])]))
        .reduce((a, b) => {
          const c = b.munzee_type?.category;
          if (c) a.add(c);
          return a;
        }, new Set<Category>())
    ),

    points: ([] as UserActivityItem[])
      .concat(...activityList.map(i => [i, ...(i.sub_captures ?? [])]))
      .reduce((a, b) => {
        return a + b.points;
      }, 0),

    overview: {},
  };

  for (const item of ([] as UserActivityItem[]).concat(
    ...userActivityData.list.map(i => [i, ...(i.sub_captures ?? [])])
  )) {
    if (!userActivityData.overview[item.type])
      userActivityData.overview[item.type] = {
        points: 0,
        count: 0,
        types: {},
      };
    const o = userActivityData.overview[item.type];

    userActivityData.overview[item.type] = {
      points: o.points + item.points,
      count: o.count + 1,
      types: {
        ...o.types,
        [item.icon]: {
          points: (o.types[item.icon]?.points || 0) + item.points,
          count: (o.types[item.icon]?.count || 0) + 1,
        },
      },
    };
  }

  return userActivityData;
}
