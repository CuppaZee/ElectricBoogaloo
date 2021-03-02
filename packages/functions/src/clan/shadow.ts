import { Route } from "../types";

const route: Route = {
  path: "clan/shadow",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        db,
        params: { game_id, clan_id }
      }) {
        var d = (await db.collection(`shadow_${game_id}`).doc((clan_id || "1349").toString()).get()).data();
        if (!d) {
          return {
            status: "success",
            data: {
              members: [],
              usernames: {},
              data: {},
            }
          }
        }
        if(!d.total) d.total = {};
        var details = d._details;
        var members = d._members.map((i: any) => i.user_id);
        var usernames: {
          [user_id: string]: string;
        } = {};
        var data: {
          [task_id: string]: {
            [user_id: string]: string;
          };
        } = {};
        for(let member of d._members) {
          usernames[member.user_id] = member.username;
          for(let task in d.total[member.user_id]||[]) {
            if(!data[task]) data[task] = {};
            data[task][member.user_id] = d.total[member.user_id][task];
          }
        }
        return {
          status: "success",
          data: {
            members,
            usernames,
            data,
            details
          }
        }
      }
    }
  ]
}
export default route;