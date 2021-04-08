import {
  StatzeePlayerDay,
  StatzeePlayerDayCapture,
  StatzeePlayerDayCaptureOn,
  StatzeePlayerDayDeploy,
} from "@cuppazee/api/statzee/player/day";
import db, { TypeCategory, TypeState, TypeTags, DestinationType, Type } from "@cuppazee/types";

export type UserActivityData = StatzeePlayerDay["response"]["data"];
// Omit<
//   StatzeePlayerDay["response"]["data"],
//   "captures" | "deploys" | "captures_on"
// > & {
//   captures: (StatzeePlayerDayCapture & { key: string })[];
//   deploys: (StatzeePlayerDayDeploy & { key: string })[];
//   captures_on: (StatzeePlayerDayCaptureOn & { key: string })[];
// };

export type UserActivityItem = {
  type: "capture" | "capon" | "deploy" | "passive_deploy";
  creator?: string;
  capper?: string;
  code: string;
  name: string;
  pin: string;
  points: number;
  subCaptures?: UserActivityItem[];
  time: string;
  bouncerHost?: boolean;
  key: string;
  sub?: boolean;
  munzee_type?: Type | null | undefined;
};

export type UserActivityOverviewType = {
  points: number;
  count: number;
  types: {
    [key: string]: {
      points: number;
      count: number;
    };
  };
  users: {
    [key: string]: {
      points: number;
      count: number;
    };
  };
};

export type UserActivityConverterOutput = {
  categories: TypeCategory[];
  list: UserActivityItem[];
  points: number;
  captures: UserActivityOverviewType;
  deploys: Omit<UserActivityOverviewType, "users">;
  passive_deploys: Omit<UserActivityOverviewType, "users">;
  capons: UserActivityOverviewType;
};

export type UserActivityFilters = {
  activity: Set<"captures" | "deploys" | "captures_on">;
  state: Set<TypeState>;
  category: Set<TypeCategory>;
};

export function ActivityFilterer(dataraw: UserActivityData, filters?: UserActivityFilters) {
  function filter(
    activity_entry: StatzeePlayerDayCapture | StatzeePlayerDayDeploy | StatzeePlayerDayCaptureOn,
    activity_type: "captures" | "deploys" | "captures_on"
  ) {
    if (!filters) return true;
    if (filters.activity.size != 0 && !filters.activity.has(activity_type)) return false;
    let g = db.getType(activity_entry.pin);
    if (!g) return true;
    if (filters.state.size != 0 && !filters.state.has(g.state)) return false;
    if (filters.category.size != 0 && (!g.category || !filters.category.has(g.category)))
      return false;
    return true;
  }
  return {
    captures: dataraw?.captures.filter(i => filter(i, "captures")) ?? [],
    deploys: dataraw?.deploys.filter(i => filter(i, "deploys")) ?? [],
    captures_on: dataraw?.captures_on.filter(i => filter(i, "captures_on")) ?? [],
  };
}

