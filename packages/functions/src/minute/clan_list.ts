var clanlistjson = require('./clanlist.json');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var { retrieve, request } = require('../util');
module.exports = {
  path: "minute/clanlist",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        db
      }: any) {
        var token = await retrieve(db, { user_id: 455935, teaken: false }, 60)
        var clans = (await db.collection('data').doc('clans').get()).data();
        var array = [];
        for (var i = clans.counter; i < (clans.counter + 20); i++) {
          array.push(request('clan/v2', { clan_id: i }, token.access_token));
        }
        var found = false;
        var data = await Promise.all(array);
        for (var d of data) {
          try {
            let det = d.details;
            if (det.name && det.members) {
              found = true;
              clans.clans[det.clan_id] = {
                name: det.name,
                tagline: det.tagline
              }
            } else if (det.name) {
              found = true;
              delete clans.clans[det.clan_id]
            }
          } catch (e) {
            console.log('No Clan')
          }
        }
        clans.counter = found ? i : 0;
        clans.clans = Object.assign({}, clans.clans, clanlistjson)
        await db.collection('data').doc('clans').set(clans);
        return {
          status: "success",
          data: Object.keys(clans.clans).length
        };
      }
    }
  ]
}