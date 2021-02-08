import { Route } from "../types";
import { retrieve, request } from "../util";

const types = [
  "courierpigeon",
  "specialdeliverycupid",
  "fire",
  "cherub",
  "aphrodite",
  "ametust",
  ["sorrycard", "sorrycard1", "sorrycard2", "sorrycard3"],
  "mace",
  "courierstork",
  "greenheartbreaker",
  "valentinecard",
  "cherubcard",
  "munzee",
  "teddybearcard",
  "heartshapedboxcard",
  "shesaidyes-virtual",
  "courierowl",
  "ruby",
  "poicinema",
  ["rose", "redroseblossom", "whiteroseblossom", "violetroseblossom", "yellowroseblossom"],
  "tuxflatrob",
  "polkadotflatlou",
  "urbanfit",
  "archerygardengnome",
  "cherryblossom",
];

const route: Route = {
  path: "valentinesbingo",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { username }, db, res }: any) {
        if (!username) {
          res.send(
            `<input id="hello" placeholder="Username" /><br/><button onclick="window.location = \`/valentinesbingo?username=\$\{document.getElementById('hello').value\}\`">View Progress</button><br /><img src="https://server.beta.cuppazee.app/logo.png" style="width: 300px" />`
          );
          return { norespond: true };
        }
        var token = await retrieve({ user_id: 125914, teaken: false }, 60);
        if (!token) {
          return {
            status: "error",
            error_message: "missing_login",
          };
        }
        var user = await request("user", { username }, token.access_token);
        var data = await request(
          // @ts-ignore
          "user/specials",
          { user_id: user?.data?.user_id },
          token.access_token
        );
        if (!data) {
          return {
            status: "error",
            error_message: "munzee_api_5xx",
          };
        }
        res.send(
          `<div style="width: 450px;display:flex;flex-wrap:wrap;align-items:flex-start;">${types
            .map(
              i =>
                `<img src="https://munzee.global.ssl.fastly.net/images/pins/${
                  typeof i === "string" ? i : i[0]
                }.png" style="background-color: ${
                  i === "munzee" ||
                  (typeof i === "string"
                    ? // @ts-ignore
                      data?.data?.some(j => j.logo === i)
                    : // @ts-ignore
                      data?.data?.some(j => i.includes(j.logo)))
                    ? "lime"
                    : "red"
                };display:flex;margin:0;padding:0;justify-content:center;align-items:center;width: 64px;height:64px;border: 8px solid #FE99BC;" />`
            )
            .join(
              ""
            )}</div><br/><br/><input id="hello" placeholder="Username" /><br/><button onclick="window.location = \`/valentinesbingo?username=\$\{document.getElementById('hello').value\}\`">View Progress</button><br /><img src="https://server.beta.cuppazee.app/logo.png" style="width: 300px" />`
        );
        return {
          norespond: true,
        } as any;
      },
    },
  ],
};

export default route;
