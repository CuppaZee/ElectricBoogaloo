import { Route } from "../types";
import { retrieve, request, mhq, gameID } from '../util';
import clancalculator from '../util/clancalculator';
import mongo from "../util/mongo";

const route: Route = {
  path: "minute/shadowclans",
  latest: 1,
  versions: [
    {
      version: 1,
      async function() {
        if (mhq().date() < 3) return {
          status: "error",
          data: null,
        };
        var shadowData = await mongo.collection("shadow").find({ game_id: gameID().toString() }).sort("_updated_at").next();
        var members = shadowData._members||[];
        shadowData.archive = shadowData.archive || {};
        shadowData.total = {};
        for (let { user_id } of members) {
          try {
            if (!shadowData.archive[user_id]) shadowData.archive[user_id] = {};
            shadowData.total[user_id] = {};
            let token = await retrieve({ user_id: user_id, teaken: false }, 120)
            for (let date = 3; date <= mhq().date(); date++) {
              if (!shadowData.archive[user_id][date] || date > mhq().date() - 3) {
                let data = await request('///statzee/player/day' as 'statzee/player/day', { day: `${mhq().year()}-${(mhq().month() + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}` }, token.access_token);
                shadowData.archive[user_id][date] = clancalculator([data?.data], true);
              }
              for(let task in shadowData.archive[user_id][date]) {
                if(typeof shadowData.archive[user_id][date][task] === "number") {
                  shadowData.total[user_id][task] = (shadowData.total[user_id][task]||0) + shadowData.archive[user_id][date][task];
                } else if(shadowData.archive[user_id][date][task] === "?") {
                  shadowData.total[user_id][task] = "?";
                } else {
                  if(!shadowData.total[user_id][task]) shadowData.total[user_id][task] = {};
                  for(let key in shadowData.archive[user_id][date][task]) {
                    if(shadowData.archive[user_id][date][task][key] === "delete") {
                      delete shadowData.total[user_id][task][key]
                    } else {
                      shadowData.total[user_id][task][key] = shadowData.archive[user_id][date][task][key]
                    }
                  }
                }
              }
            }
            for(let task in shadowData.total[user_id]) {
              if(typeof shadowData.total[user_id][task] === "object") {
                shadowData.total[user_id][task] = Object.keys(shadowData.total[user_id][task]).length;
              }
            }
          } catch(e) {
            shadowData.total[user_id] = {};
          }
        }
        shadowData._updated_at = Date.now();
        await mongo.collection("shadow").updateOne({
          game_id: gameID().toString(),
          clan_id: shadowData.clan_id,
        }, { $set: shadowData });
        return {
          status: "success",
          data: 1
        };
      }
    }
  ]
}

export default route;