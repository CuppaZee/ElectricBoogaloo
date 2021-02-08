
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'request'.
var {request, retrieve} = require("../util");

module.exports = {
  path: "user/universal/watch",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { user_id, munzee_id },
        db
      }: any) {
        var token = await retrieve({ user_id: 455935, teaken: false }, 60, 'universal');
        var data;
        for(var i = 0;i < 20;i++) {
          data = await request('munzee/captures', { munzee_id, i, page: 0 }, token.access_token);
          if((data||[]).find((i: any) => i.user_id.toString()===user_id.toString())) {
            return {
              status: "success",
              data: true
            };
          }
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
        return {
          status: "success",
          data: false
        }
      },
    },
  ],
};
