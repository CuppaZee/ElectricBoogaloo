import { ClanV2 } from "@cuppazee/api/clan/main";
import { ClanV2Requirements } from "@cuppazee/api/clan/requirements";
import { Type, TypeState, TypeTags } from "@cuppazee/types";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { dayjsMHQPlugin } from "./dayjsmhq";
dayjs.extend(utc);
dayjs.extend(dayjsMHQPlugin);

export class GameID {
  private _gameID: number;
  private _dayjs: Dayjs;

  constructor(game_id: number);
  constructor(date: Dayjs);
  constructor(year: number, month: number);
  constructor();
  constructor(a?: number | Dayjs, b?: number) {
    if (typeof a === "number" && typeof b === "undefined") {
      this._gameID = a;
    } else if (typeof a === "number" && typeof b === "number") {
      this._gameID = a * 12 + b - 24158;
    } else if (typeof a === "object") {
      this._gameID = a.get("year") * 12 + a.get("month") - 24158;
    } else if (!a && !b) {
      this._gameID = dayjs.mhqNow().get("year") * 12 + dayjs.mhqNow().get("month") - 24158;
    } else {
      throw "Invalid input";
    }
    this._dayjs = dayjs(
      new Date(Math.floor((this._gameID + 24158) / 12), (this._gameID + 24158) % 12)
    );
  }

  get month() {
    return this._dayjs.month();
  }

  get year() {
    return this._dayjs.year();
  }

  get game_id() {
    return this._gameID;
  }

  get date() {
    return this._dayjs.toDate();
  }
}

export const requirementMeta: {
  [task_id: string]: {
    task_id: number;
    top: string;
    bottom: string;
    total?: "min";
    meta: {
      activity: ("capture" | "deploy" | "capon")[];
      days?: boolean;
      points?: boolean;
      types?: (munzee: Type) => boolean;
      exclude?: (munzee: Type) => boolean;
    };
    hidden?: string[];
  };
} = {
  1: {
    task_id: 1,
    top: "Days of",
    bottom: "Activity",
    total: "min",
    meta: {
      activity: ["capture", "deploy"],
      days: true,
      exclude: i => i.state === TypeState.Locationless,
    },
  },
  2: {
    task_id: 2,
    top: "Total",
    bottom: "Captures",
    meta: {
      activity: ["capture"],
    },
  },
  3: {
    task_id: 3,
    top: "Total",
    bottom: "Points",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
    },
    hidden: ["u89"],
  },
  6: {
    task_id: 6,
    top: "Total",
    bottom: "Deploys",
    meta: {
      activity: ["deploy"],
      points: true,
      exclude: i => ["personalmunzee", "premiumpersonal"].includes(i.icon),
    },
  },
  7: {
    task_id: 7,
    top: "Dest.",
    bottom: "Points",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeDestination),
      exclude: i => i.icon === "skyland",
    },
  },
  9: {
    task_id: 9,
    top: "Greenie",
    bottom: "Captures",
    meta: {
      activity: ["capture"],
      types: i => i.icon === "munzee",
    },
  },
  10: {
    task_id: 10,
    top: "Deploy",
    bottom: "Points",
    meta: {
      activity: ["deploy"],
      points: true,
      exclude: i => ["personalmunzee", "premiumpersonal"].includes(i.icon),
    },
  },
  12: {
    task_id: 12,
    top: "Evo",
    bottom: "Points",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.Evolution),
    },
  },
  13: {
    task_id: 13,
    top: "Places",
    bottom: "Captures",
    meta: {
      activity: ["capture"],
      types: i => i.has_tag(TypeTags.TypePOI),
    },
  },
  14: {
    task_id: 14,
    top: "Jewel",
    bottom: "Activity",
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeJewel),
    },
  },
  17: {
    task_id: 17,
    top: "Evo",
    bottom: "Activity",
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.Evolution),
    },
  },
  19: {
    task_id: 19,
    top: "Jewel",
    bottom: "Points",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeJewel),
    },
  },
  20: {
    task_id: 20,
    top: "Weapon",
    bottom: "Deploys",
    meta: {
      activity: ["deploy"],
      types: i => i.has_tag(TypeTags.TypeWeaponClan),
    },
  },
  22: {
    task_id: 22,
    top: "Urban Fit",
    bottom: "Activity",
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.icon === "urbanfit",
    },
  },
  23: {
    task_id: 23,
    top: "Weapon",
    bottom: "Points",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeWeaponClan),
    },
  },
  24: {
    task_id: 24,
    top: "Bouncer",
    bottom: "Captures",
    meta: {
      activity: ["capture"],
      types: i => i.state === TypeState.Bouncer,
    },
  },
  25: {
    task_id: 25,
    top: "Mystery",
    bottom: "Activity",
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeMystery),
    },
  },
  26: {
    task_id: 26,
    top: "Weapon",
    bottom: "Activity",
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeWeaponClan),
    },
  },
  27: {
    task_id: 27,
    top: "Zodiac",
    bottom: "Activity",
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeZodiac),
    },
  },
  28: {
    task_id: 28,
    top: "Flat",
    bottom: "Points",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeFlat),
    },
  },
  29: {
    task_id: 29,
    top: "Elemental",
    bottom: "Points",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i =>
        i.has_tag(TypeTags.Evolution) &&
        (!i.has_tag(TypeTags.Scatter) ||
          ["fire", "waterdroplet", "frozengreenie", "charge"].includes(i.icon)),
    },
  },
  30: {
    task_id: 30,
    top: "Reseller",
    bottom: "Activity",
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeReseller),
    },
  },
  31: {
    task_id: 31,
    top: "Gaming",
    bottom: "Points",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeGaming),
    },
  },
  32: {
    task_id: 32,
    top: "Gaming",
    bottom: "Activity",
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeGaming),
    },
  },
  33: {
    task_id: 33,
    top: "Renovate",
    bottom: "Destination",
    meta: {
      activity: ["capture"],
      types: i => i.icon === "renovation",
    },
  },
  34: {
    task_id: 34,
    top: "Mystery",
    bottom: "Points",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeMystery),
    },
  },
  35: {
    task_id: 35,
    top: "QRewZee",
    bottom: "Captures",
    meta: {
      activity: ["capture"],
      types: i => i.icon === "qrewzee",
    },
  },
  36: {
    task_id: 36,
    top: "Card",
    bottom: "Points",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.Card),
    },
  },
};

