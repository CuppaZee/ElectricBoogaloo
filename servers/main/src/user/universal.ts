import { Route } from "../types";
import { request, retrieve } from "../util";
import mongo from "../util/mongo";
import { AuthApplication } from "../util/retrieve";
import types from "./universal_types.json";

function shuffle(a: any) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface UniversalEntry {
  code: string;
  munzee_id: string;
  type?: number | string;
}

const route: Route = {
  path: "user/universal",
  latest: 1,
  versions: [
    {
      version: 5,
      async function({ params: { username, access_token, filter } }: any) {
        var token = await retrieve({ user_id: 455935, teaken: false }, 60, AuthApplication.Universal);
        var data = (await mongo.collection("universals").find({}).toArray() as UniversalEntry[])
          .filter(i => i.code.split("/")[0] !== username)
          .filter(i => !filter || filter.split(",").includes(i.type?.toString() || "0"));
        var valid = new Set(
          Object.entries(
            (
              await request(
                "munzee/hascaptured",
                { munzee_ids: data.map(i => i.munzee_id).join(",") },
                access_token
              )
            )?.data ?? {}
          )
            .filter(i => !i[1])
            .map(i => i[0])
        );
        return {
          status: "success",
          data: {
            munzees: shuffle(
              data
                .filter(i => valid.has(i.munzee_id))
                .map(i => ({
                  munzee: i.code,
                  type: types.find(x => x.id === (i.type?.toString() || "0")),
                  munzee_id: i.munzee_id,
                }))
            ),
            total: data.length,
            capped: data.filter(i => !valid.has(i.munzee_id)).length,
            types,
            cacheID: Math.floor(Math.random() * 10000),
            token: token.access_token,
          },
        };
      },
    },
  ],
};

export default route;
