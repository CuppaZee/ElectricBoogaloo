import {
  StatzeePlayerDay,
  StatzeePlayerDayCapture,
  StatzeePlayerDayCaptureOn,
  StatzeePlayerDayDeploy,
  StatzeePlayerDayArchive,
} from "@cuppazee/api/statzee/player/day";
import { TypeState, TypeTags } from "@cuppazee/db";
import czdb from "../util/czdb";
import { gameID } from ".";
function g(a: { pin?: string; pin_icon?: string; icon?: string }) {
  return czdb.value.getType(a.pin || a.pin_icon || a.icon || "");
}
function points(a: any, b: any) {
  return a + Number(b.points_for_creator !== undefined ? b.points_for_creator : b.points);
}

var tasks: {
  [key: number]: {
    task_id: number;
    top: string;
    bottom: string;
    icon: string;
    icons?: string[];
    total?: "min";
    function: ({ cap, dep, con }: {
      cap: StatzeePlayerDayCapture[];
      dep: StatzeePlayerDayDeploy[];
      con: StatzeePlayerDayCaptureOn[];
      arc: StatzeePlayerDayArchive[];
      no_reduce?: boolean;
    }) => number | {[key: string]: void} | "?";
  }
} = {
  1: {
    task_id: 1,
    top: "Days of",
    bottom: "Activity",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    total: "min",
    function: ({ cap, dep }) =>
      [...cap, ...dep]
        .filter(
          i => !g(i)?.has_tag(TypeTags.TypePersonal) && !g(i)?.has_tag(TypeTags.TypeUniversal) && (!("captured_at" in i) || !g(i)?.has_tag(TypeTags.Scatter))
        )
        .reduce((a, b) => {
          a[("captured_at" in b ? b.captured_at : b.deployed_at).slice(8, 10)] = true as unknown as void;
          return a;
        }, {} as {[key: string]: void}),
  },
  3: {
    task_id: 3,
    top: "Total",
    bottom: "Points",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].reduce(points, 0),
  },
  6: {
    task_id: 6,
    top: "Total",
    bottom: "Deploys",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    function: ({ dep, no_reduce }) => { // arc, 
      return [...dep] //...arch
        .filter(i => !g(i)?.has_tag(TypeTags.TypePersonal))
        .reduce((a, b) => {
          // if (b.archived_at) {
          //   if (no_reduce) {
          //     a[b.id] = "delete";
          //   } else {
          //     delete a[b.id];
          //   }
          // } else {
            a[b.id] = true as unknown as void;
          // }
          return a;
        }, {} as {[key: string]: void});
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
    function: ({ cap, dep, con }) =>
      [...cap, ...dep, ...con]
        .filter(i => g(i)?.has_tag(TypeTags.TypeDestination))
        .reduce(points, 0),
  },
  8: {
    task_id: 8,
    top: "Physical",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/munzee.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png",
    ],
    function: ({ cap, dep, con }) =>
      [...cap, ...dep, ...con].filter(i => g(i)?.state === TypeState.Physical).reduce(points, 0),
  },
  9: {
    task_id: 9,
    top: "Greenie",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/munzee.png",
    function: ({ cap }) => cap.filter((i: any) => g(i)?.icon === "munzee").length,
  },
  10: {
    task_id: 10,
    top: "Deploy",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    function: ({ dep }) =>
      dep.filter((i: any) => !g(i)?.has_tag(TypeTags.TypePersonal)).reduce(points, 0),
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
    function: ({ cap, dep, con }) =>
      [...cap, ...dep, ...con].filter(i => g(i)?.has_tag(TypeTags.Evolution)).reduce(points, 0),
  },
  13: {
    task_id: 13,
    top: "Places",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/poi_filter.png",
    function: ({ cap }) => cap.filter((i: any) => g(i)?.has_tag(TypeTags.TypePOI)).length,
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
    function: ({ cap, dep }) =>
      [...dep, ...cap].filter(i => g(i)?.has_tag(TypeTags.TypeJewel)).length,
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
    function: ({ cap, dep }) =>
      [...dep, ...cap].filter(i => g(i)?.has_tag(TypeTags.Evolution)).length,
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
    function: ({ cap, dep, con }) =>
      [...cap, ...dep, ...con].filter(i => g(i)?.has_tag(TypeTags.TypeJewel)).reduce(points, 0),
  },
  22: {
    task_id: 22,
    top: "Urban Fit",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
    ],
    function: ({ cap, dep }) =>
      [...cap, ...dep].filter(i => g(i)?.icon === "urbanfit").length,
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
    function: ({ cap, dep, con }) =>
      [...cap, ...dep, ...con]
        .filter(i => g(i)?.has_tag(TypeTags.TypeWeaponClan) || g(i)?.icon === "trojanunicorn")
        .reduce(points, 0),
  },
  24: {
    task_id: 24,
    top: "Bouncer",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png",
      "https://munzee.global.ssl.fastly.net/images/pins/theunicorn.png",
      "https://munzee.global.ssl.fastly.net/images/pins/nomad.png",
      "https://munzee.global.ssl.fastly.net/images/pins/muru.png",
    ],
    function: ({ cap }) => cap.filter((i: any) => g(i)?.has_tag(TypeTags.Bouncer)).length,
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
    function: ({ cap, dep }) =>
      [...cap, ...dep].filter(i => g(i)?.has_tag(TypeTags.TypeMystery)).length,
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
    function: ({ cap, dep }) =>
      [...cap, ...dep].filter(i => g(i)?.has_tag(TypeTags.TypeWeaponClan) || g(i)?.icon === "trojanunicorn").length,
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
    function: ({ cap, dep }) =>
      [...cap, ...dep].filter(i => g(i)?.has_tag(TypeTags.TypeZodiac)).length,
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
    function: ({ cap, dep, con }) =>
      [...cap, ...dep, ...con].filter(i => g(i)?.has_tag(TypeTags.TypeFlat)).reduce(points, 0),
  },
  29: {
    task_id: 29,
    top: "Elemental",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/earthmystery.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/earthmystery.png",
      "https://munzee.global.ssl.fastly.net/images/pins/icemystery.png",
    ],
    function: ({ cap, dep, con }) =>
      [...cap, ...dep, ...con]
        .filter(
          i =>
            (g(i)?.has_tag(TypeTags.TypeMysteryElemental) && !g(i)?.has_tag(TypeTags.Scatter)) ||
            ["fire", "waterdroplet", "frozengreenie", "charge"].includes(g(i)?.icon || "")
        )
        .reduce(points, 0),
  },
  30: {
    task_id: 30,
    top: "Reseller",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/reseller.png",
    icons: ["https://munzee.global.ssl.fastly.net/images/pins/reseller.png"],
    function: ({ cap, dep }) =>
      [...cap, ...dep].filter(i => g(i)?.has_tag(TypeTags.TypeReseller) && !g(i)?.has_tag(TypeTags.Scatter)).length,
  },
  31: {
    task_id: 32,
    top: "Gaming",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
    ],
    function: ({ cap, dep, con }) =>
      [...cap, ...dep, ...con].filter(i => g(i)?.has_tag(TypeTags.TypeGaming)).reduce(points, 0),
  },
  32: {
    task_id: 32,
    top: "Gaming",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
    ],
    function: ({ cap, dep }) =>
      [...cap, ...dep].filter(i => g(i)?.has_tag(TypeTags.TypeGaming)).length,
  },
  33: {
    task_id: 32,
    top: "Renovate",
    bottom: "Motel",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
      "https://munzee.global.ssl.fastly.net/images/pins/2starmotel.png",
    ],
    function: ({ cap }) => cap.filter((i: any) => g(i)?.icon === "renovation").length,
  },
  34: {
    task_id: 34,
    top: "Mystery",
    bottom: "Points",
    icon: "https://i.ibb.co/YdRQ3Sf/Split-Mystery.png",
    function: ({ cap, dep, con }) =>
      [...cap, ...dep, ...con].filter(i => g(i)?.has_tag(TypeTags.TypeMystery)).reduce(points, 0),
  },
  35: {
    task_id: 35,
    top: "QRewZee",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/qrewzee.png",
    function: ({ cap }) =>
      cap.filter((i: any) => g(i)?.icon === "qrewzee" || g(i)?.icon === "sleepzee").length,
  },
  36: {
    task_id: 36,
    top: "Card",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/envelope.png",
    function: ({ cap, dep, con }) =>
      [...cap, ...dep, ...con].filter(i => g(i)?.has_tag(TypeTags.Card)).reduce(points, 0),
  },
  37: {
    task_id: 37,
    top: "Card",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/qrate.png",
    function: ({ cap, dep, con }) =>
      "?",
  },
};