export interface ClanShadowData {
  members: number[];
  usernames: { [user_id: string]: string };
  data: {
    [task_id: string]: {
      [user_id: string]: number | "?";
    };
  };
  details: {
    group: string;
    group_admins: string[];
    name?: string;
  };
};

export interface ClanRewardsData {
  battle: {
    game_id: number;
    start: number;
    end: number;
    reveal_at: number;
    lb_total_task_id: number;
    title: string;
  };
  levels: {
    [reward_id: string]: number;
  }[];
  rewards: {
    [reward_id: string]: {
      reward_id: number;
      name: string;
      logo: string;
    };
  };
  order: number[];
};

export interface ClanStatsUser {
  username: string | null;
  user_id: number;
  admin: boolean;
  shadow: boolean;
  requirements: {
    [task_id: string]: {
      value?: number;
      level?: number;
    };
  };
  level: number;
};

export interface ClanStatsData {
  users: { [user_id: string]: ClanStatsUser };
  requirements: {
    [task_id: string]: {
      value: number;
      level?: number;
    };
  };
  level: number;
};

export interface ClanRequirements {
  tasks: {
    individual: {
      [task_id: string]: number[];
    };
    group: {
      [task_id: string]: number[];
    };
  };
  individual: number[];
  group: number[];
  all: number[];
  isAprilFools: boolean;
};

export function generateClanRequirements(requirements?: ClanV2Requirements["response"]["data"]) {
  let isAprilFools = false;
  if (!requirements || requirements.data.levels instanceof Array) return null;
  if (!requirements || requirements.data.levels instanceof Array) return null;
  const data: ClanRequirements = {
    tasks: {
      individual: {},
      group: {},
    },
    individual: [],
    group: [],
    all: [],
    isAprilFools,
  };

  for (const level of Object.keys(requirements.data.levels).sort((a, b) => Number(b) - Number(a))) {
    const l = requirements.data.levels[level];
    for (const indiv of l.individual) {
      if (!data.individual.includes(indiv.task_id)) data.individual.push(indiv.task_id);
      if (!data.tasks.individual[indiv.task_id]) data.tasks.individual[indiv.task_id] = [];
      data.tasks.individual[indiv.task_id][Number(level)] = indiv.amount;

      if (!requirementMeta[indiv.task_id])
        requirementMeta[indiv.task_id] = {
          task_id: indiv.task_id,
          top: indiv.name.split(" ")[0],
          bottom: indiv.name.split(" ").slice(1).join(" "),
          meta: {
            activity: [],
          },
        };
    }
    for (const group of l.group) {
      if (!data.group.includes(group.task_id)) data.group.push(group.task_id);
      if (!data.tasks.group[group.task_id]) data.tasks.group[group.task_id] = [];
      data.tasks.group[group.task_id][Number(level)] = group.amount;

      if (!requirementMeta[group.task_id])
        requirementMeta[group.task_id] = {
          task_id: group.task_id,
          top: group.name.split(" ")[0],
          bottom: group.name.split(" ").slice(1).join(" "),
          meta: {
            activity: [],
          },
        };
    }
  }

  // Prevent Higher Requirements on Lower Levels
  for (const level of [2, 3, 4, 5]) {
    for (const task in data.tasks.individual) {
      const t = data.tasks.individual[task];
      if (t[level - 1]) {
        t[level] = Math.max(t[level - 1] || 0, t[level] || 0);
      }
    }
    for (const task in data.tasks.group) {
      const t = data.tasks.group[task];
      if (t[level - 1]) {
        t[level] = Math.max(t[level - 1] || 0, t[level] || 0);
      }
    }
  }

  data.all = [
    ...data.individual.filter(i => !data.group.includes(i)),
    ...data.individual.filter(i => data.group.includes(i)),
    ...data.group.filter(i => !data.individual.includes(i)),
  ];

  return data;
}

