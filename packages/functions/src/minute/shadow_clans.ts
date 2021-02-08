import { Route } from "../types";
import { retrieve, request, mhq, gameID } from '../util';
import clancalculator from '../util/clancalculator';

const route: Route = {
  path: "minute/shadowclans",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        db
      }) {
        if (mhq().date() < 3) return {
          status: "error",
          data: null,
        };
        var shadowDoc = (await db.collection(`shadow_${gameID()}`).orderBy('_updated_at').limit(1).get()).docs[0]
        var shadowData = shadowDoc.data();
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
                let data = await request('statzee/player/day', { day: `${mhq().year()}-${(mhq().month() + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}` }, token.access_token);
                shadowData.archive[user_id][date] = clancalculator([data?.data], true);
              }
              for(let task in shadowData.archive[user_id][date]) {
                if(typeof shadowData.archive[user_id][date][task] === "number") {
                  shadowData.total[user_id][task] = (shadowData.total[user_id][task]||0) + shadowData.archive[user_id][date][task];
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
        await shadowDoc.ref.set(shadowData);
        return {
          status: "success",
          data: 1
        };
      }
    }
  ]
}

export default route;