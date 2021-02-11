import { ClanV2Challenges } from "@cuppazee/api/clan/challenges";
import { ClanV2 } from "@cuppazee/api/clan/main";
import { ClanV2Requirements } from "@cuppazee/api/clan/requirements";
import { Type, TypeState, TypeTags } from "@cuppazee/types";
import dayjs from "dayjs";

export function monthToGameID(year?: number, month?: number) {
  let now = dayjs().tz("America/Chicago");
  let y = year !== undefined ? year : now.year();
  let m = month !== undefined ? month : now.month();
  return y * 12 + m - 24158;
}

export function gameIDToMonth(gameID: number) {
  let t = gameID + 24158;
  return {
    m: t % 12,
    y: Math.floor(t / 12),
  };
}

export const requirementMeta: {
  [task_id: string]: {
    task_id: number;
    top: string;
    bottom: string;
    icon: string;
    icons?: string[];
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
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    total: "min",
    meta: {
      activity: ["capture", "deploy"],
      days: true,
      exclude: (i) => i.state === TypeState.Locationless,
    },
  },
  2: {
    task_id: 2,
    top: "Total",
    bottom: "Captures",
    icon: "captured",
    meta: {
      activity: ["capture"],
    },
  },
  3: {
    task_id: 3,
    top: "Total",
    bottom: "Points",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
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
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    meta: {
      activity: ["deploy"],
      points: true,
      exclude: (i) => ["personalmunzee", "premiumpersonal"].includes(i.icon),
    },
  },
  7: {
    task_id: 7,
    top: "Dest.",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/hotel.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/1starmotel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtualresort.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i) => i.has_tag(TypeTags.TypeDestination),
      exclude: (i) => i.icon === "skyland",
    },
  },
  10: {
    task_id: 10,
    top: "Deploy",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    meta: {
      activity: ["deploy"],
      points: true,
      exclude: (i) => ["personalmunzee", "premiumpersonal"].includes(i.icon),
    },
  },
  12: {
    task_id: 12,
    top: "Evo",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i) => i.has_tag(TypeTags.Evolution),
    },
  },
  13: {
    task_id: 13,
    top: "Places",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/poi_filter.png",
    meta: {
      activity: ["capture"],
      types: (i) => i.has_tag(TypeTags.TypePOI),
    },
  },
  14: {
    task_id: 14,
    top: "Jewel",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/aquamarine.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/diamond.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtualonyx.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i) => i.has_tag(TypeTags.TypeJewel),
    },
  },
  17: {
    task_id: 17,
    top: "Evo",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i) => i.has_tag(TypeTags.Evolution),
    },
  },
  19: {
    task_id: 19,
    top: "Jewel",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/diamond.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/aquamarine.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtual_citrine.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i) => i.has_tag(TypeTags.TypeJewel),
    },
  },
  20: {
    task_id: 20,
    top: "Weapon",
    bottom: "Deploys",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/catapult.png",
    ],
    meta: {
      activity: ["deploy"],
      types: (i) => i.has_tag(TypeTags.TypeWeaponClan),
    },
  },
  23: {
    task_id: 23,
    top: "Weapon",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/catapult.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i) => i.has_tag(TypeTags.TypeWeaponClan),
    },
  },
  24: {
    task_id: 24,
    top: "Bouncer",
    bottom: "Captures",
    icon:
      "https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png",
      "https://munzee.global.ssl.fastly.net/images/pins/theunicorn.png",
      "https://munzee.global.ssl.fastly.net/images/pins/nomad.png",
      "https://munzee.global.ssl.fastly.net/images/pins/muru.png",
    ],
    meta: {
      activity: ["capture"],
      types: (i) => i.state === TypeState.Bouncer,
    },
  },
  25: {
    task_id: 25,
    top: "Mystery",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mystery.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mystery.png",
      "https://munzee.global.ssl.fastly.net/images/pins/airmystery.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i) => i.has_tag(TypeTags.TypeMystery),
    },
  },
  26: {
    task_id: 26,
    top: "Weapon",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/crossbow.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i) => i.has_tag(TypeTags.TypeWeaponClan),
    },
  },
  27: {
    task_id: 27,
    top: "Zodiac",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/zodiac.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/zodiac.png",
      "https://munzee.global.ssl.fastly.net/images/pins/scorpio.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i) => i.has_tag(TypeTags.TypeZodiac),
    },
  },
  28: {
    task_id: 28,
    top: "Flat",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png",
      "https://munzee.global.ssl.fastly.net/images/pins/flatlou.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i) => i.has_tag(TypeTags.TypeFlat),
    },
  },
  29: {
    task_id: 29,
    top: "Elemental",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/earthmystery.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/icemystery.png",
      "https://munzee.global.ssl.fastly.net/images/pins/earthmystery.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i) =>
        i.has_tag(TypeTags.Evolution) &&
        (!i.has_tag(TypeTags.Scatter) ||
          ["fire", "waterdroplet", "frozengreenie", "charge"].includes(i.icon)),
    },
  },
  30: {
    task_id: 30,
    top: "Reseller",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/reseller.png",
    meta: {
      activity: ["capture", "deploy"],
      types: (i) => i.has_tag(TypeTags.TypeReseller),
    },
  },
  31: {
    task_id: 31,
    top: "Gaming",
    bottom: "Points",
    icon:
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i) => i.has_tag(TypeTags.TypeGaming),
    },
  },
  32: {
    task_id: 32,
    top: "Gaming",
    bottom: "Activity",
    icon:
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i) => i.has_tag(TypeTags.TypeGaming),
    },
  },
  33: {
    task_id: 33,
    top: "Renovate",
    bottom: "Motel",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
      "https://munzee.global.ssl.fastly.net/images/pins/2starmotel.png",
    ],
    meta: {
      activity: ["capture"],
      types: (i) => i.icon === "renovation",
    },
  },
  34: {
    task_id: 34,
    top: "Mystery",
    bottom: "Points",
    icon: "https://i.ibb.co/YdRQ3Sf/Split-Mystery.png",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i) => i.has_tag(TypeTags.TypeMystery),
    },
  },
  35: {
    task_id: 35,
    top: "QRewZee",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/qrewzee.png",
    meta: {
      activity: ["capture"],
      types: (i) => i.icon === "qrewzee",
    },
  },
  36: {
    task_id: 36,
    top: "Card",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/envelope.png",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i) => i.has_tag(TypeTags.Card),
    },
  },
};