var all_tasks: {
  [game_id: string]: (keyof typeof tasks)[];
} = {
  86: [1, 3, 13, 24, 34, 6, 17, 26, 28],
  87: [6, 1, 3, 13, 24, 7, 12, 19, 23, 28, 31, 33, 34],
  88: [1, 7, 12, 23, 3, 24, 10, 13, 19, 28, 31, 33, 34],
  89: [1, 3, 10, 12, 13, 23, 24, 28, 35],
  90: [1, 13, 14, 24, 3, 35, 19, 25, 26, 32, 33],
  91: [1, 19, 23, 29, 3, 35, 7, 12, 13, 24, 27, 28, 31, 33],
  92: [1, 3, 13, 24, 28, 35, 12, 23, 30, 36],
  93: [1, 3, 12, 13, 24, 28, 23, 30, 34, 35, 36],
  94: [1, 3, 13, 24, 35, 6, 7, 12, 23, 27, 31, 36],
  95: [1, 29, 31, 3, 13, 23, 24, 36, 12, 19, 27, 28, 30, 33, 34, 35],
  96: [1, 10, 24, 3, 13, 19, 30, 35, 9, 22, 23, 36],
  97: [1, 3, 7, 13, 23, 24, 28, 30, 33, 35, 36, 12, 19, 27, 31, 34],
  98: [1, 32, 3, 13, 24, 35, 37, 12, 19, 23, 28, 30, 31, 34, 36],
  99: [1, 26, 3, 13, 19, 24, 37, 7, 23, 30, 33, 35],
  100: [1, 12, 34, 3, 13, 24, 30, 35, 36, 37, 8, 27, 28],
};

export default function calculate(
  data: StatzeePlayerDay["response"]["data"][] = [],
  no_reduce?: boolean,
  gid?: number
) {
  const current_month = gid || gameID();
  const current_tasks = all_tasks[current_month];
  const all: {
    cap: StatzeePlayerDayCapture[];
    con: StatzeePlayerDayCaptureOn[];
    dep: StatzeePlayerDayDeploy[];
    arc: StatzeePlayerDayArchive[];
    no_reduce?: boolean;
  } = {
    cap: [],
    con: [],
    dep: [],
    arc: [],
    no_reduce,
  };
  const output: {
    [task: string]: number | { [key: string]: void } | "?";
  } = {};
  for (const day of data) {
    all.cap = all.cap.concat(day?.captures ?? []);
    all.con = all.con.concat(day?.captures_on ?? []);
    all.dep = all.dep.concat(day?.deploys ?? []);
    all.arc = all.arc.concat(day?.archived ?? []);
  }
  for (const task of current_tasks) {
    output[task] = tasks[task]?.function(all);
    if (!no_reduce && typeof output[task] === "object")
      output[task] = Object.keys(output[task]).length;
  }
  return output;
}
