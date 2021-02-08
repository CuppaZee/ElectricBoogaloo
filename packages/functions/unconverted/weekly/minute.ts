const weeks = require('./data.json');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
const { retrieve, request } = require('../util');

module.exports = {
  path: "weekly/minute",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        db
      }: any) {
        try {

          const week = weeks.find((i: any) => Date.now() > new Date(i.prestart).valueOf() && Date.now() < new Date(i.finalend).valueOf())
          if (!week) {
            return {
              status: "success",
              data: false,
            }
          }
  
          const data = (await db.collection('weekly').doc(week.id).get()).data().players;
          const batchDoc = (await db.collection('weekly').doc(week.id).collection('batches').orderBy('_updated_at').limit(1).get()).docs[0];
          const batch = batchDoc.data();
          const customCounts = (await db.collection('weekly_custom').doc(week.id).get()).data() || {}
  
          var token = await retrieve({ user_id: 455935, teaken: false }, 180, "team");
  
          batch.players = await Promise.all(batch.players.map(async (player: any) => {
            try {
              if (!player.i) {
                const player_data = await request('user', { username: player.n }, token.access_token)
                player.i = Number(player_data.user_id);
              }
            } catch (e) {
              console.log('Weeklyboard Error', player.n, e);
              player.b = true;
            }
            return player;
          }))
  
          if (Date.now() < new Date(week.start).valueOf()) {
            batch.players = await Promise.all(batch.players.map(async (player: any) => {
              try {
                if (!player.pre) {
                  const player_specials = await request('user/specials', { user_id: player.i }, token.access_token)
                  player.pre = [];
                  for (const req of week.requirements) {
                    if(req.custom_value) {
                      player.pre.push(0)
                    } else {
                      let count = (player_specials.find((i: any) => i.logo === req.type) || {}).count || 0;
                      player.pre.push(count);
                    }
                  }
                }
                data[player.i] = {
                  n: player.n,
                  d: [],
                  p: 0,
                  f: 0
                }
              } catch (e) {
                console.log('Weeklyboard Error', player.n, e);
              }
              return player;
            }))
          } else if (Date.now() < new Date(week.end).valueOf()) {
            batch.players = await Promise.all(batch.players.map(async (player: any) => {
              if(!player.i) return player;
              try {
                let player_specials = await request('user/specials', { user_id: player.i }, token.access_token)
                if(player_specials === null || player_specials === undefined || !player_specials.length || player_specials.length === 0) {
                  console.log('Weeklyboard Specials Error', player.n, player.i, player_specials);
                  return player;
                }
                if (!player.fpre || player.fpre.length === 0 || (!player.fixb && player.b)) {
                  console.log('Weeklyboard FPre', player.n, player.i);
                  player.fpre = [];
                  for (const req of week.requirements) {
                    if(req.custom_value) {
                      player.fpre.push(0)
                    } else {
                      let count = Number((player_specials.find((i: any) => i.logo === req.type) || {}).count || 0);
                      if((player.pre||[])[player.fpre.length] !== count) {
                        for(let page = 0;page < 10;page++) {
                          const player_type_captures = await request('user/captures/special',{
                            user_id: player.i,
                            type: req.type,
                            page
                          }, token.access_token)
                          for(const capture of player_type_captures.munzees) {
                            if(new Date(capture.captured_at).valueOf() > new Date(week.start).valueOf()) {
                              count -= 1;
                            } else {
                              page = 100;
                            }
                          }
                        }
                      }
                      player.fpre.push(count);
                    }
                  }
                  player.fixb = true;
                }
                player.p = 0;
                player.d = [];
                let fpre = player.fpre.length < player.pre.length ? player.pre : player.fpre;
                for (const req of week.requirements) {
                  if(req.custom_value) {
                    let count = (customCounts[req.type]||{})[player.n] || 0;
                    player.d.push(count);
                    player.p += count * req.points;
                  } else {
                    let count = Number((player_specials.find((i: any) => i.logo === req.type) || {}).count || 0);
                    count = (count || 0) - (fpre[player.d.length] || 0);
                    player.d.push(count);
                    player.p += count * req.points;
                  }
                }
                data[player.i] = {
                  n: player.n,
                  d: player.d,
                  p: player.p
                }
                if(player.p === null || isNaN(player.p)) {
                  console.log('Weeklyboard NaN', player.i, player_specials);
                }
              } catch (e) {
                console.log('Weeklyboard Error', player.n, e);
              }
              return player;
            }))
          } else if (Date.now() < new Date(week.finalend).valueOf()) {
            batch.players = await Promise.all(batch.players.map(async (player: any) => {
              try {
                if (!player.fd) {
                  const player_specials = await request('user/specials', { user_id: player.i }, token.access_token)
                  player.fp = 0;
                  player.fd = [];
                  let fpre = player.fpre.length < player.pre.length ? player.pre : player.fpre;
                  for (const req of week.requirements) {
                    if(req.custom_value) {
                      let count = (customCounts[req.type]||{})[player.n] || 0;
                      player.fd.push(count);
                      player.fp += count * req.points;
                    } else {
                      let count = Number((player_specials.find((i: any) => i.logo === req.type) || {}).count || 0);
                      count -= fpre[player.fd.length];
                      if(player.d[player.fd.length] !== count) {
                        const player_type_captures = await request('user/captures/special',{
                          user_id: player.i,
                          type: req.type
                        }, token.access_token)
                        for(const capture of player_type_captures.munzees) {
                          if(new Date(capture.captured_at).valueOf() > new Date(week.end).valueOf()) {
                            count -= 1;
                          }
                        }
                      }
                      player.fd.push(count);
                      player.fp += count * req.points;
                    }
                  }
                }
              } catch (e) {
                console.log('Weeklyboard Error', player.n, e);
              }
              data[player.i] = {
                n: player.n,
                d: player.fd || player.d,
                p: player.fp || player.p,
                f: player.fd?1:0
              }
              return player;
            }))
          }
  
          await db.collection('weekly').doc(week.id).set({ players: data });
          batch._updated_at = Date.now();
          await batchDoc.ref.set(batch);
  
          return {
            status: "success",
            data: true,
          }
        } catch(e) {
          console.log('BIG Weeklyboard Error', e);
          return {
            status: "error"
          }
        }
      }
    }
  ]
}