export type ClanShadowData = {
  members: number[];
  usernames: { [user_id: string]: string };
  data: {
    [task_id: string]: {
      [user_id: string]: number;
    };
  };
  details: {
    group: string;
    group_admins: string[];
    name?: string;
  };
};

export type ClanRewardsData = {
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

export type ClanStatsFormattedUser = {
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

export type ClanStatsFormattedData = {
  users: { [user_id: string]: ClanStatsFormattedUser };
  requirements: {
    [task_id: string]: {
      value: number;
      level?: number;
    };
  };
  level: number;
};

export type ClanStatsFormattedRequirements = {
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
};

export function ClanRequirementsConverter(
  requirements?: ClanV2Requirements["response"]["data"],
  rewards?: ClanRewardsData
) {
  if (!requirements || !rewards || requirements.data.levels instanceof Array)
    return null;
  const data: ClanStatsFormattedRequirements = {
    tasks: {
      individual: {},
      group: {},
    },
    individual: [],
    group: [],
    all: [],
  };

  for (const level of Object.keys(requirements.data.levels).sort(
    (a, b) => Number(b) - Number(a)
  )) {
    const l = requirements.data.levels[level];
    for (const indiv of l.individual) {
      if (!data.individual.includes(indiv.task_id))
        data.individual.push(indiv.task_id);
      if (!data.tasks.individual[indiv.task_id])
        data.tasks.individual[indiv.task_id] = [];
      data.tasks.individual[indiv.task_id][Number(level)] = indiv.amount;
    }
    for (const group of l.group) {
      if (!data.group.includes(group.task_id)) data.group.push(group.task_id);
      if (!data.tasks.group[group.task_id])
        data.tasks.group[group.task_id] = [];
      data.tasks.group[group.task_id][Number(level)] = group.amount;
    }
  }

  data.all = [
    ...data.individual.filter(i=>!data.group.includes(i)),
    ...data.individual.filter(i=>data.group.includes(i)),
    ...data.group.filter(i=>!data.individual.includes(i)),
  ]

  return data;
}

export function ClanStatsConverter(
  clan?: ClanV2["response"]["data"],
  stats?: ClanV2Requirements["response"]["data"],
  requirements?: ClanStatsFormattedRequirements,
  actual_clan_id?: number,
  shadow?: ClanShadowData
) {
  if (!clan || !requirements || !stats || stats.data.levels instanceof Array)
    return null;
  const data: ClanStatsFormattedData = {
    users: {},
    requirements: {},
    level: 5,
  };

  if (shadow) {
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

  if ((actual_clan_id || 0) >= 0 && stats.battle.end > Date.now()) {
    console.log(clan.result, monthToGameID());
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
  for (const task of [
    ...(stats?.data.levels["5"]?.individual || []),
    ...(stats?.data.levels["5"]?.group || []),
  ]) {
    // Setup Requirement
    data.requirements[task.task_id] = {
      value: 0,
      level: 0,
    };
    for (const user_id of [
      ...((actual_clan_id || 0) < 0 ? [] : (Object.keys(task.data) || [])),
      ...(shadow?.members || []).filter(i=>data.users[i]?.shadow),
    ]) {
      // Add Left User if Necessary
      if (!data.users[user_id]) {
        data.users[user_id] = {
          username: clan.users.find(i=>i.user_id === user_id.toString())?.username ?? `#${user_id}`,
          user_id: Number(user_id),
          admin: (clan.users.find(i=>i.user_id === user_id.toString())?.is_admin ?? "0") === "1",
          shadow: false,
          requirements: {},
          level: 5,
        };
      }
      const user = data.users[user_id];
      const value =
        task.data[user_id] ?? shadow?.data[task.task_id]?.[user_id];

      // Add to Clan Total
      data.requirements[task.task_id].value += value ?? 0;

      // Set Requirement Value
      user.requirements[task.task_id] = {
        value,
        level: 0,
      };

      // Calculate Level
      if (requirements.tasks.individual[task.task_id]) {
        for (let level = 1; level <= 5; level++) {
          if (
            (requirements.tasks.individual[task.task_id][level] || 0) <= value
          ) {
            user.requirements[task.task_id].level = level;
          }
        }
        user.level = Math.min(
          user.level,
          user.requirements[task.task_id].level || 0
        );
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
      data.level = Math.min(
        data.level,
        data.requirements[task.task_id].level || 0
      );
    } else {
      data.requirements[task.task_id].level = -1;
    }
  }

  return data;
}
