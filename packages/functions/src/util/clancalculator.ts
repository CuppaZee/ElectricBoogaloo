
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
var db = require("./db");
function g(a: any) {
  return db.get("icon", a.pin || a.pin_icon || a.icon || "") || {};
}
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'points'.
function points(a: any, b: any) {
  return a + Number(b.points_for_creator !== undefined ? b.points_for_creator : b.points);
}

var tasks = {
  1: {
    task_id: 1,
    top: "Days of",
    bottom: "Activity",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    total: "min",
    function: ({
      cap,
      dep
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'personal' does not exist on type 'string... Remove this comment to see the full error message
    }: any) => [...cap, ...dep].filter(i => !g(i).personal && g(i).category !== "universal").reduce((a, b) => {
      a[(b.captured_at || b.deployed_at).slice(8, 10)] = true;
      return a;
    }, {})
  },
  3: {
    task_id: 3,
    top: "Total",
    bottom: "Points",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    function: ({
      cap,
      dep,
      con
    }: any) => [...cap, ...dep, ...con].reduce(points, 0)
  },
  6: {
    task_id: 6,
    top: "Total",
    bottom: "Deploys",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    function: ({
      dep,
      arc,
      no_reduce
    }: any) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'personal' does not exist on type 'string... Remove this comment to see the full error message
      return [...dep, ...arc].filter(i => !g(i).personal).reduce((a, b) => {
        if (b.archived_at) {
          if (no_reduce) {
            a[b.id] = "delete";
          } else {
            delete a[b.id];
          }
        } else {
          a[b.id] = true;
        }
        return a;
      }, {});
    }
  },
  7: {
    task_id: 7,
    top: "Dest.",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/hotel.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/1starmotel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtualresort.png"
    ],
    function: ({
      cap,
      dep,
      con
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'destination' does not exist on type 'str... Remove this comment to see the full error message
    }: any) => [...cap, ...dep, ...con].filter(i => g(i).destination).reduce(points, 0)
  },
  10: {
    task_id: 10,
    top: "Deploy",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    function: ({
      dep
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'personal' does not exist on type 'string... Remove this comment to see the full error message
    }: any) => dep.filter((i: any) => !g(i).personal).reduce(points, 0)
  },
  12: {
    task_id: 12,
    top: "Evo",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png"
    ],
    function: ({
      cap,
      dep,
      con
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'evolution' does not exist on type 'strin... Remove this comment to see the full error message
    }: any) => [...cap, ...dep, ...con].filter(i => g(i).evolution).reduce(points, 0)
  },
  13: {
    task_id: 13,
    top: "Places",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/poi_filter.png",
    function: ({
      cap
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'poi' does not exist on type 'string'.
    }: any) => cap.filter((i: any) => g(i).poi).length
  },
  14: {
    task_id: 14,
    top: "Jewel",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/aquamarine.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/diamond.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtualonyx.png"
    ],
    function: ({
      cap,
      dep
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'jewel' does not exist on type 'string'.
    }: any) => [...dep, ...cap].filter(i => g(i).jewel).length
  },
  17: {
    task_id: 17,
    top: "Evo",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png"
    ],
    function: ({
      cap,
      dep
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'evolution' does not exist on type 'strin... Remove this comment to see the full error message
    }: any) => [...dep, ...cap].filter(i => g(i).evolution).length
  },
  19: {
    task_id: 19,
    top: "Jewel",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/diamond.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/aquamarine.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtual_citrine.png"
    ],
    function: ({
      cap,
      dep,
      con
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'string... Remove this comment to see the full error message
    }: any) => [...cap, ...dep, ...con].filter(i => g(i).category === "jewel").reduce(points, 0)
  },
  23: {
    task_id: 23,
    top: "Weapon",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/catapult.png"
    ],
    function: ({
      cap,
      dep,
      con
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'weapon' does not exist on type 'string'.
    }: any) => [...cap, ...dep, ...con].filter(i => g(i).weapon === "clan").reduce(points, 0)
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
      "https://munzee.global.ssl.fastly.net/images/pins/muru.png"
    ],
    function: ({
      cap
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'bouncer' does not exist on type 'string'... Remove this comment to see the full error message
    }: any) => cap.filter((i: any) => g(i).bouncer).length
  },
  25: {
    task_id: 25,
    top: "Mystery",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mystery.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mystery.png",
      "https://munzee.global.ssl.fastly.net/images/pins/airmystery.png"
    ],
    function: ({
      cap,
      dep
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'string... Remove this comment to see the full error message
    }: any) => [...cap, ...dep].filter(i => g(i).category === "mystery").length
  },
  26: {
    task_id: 26,
    top: "Weapon",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/crossbow.png"
    ],
    function: ({
      cap,
      dep
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'weapon' does not exist on type 'string'.
    }: any) => [...cap, ...dep].filter(i => g(i).weapon === "clan").length
  },
  27: {
    task_id: 27,
    top: "Zodiac",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/zodiac.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/zodiac.png",
      "https://munzee.global.ssl.fastly.net/images/pins/scorpio.png"
    ],
    function: ({
      cap,
      dep
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'zodiac' does not exist on type 'string'.
    }: any) => [...cap, ...dep].filter(i => g(i).zodiac).length
  },
  28: {
    task_id: 28,
    top: "Flat",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png",
      "https://munzee.global.ssl.fastly.net/images/pins/flatlou.png"
    ],
    function: ({
      cap,
      dep,
      con
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'flat' does not exist on type 'string'.
    }: any) => [...cap, ...dep, ...con].filter(i => g(i).flat && !g(i).unique).reduce(points, 0)
  },
  29: {
    task_id: 29,
    top: "Elemental",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/earthmystery.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/earthmystery.png",
      "https://munzee.global.ssl.fastly.net/images/pins/icemystery.png"
    ],
    function: ({
      cap,
      dep,
      con
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'elemental' does not exist on type 'strin... Remove this comment to see the full error message
    }: any) => [...cap, ...dep, ...con].filter(i => (g(i).elemental && (!g(i).scatter || ['fire','waterdroplet','frozengreenie','charge'].includes(g(i).icon)))).reduce(points, 0)
  },
  30: {
    task_id: 30,
    top: "Reseller",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/reseller.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/reseller.png"
    ],
    function: ({
      cap,
      dep
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'reseller' does not exist on type 'string... Remove this comment to see the full error message
    }: any) => [...cap, ...dep].filter(i => g(i).reseller).length
  },
  31: {
    task_id: 32,
    top: "Gaming",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png"
    ],
    function: ({
      cap,
      dep,
      con
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'gaming' does not exist on type 'string'.
    }: any) => [...cap, ...dep, ...con].filter(i => g(i).gaming).reduce(points, 0)
  },
  32: {
    task_id: 32,
    top: "Gaming",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png"
    ],
    function: ({
      cap,
      dep
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'gaming' does not exist on type 'string'.
    }: any) => [...cap, ...dep].filter(i => g(i).gaming).length
  },
  33: {
    task_id: 32,
    top: "Renovate",
    bottom: "Motel",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
      "https://munzee.global.ssl.fastly.net/images/pins/2starmotel.png"
    ],
    function: ({
      cap
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type 'string'.
    }: any) => cap.filter((i: any) => g(i).icon === "renovation").length
  },
  34: {
    task_id: 34,
    top: "Mystery",
    bottom: "Points",
    icon: "https://i.ibb.co/YdRQ3Sf/Split-Mystery.png",
    function: ({
      cap,
      dep,
      con
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'string... Remove this comment to see the full error message
    }: any) => [...cap, ...dep, ...con].filter(i => g(i).category === "mystery").reduce(points, 0)
  },
  35: {
    task_id: 35,
    top: "QRewZee",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/qrewzee.png",
    function: ({
      cap
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type 'string'.
    }: any) => cap.filter((i: any) => g(i).icon === "qrewzee").length
  },
  36: {
    task_id: 36,
    top: "Card",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/envelope.png",
    function: ({
      cap,
      dep,
      con
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'string... Remove this comment to see the full error message
    }: any) => [...cap, ...dep, ...con].filter(i => g(i).category === "card").reduce(points, 0)
  }
}

