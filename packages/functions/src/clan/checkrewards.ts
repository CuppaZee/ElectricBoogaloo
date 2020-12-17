import { retrieve, request } from '../util';
import POLYfromEntries from 'object.fromentries';
import { Route } from '../types';

const route: Route = {
  path: "clan/checkrewards",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        db,
        params: { clan_id, game_id }
      }: any) {
        const globalToken = await retrieve(db, { user_id: 125914, teaken: false }, 120);
        const users = (await request('clan/v2', { clan_id }, globalToken.access_token))?.data?.users;
        if(!users) {
          return {
            status: "error",
            data: null,
          }
        }
        const output = new Map();
        for(let user of users) {
          let token = await retrieve(db, { user_id: user.user_id, teaken: false }, 120);
          let data = await request('clan/v2/challenges/{game_id}', { clan_id, game_id: game_id.toString() }, token.access_token);
          output.set(user.username, POLYfromEntries(Object.entries(data?.data?.rewards.levels || {}).map(i=>[i[0],i[1].collected])));
        }
        return {
          status: "success",
          data: POLYfromEntries(output.entries()),
        };
      }
    }
  ]
}

export default route;