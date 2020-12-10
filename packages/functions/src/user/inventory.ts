
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var {retrieve,request} = require("../util");

module.exports = {
  path: "user/inventory",
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
        params: { access_token },
        db
      }: any) {
        var [credits, history, boosters] = await Promise.all([
            request('user/credits', {}, access_token),
            request('user/credits/history', {}, access_token),
            request('user/boosters/credits', {}, access_token)
        ]);
        var undeployed: any = [];
        for (var page = 0; page < 20; page++) {
            let und = await request('user/undeploys', { page }, access_token);
            if (!und || !und.has_more) {
                page = 100;
            }
            undeployed = undeployed.concat(und?und.munzees:[]);
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
        undeployed = Object.entries(undeployed.map(i => i.pin_icon.match(/\/([^./]+).png/)[1]).reduce((obj, item) => {
            obj[item] = (obj[item] || 0) + 1;
            return obj;
        }, {})).map(i => ({ type: i[0], amount: i[1] }));
        return {
          status: "success",
          data: {
            credits,
            history,
            boosters,
            undeployed
          }
        }
      },
    },
  ],
};