var all_tasks = {
  86: [
    1,
    3,
    13,
    24,
    34,
    6,
    17,
    26,
    28
  ],
  87: [
    6,
    1,
    3,
    13,
    24,
    7,
    12,
    19,
    23,
    28,
    31,
    33,
    34
  ],
  88: [
    1,
    7,
    12,
    23,
    3,
    24,
    10,
    13,
    19,
    28,
    31,
    33,
    34
  ],
  89: [1, 3, 10, 12, 13, 23, 24, 28, 35],
  90: [1,13,14,24,3,35,19,25,26,32,33],
  91: [1,19,23,29,3,35,7,12,13,24,27,28,31,33],
  92: [1,3,13,24,28,35,12,23,30,36],
}
var current_month = 92;

// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'calculate'.
function calculate(data = [], no_reduce: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  var current_tasks = all_tasks[current_month];
  var all = {
    cap: [],
    con: [],
    dep: [],
    arc: [],
    no_reduce
  }
  var output = {};
  for (var day of data) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'captures' does not exist on type 'never'... Remove this comment to see the full error message
    all.cap = all.cap.concat(day.captures)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'captures_on' does not exist on type 'nev... Remove this comment to see the full error message
    all.con = all.con.concat(day.captures_on)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'deploys' does not exist on type 'never'.
    all.dep = all.dep.concat(day.deploys)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'archived' does not exist on type 'never'... Remove this comment to see the full error message
    all.arc = all.arc.concat(day.archived)
  }
  for (var task of current_tasks) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    output[task] = tasks[task].function(all)
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!no_reduce && typeof output[task] === "object") output[task] = Object.keys(output[task]).length;
  }
  return output;
}

module.exports = calculate;