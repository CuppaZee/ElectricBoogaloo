import { retrieve, request } from "../util";
import { Route } from "../types";
import mongo from "../util/mongo";
const route: Route = {
  path: "minute/clanlist",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ db }: any) {
        var token = await retrieve({ user_id: 455935, teaken: false }, 60, "universal");
        var counter = await mongo.db("clans").collection("list_count").findOne({});
        var array = [];
        for (var i = counter.counter; i < counter.counter + 20; i++) {
          array.push(request("clan/v2", { clan_id: i }, token.access_token));
        }
        var found = false;
        var data = await Promise.all(array);
        const promises: Promise<unknown>[] = [];
        for (var d of data) {
          try {
            let det = d?.data?.details;
            if (det?.name && det.members) {
              found = true;
              promises.push(
                mongo.db("clans").collection("list").updateOne(
                  { clan_id: det.clan_id },
                  {
                    $set: {
                      clan_id: det.clan_id,
                      name: det.name,
                      tagline: det.tagline,
                    }
                  },
                  { upsert: true }
                )
              );
            } else if (det?.name) {
              found = true;
              promises.push(
                mongo.db("clans").collection("list").deleteOne({ clan_id: det.clan_id })
              );
            }
          } catch (e) {
            console.log("No Clan");
          }
        }
        promises.push(
          mongo
            .db("clans")
            .collection("list_count")
            .updateOne({}, { $set: { counter: found ? i : 0 } })
        );
        await Promise.all(promises);
        return {
          status: "success",
          data: found ? i : 0,
        };
      },
    },
  ],
};

export default route;