export function ActivityConverter(
  dataraw: UserActivityData,
  filters: any,
  userdata: any
): UserActivityConverterOutput {
  var data = ActivityFilterer(dataraw, filters);
  var activityList: UserActivityItem[] = [];
  for (const capture of data.captures.filter(
    i => db.getType(i.pin)?.meta.destination_type === DestinationType.Bouncer
  )) {
    activityList.push({
      type: "capture",
      creator: capture.username,
      capper: userdata?.username,
      code: capture.code,
      name: capture.friendly_name,
      pin: capture.pin,
      points: Number(capture.points),
      subCaptures: [],
      time: capture.captured_at,
      bouncerHost: true,
      key: `c/${capture.capture_id}/${userdata?.username}`,
      munzee_type: db.getType(capture.pin),
    });
  }
  for (const capture of data.captures.filter(
    i =>
      db.getType(i.pin)?.has_tag(TypeTags.BouncerHost) ||
      i.pin.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./)
  )) {
    activityList.push({
      type: "capture",
      creator: capture.username,
      capper: userdata?.username,
      code: capture.code,
      name: capture.friendly_name,
      pin: capture.pin,
      points: Number(capture.points),
      subCaptures: [],
      time: capture.captured_at,
      bouncerHost: true,
      key: `c/${capture.capture_id}/${userdata?.username}`,
      munzee_type: db.getType(capture.pin),
    });
  }
  for (const capture of data.captures.filter(
    i =>
      db.getType(i.pin)?.meta.destination_type !== DestinationType.Bouncer &&
      !db.getType(i.pin)?.has_tag(TypeTags.BouncerHost) &&
      !i.pin.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./)
  )) {
    const bouncerHost = activityList.findIndex(i => i.bouncerHost && i.time == capture.captured_at);
    if (bouncerHost !== -1) {
      activityList[bouncerHost].subCaptures?.push({
        type: "capture",
        creator: capture.username,
        capper: userdata?.username,
        code: capture.code,
        name: capture.friendly_name,
        pin: capture.pin,
        points: Number(capture.points),
        time: capture.captured_at,
        key: `c/${capture.capture_id}/${userdata?.username}`,
        sub: true,
        munzee_type: db.getType(capture.pin),
      });
    } else {
      activityList.push({
        type: "capture",
        creator: capture.username,
        capper: userdata?.username,
        code: capture.code,
        name: capture.friendly_name,
        pin: capture.pin,
        points: Number(capture.points),
        subCaptures: [],
        time: capture.captured_at,
        key: `c/${capture.capture_id}/${userdata?.username}`,
        munzee_type: db.getType(capture.pin),
      });
    }
  }

  for (const capture of data.captures_on) {
    const ownCapture = activityList.findIndex(
      i =>
        i.type === "capture" &&
        i.time === capture.captured_at &&
        i.creator === userdata?.username &&
        i.code === capture.code &&
        i.pin === capture.pin
    );
    if (ownCapture !== -1) {
      activityList[ownCapture].points += Number(capture.points_for_creator);
    } else {
      activityList.push({
        type: "capon",
        creator: userdata?.username,
        capper: capture.username,
        code: capture.code,
        name: capture.friendly_name,
        pin: capture.pin,
        points: Number(capture.points_for_creator),
        subCaptures: [],
        time: capture.captured_at,
        key: `co/${capture.capture_id}/${userdata?.username}`,
        munzee_type: db.getType(capture.pin),
      });
    }
  }

  for (const deploy of data.deploys) {
    activityList.push({
      type:
        db.getType(deploy.pin)?.has_tag(TypeTags.Bouncer) ||
        db.getType(deploy.pin)?.has_tag(TypeTags.Scatter)
          ? "passive_deploy"
          : "deploy",
      creator: userdata?.username,
      code: deploy.code,
      name: deploy.friendly_name,
      pin: deploy.pin,
      points: Number(deploy.points),
      subCaptures: [],
      time: deploy.deployed_at,
      key: `d/${deploy.id}/${userdata?.username}`,
      munzee_type: db.getType(deploy.pin),
    });
  }
  activityList.sort((a, b) => new Date(b.time).valueOf() - new Date(a.time).valueOf());
  // var heightTotal = 0;
  // for(const index in activityList) {
  //   const h = 8 + (59 * ((activityList[index].subCaptures?.length||0)+1));
  //   activityList[index] = {
  //     ...activityList[index],
  //     height: h,
  //     offset: heightTotal
  //   }
  //   heightTotal += h;
  // }
  return {
    list: activityList,
    categories: Array.from(
      [
        ...(dataraw?.captures ?? []),
        ...(dataraw?.deploys ?? []),
        ...(dataraw?.captures_on ?? []),
      ].reduce((a, b) => {
        const c = db.getType(b.pin)?.category;
        if (c) a.add(c);
        return a;
      }, new Set<TypeCategory>())
    ),
    points: ([
      ...data.captures_on,
      ...data.captures,
      ...data.deploys,
    ] as const).reduce(
      (a, b) => a + Number("points_for_creator" in b ? b.points_for_creator : b.points),
      0
    ),
    ...activityList.map(i=>[i, ...i.subCaptures ?? []]).flat().reduce(
      (ax, b) => {
        const a = ax[`${b.type}s` as const];
        return {
          ...ax,
          [`${b.type}s` as const]: {
            points: a.points + Number(b.points),
            count: a.count + 1,
            types: {
              ...a.types,
              [b.pin]: {
                points: (a.types[b.pin]?.points || 0) + Number(b.points),
                count: (a.types[b.pin]?.count || 0) + 1,
              },
            },
            users:
              "users" in a
                ? {
                    ...a.users,
                    [b.creator || ""]: {
                      points: (a.types[b.creator || ""]?.points || 0) + Number(b.points),
                      count: (a.types[b.creator || ""]?.count || 0) + 1,
                    },
                  }
                : undefined,
          },
        };
      },
      {
        captures: {
          points: 0,
          count: 0,
          types: {},
          users: {},
        } as UserActivityOverviewType,
        capons: {
          points: 0,
          count: 0,
          types: {},
          users: {},
        } as UserActivityOverviewType,
        deploys: {
          points: 0,
          count: 0,
          types: {},
        } as Omit<UserActivityOverviewType, "users">,
        passive_deploys: {
          points: 0,
          count: 0,
          types: {},
        } as Omit<UserActivityOverviewType, "users">,
      }
    ),
  };
}
