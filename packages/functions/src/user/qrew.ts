
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var { retrieve, request } = require("../util");
var { get, g: getIcon } = require("../util/db");
var moment = require("moment");

module.exports = {
  path: "user/qrew",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        access_token: {
          type: "accesstoken",
        },
      },
      async function({
        params: { username, user_id },
        db
      }: any) {
        var token = await retrieve(db, { user_id, teaken: false }, 60);
        try {
          var [captures, deploys, capture_dates, deploy_dates] = await Promise.all([
            request('statzee/player/captures/types', { username }, token.access_token),
            request('statzee/player/deploys/types', { username }, token.access_token),
            request('statzee/player/captures', { username }, token.access_token),
            request('statzee/player/deploys', { username }, token.access_token)
          ]);
        } catch (e) {
          return {
            status: "error",
            error_message: "munzee_api_5xx"
          }
        }
        var archived: any = [];
        for (var page = 0; page < 20; page++) {
          let und = await request('user/archived', { page }, token.access_token);
          if (!und || !und.has_more) {
            page = 100;
          }
          archived = archived.concat(und ? und.munzees : []);
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
        archived = archived.map(i => i.capture_type_id).reduce((obj, item) => {
          obj[item] = (obj[item] || 0) + 1;
          return obj;
        }, {});
        var cap = captures.types.map((i: any) => {
          var g = (get('id', Number(i.capture_type_id)) || {})
          return {
            type: Number(i.capture_type_id),
            state: ((g.destination || {}).type === "room") ? "room" : g.state,
            name: i.name,
            icon: g.icon || getIcon(i.name),
            amount: Number(i.captures)
          }
        })
        var dep = deploys.types.map((i: any) => {
          var g = (get('id', Number(i.capture_type_id)) || {})
          return {
            type: Number(i.capture_type_id),
            state: ((g.destination || {}).type === "room") ? "room" : g.state,
            name: i.name,
            icon: g.icon || getIcon(i.name),
            amount: Number(i.munzees) - (archived[i.capture_type_id] || 0)
          }
        })
        // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        var recent_cap = Object.entries(capture_dates).sort((a, b) => new Date(b[0]) - new Date(a[0]))[0][0];
        // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        var recent_dep = Object.entries(deploy_dates).sort((a, b) => new Date(b[0]) - new Date(a[0]))[0][0];
        var this_month = moment().tz('America/Chicago').date() < 15;
        var next_check = moment().tz('America/Chicago').add(this_month ? 0 : 1, "month").date(this_month ? 15 : 1).hour(0).minute(0).second(0).millisecond(0);
        var earliest = moment(next_check).add(-14, "day")
        return {
          status: "success",
          data: {
            cap,
            dep,
            recent_cap: moment.tz(recent_cap, 'America/Chicago') >= earliest ? recent_cap : null,
            recent_dep: moment.tz(recent_dep, 'America/Chicago') >= earliest ? recent_dep : null,
            recent_capt: recent_cap,
            recent_depl: recent_dep,
            next_check: next_check.format(),
            earliest: earliest.format()
          }
        }
      },
    },
  ],
};
