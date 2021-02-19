import { Route } from "../types";
import { request, retrieve } from "../util";
import types from "./universal_types.json";

function shuffle(a: any) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const route: Route = {
  path: "user/universal",
  latest: 1,
  versions: [
    {
      version: 4,
      async function({ params: { username, access_token, filter }, db }: any) {
        var token = await retrieve({ user_id: 455935, teaken: false }, 60, "universal");
        var data = (await db.collection("data").doc("universal").get())
          .data()
          .munzees.map((i: any) => i.split("/"))
          .filter((i: any) => i[0] !== username);
        data = data.filter((i: any) => !(filter || "").split(",").includes(i[4] || "0"));
        var valid = new Set(
          Object.entries(
            (
              await request(
                "munzee/hascaptured",
                { munzee_ids: data.map((i: any) => i[3]).join(",") },
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
                .filter((i: any) => valid.has(i[3]))
                .map((i: any) => ({
                  munzee: i.slice(0, 3).join("/"),
                  type: types.find((x: any) => x.id === (i[4] || "0")),
                  munzee_id: i[3],
                }))
            ),
            total: data.length,
            capped: data.filter((i: any) => !valid.has(i[3])).length,
            types,
            cacheID: Math.floor(Math.random() * 10000),
            token: token.access_token,
          },
        };
      },
    },
    {
      version: 5,
      async function({ params: { username, access_token, filter }, db }: any) {
        var token = await retrieve({ user_id: 455935, teaken: false }, 60, "universal");
        var data = (await db.collection("data").doc("universal").get())
          .data()
          .munzees.map((i: any) => i.split("/"))
          .filter((i: any) => i[0] !== username);
        data = data.filter((i: any) => !filter || filter.split(",").includes(i[4] || "0"));
        var valid = new Set(
          Object.entries(
            (
              await request(
                "munzee/hascaptured",
                { munzee_ids: data.map((i: any) => i[3]).join(",") },
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
                .filter((i: any) => valid.has(i[3]))
                .map((i: any) => ({
                  munzee: i.slice(0, 3).join("/"),
                  type: types.find((x: any) => x.id === (i[4] || "0")),
                  munzee_id: i[3],
                }))
            ),
            total: data.length,
            capped: data.filter((i: any) => !valid.has(i[3])).length,
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
