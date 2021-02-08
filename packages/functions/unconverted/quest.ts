
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var { retrieve, request } = require("../util");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
var db = require("../util/db");
function g(a: any) {
  return db.get("icon", a.pin || a.pin_icon || a.icon || "") || {};
}
var path = require('path');
var geocoder = require('offline-geocoder')({ database: path.join(__dirname, '../util/geolocate/db.sqlite') })

function c(i: any) {
  return Number((i.captured_at || i.deployed_at).slice(8, 10)) > 0 && Number((i.captured_at || i.deployed_at).slice(8, 10)) < 29;
}
var games = {
  1: {
    tasks: [
      { id: 1, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'string... Remove this comment to see the full error message
      }: any) => [...cap, ...dep].filter(i => c(i) && g(i).category === "mystery").length },
      { id: 2, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'evolution' does not exist on type 'strin... Remove this comment to see the full error message
      }: any) => [...cap, ...dep].filter(i => c(i) && g(i).evolution).length },
      { id: 3, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'weapon' does not exist on type 'string'.
      }: any) => [...cap, ...dep].filter(i => c(i) && g(i).weapon === "clan").length },
      { id: 4, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'jewel' does not exist on type 'string'.
      }: any) => [...cap, ...dep].filter(i => c(i) && g(i).jewel).length },
      { id: 5, function: ({
        cap
      }: any) => cap.filter((i: any) => (i.url || "").includes("XeresDan/1707")).length },
    ],
    month: "05",
    year: "2020"
  },
  2: {
    tasks: [
      { id: 1, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'string... Remove this comment to see the full error message
      }: any) => [...cap, ...dep].filter(i => c(i) && g(i).category === "mystery").length },
      { id: 2, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'evolution' does not exist on type 'strin... Remove this comment to see the full error message
      }: any) => [...cap, ...dep].filter(i => c(i) && g(i).evolution).length },
      { id: 6, function: ({
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'flat' does not exist on type 'string'.
      }: any) => dep.filter((i: any) => c(i) && g(i).flat && !g(i).unique).length },
      { id: 7, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'destination' does not exist on type 'str... Remove this comment to see the full error message
      }: any) => [...cap,...dep].filter(i => c(i) && g(i).destination).length },
      { id: 8, function: ({
        cap
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'bouncer' does not exist on type 'string'... Remove this comment to see the full error message
      }: any) => cap.filter((i: any) => c(i) && g(i).bouncer).length },
    ],
    month: "06",
    year: "2020"
  },
  3: {
    tasks: [
      { id: 1, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'string... Remove this comment to see the full error message
      }: any) => [...cap, ...dep].filter(i => c(i) && g(i).category === "mystery").length },
      { id: 2, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'evolution' does not exist on type 'strin... Remove this comment to see the full error message
      }: any) => [...cap, ...dep].filter(i => c(i) && g(i).evolution).length },
      { id: 9, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'flat' does not exist on type 'string'.
      }: any) => [...cap, ...dep].filter(i => c(i) && g(i).flat && !g(i).unique).length },
      { id: 7, function: ({
        cap,
        dep
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'destination' does not exist on type 'str... Remove this comment to see the full error message
      }: any) => [...cap,...dep].filter(i => c(i) && g(i).destination).length },
      { id: 10, function: ({
        cap
      }: any) => cap.filter((i: any) => (i.url || "").includes("m/GPSmAQ/1")).length },
    ],
    month: "07",
    year: "2020"
  }
}

module.exports = {
  path: "user/quest",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "userid",
        },
      },
      async function({
        params: { user_id, game_id = 1 },
        db
      }: any) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        var month = games[game_id].month;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        var year = games[game_id].year;
        var token = await retrieve({ user_id: 125914, teaken: false }, 60);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        var tasks = games[game_id].tasks

        var output = {};

        function checkTime(time: any) {
          console.log(time);
          if (!time) return false;
          if (Number(time.slice(0, 4)) > Number(year)) {
            return true;
          } else if (Number(time.slice(0, 4)) === Number(year) && Number(time.slice(5, 7)) >= Number(month)) {
            return true;
          }
          return false;
        }

        var captures: any = [];
        for (var i = 0; i < 50; i++) {
          let x = await request('user/captures', {
            page: i,
            user_id
          }, token.access_token);
          captures = captures.concat(x)
          if (!x[0] || !checkTime(x[0].captured_at)) {
            console.log(user_id, game_id, 'Breaking at', i);
            break;
          }
        }

        var deploys: any = [];
        for (i = 0; i < 50; i++) {
          let x = await request('user/deploys', {
            page: i,
            user_id
          }, token.access_token);
          deploys = deploys.concat(x.munzees)
          if (!x.munzees[0] || !checkTime(x.munzees[0].deployed_at)) {
            break;
          }
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
        captures = captures.filter(i => i.captured_at.startsWith(year + '-' + month))
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
        deploys = deploys.filter(i => i.deployed_at.startsWith(year + '-' + month))
        for (var capture of captures) {
          capture.location = await geocoder.reverse(capture.latitude, capture.longitude);
        }
        for (var deploy of deploys) {
          deploy.location = await geocoder.reverse(deploy.latitude, deploy.longitude);
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
        captures = captures.filter(i => (Number(i.latitude) === 0 && Number(i.longitude) === 0) || (i.location && i.location.admin1 && i.location.admin1.name === "Quebec"))
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
        deploys = deploys.filter(i => (Number(i.latitude) === 0 && Number(i.longitude) === 0) || (i.location && i.location.admin1 && i.location.admin1.name === "Quebec"))

        for (let task of tasks) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          output[task.id] = (output[task.id] || 0) + task.function({ cap: captures, dep: deploys });
        }
        return {
          status: "success",
          data: output
        }
      },
    },
  ],
};
