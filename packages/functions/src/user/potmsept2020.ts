
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var {retrieve,request,mhq} = require("../util");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
var db = require("../util/db");
function g(a: any) {
  return db.get("icon", a.pin || a.pin_icon || a.icon || "") || {};
}

module.exports = {
  path: "user/potm/sept2020",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "user_id",
        },
      },
      async function({
        params: { user_id },
        db
      }: any) {
        var token = await retrieve(db, { user_id, teaken: false }, 60);
        var dates = [];
        var time = mhq();
        for(var i = 1;i <= (time.month()>8?30:time.date());i++) {
          dates.push(i);
        }
        let allDays = await Promise.all(dates.map(i => request('statzee/player/day', { day: `2020-09-${i.toString().padStart(2,'0')}` }, token.access_token)));
        var all: any = []
        for (var day of allDays) {
          all = all.concat(day.captures)
        }
        return {
          status: "success",
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
          data: all.filter(i=>g(i).scatter)
        }
      },
    },
  ],
};