export function generateClanStats(
  clan?: ClanV2["response"]["data"],
  stats?: ClanV2Requirements["response"]["data"],
  requirements?: ClanRequirements,
  actual_clan_id?: number,
  shadow?: ClanShadowData
) {
  if (!clan || !requirements || !stats || stats.data.levels instanceof Array) return null;
  const data: ClanStatsData = {
    users: {},
    requirements: {},
    level: 5,
  };

  if (shadow && stats.battle.end * 1000 > Date.now()) {
    for (const user of shadow.members) {
      data.users[user] = {
        username: shadow.usernames[user],
        user_id: user,
        admin: false,
        shadow: true,
        requirements: {},
        level: 5,
      };
    }
  }

  if ((actual_clan_id || 0) >= 0 && stats.battle.end * 1000 > Date.now()) {
    for (const user of clan.users) {
      data.users[Number(user.user_id)] = {
        username: user.username,
        user_id: Number(user.user_id),
        admin: user.is_admin === "1",
        shadow: false,
        requirements: {},
        level: 5,
      };
    }
  }
  const allTasks = [
    ...(stats?.data.levels["5"]?.individual || []),
    ...(stats?.data.levels["5"]?.group || []),
  ];
  for (const level of ["4", "3", "2", "1"]) {
    for (const task of [
      ...(stats?.data.levels[level]?.individual || []),
      ...(stats?.data.levels[level]?.group || []),
    ]) {
      if (!allTasks.some(i => i.task_id === task.task_id)) {
        allTasks.push(task);
      }
    }
  }
  for (const task of allTasks) {
    // Setup Requirement
    data.requirements[task.task_id] = {
      value: requirementMeta[task.task_id]?.total === "min" ? Infinity : 0,
      level: 0,
    };
    for (const user_id of [
      ...((actual_clan_id || 0) < 0 ? [] : Object.keys(task.data) || []),
      ...((stats.battle.end * 1000 > Date.now() ? shadow?.members : []) || []).filter(
        i => data.users[i]?.shadow
      ),
    ]) {
      // Add Left User if Necessary
      if (!data.users[user_id]) {
        data.users[user_id] = {
          username:
            clan.users.find(i => i.user_id === user_id.toString())?.username ?? `#${user_id}`,
          user_id: Number(user_id),
          admin: (clan.users.find(i => i.user_id === user_id.toString())?.is_admin ?? "0") === "1",
          shadow: false,
          requirements: {},
          level: 5,
        };
      }
      const user = data.users[user_id];
      const valuePreConvert =
        task.data[user_id] !== undefined
          ? task.data[user_id]
          : shadow?.data[task.task_id]?.[user_id];
      const value =
        valuePreConvert === undefined || valuePreConvert === null
          ? valuePreConvert
          : Number(valuePreConvert);

      // Add to Clan Total
      if (requirementMeta[task.task_id]?.total === "min") {
        data.requirements[task.task_id].value = Math.min(
          data.requirements[task.task_id].value,
          value ?? Infinity
        );
      } else {
        data.requirements[task.task_id].value += value ?? 0;
      }

      // Set Requirement Value
      user.requirements[task.task_id] = {
        value,
        level: 0,
      };

      // Calculate Level
      if (requirements.tasks.individual[task.task_id]) {
        for (let level = 1; level <= 5; level++) {
          if ((requirements.tasks.individual[task.task_id][level] || 0) <= (value ?? Infinity)) {
            user.requirements[task.task_id].level = level;
          }
        }
        user.level = Math.min(user.level, user.requirements[task.task_id].level || 0);
      } else {
        user.requirements[task.task_id].level = -1;
      }
    }
    // Calculate Clan Total Level
    if (requirements.tasks.group[task.task_id]) {
      for (let level = 1; level <= 5; level++) {
        if (
          (requirements.tasks.group[task.task_id][level] || 0) <=
          data.requirements[task.task_id].value
        ) {
          data.requirements[task.task_id].level = level;
        }
      }
      data.level = Math.min(data.level, data.requirements[task.task_id].level || 0);
    } else {
      data.requirements[task.task_id].level = -1;
    }
  }

  return data;
}
