
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('../../config.json');
const stringify = require('csv-stringify');

module.exports = {
  path: "competition/admin/list",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        params: { key, csv },
        teamsData,
        res
      }: any) {
        if(key !== config.zeecret_competition_key) {
          return {
            status: "error",
            data: "Don't even try. 😜"
          }
        }
        const teams = await teamsData();
        if(csv) {
          await (new Promise((resolve, reject) => {
            stringify(teams.find((i: any) => i.team_id===csv).list, {header:true}, function(err: any, output: any){
              if(err) reject(err);
              res.attachment(`${csv}.csv`).send(output);
              resolve(true);
            })
          }))
          return {
            status: "success",
            norespond: true
          }
        }
        return {
          status: "success",
          data: teams
        };
      },
    },
  ],
};