import { Route } from "../types";
import { retrieve, request } from "../util";
var rndKey = (length: any) => {
  var x = '';
  for (var i = 0; i < length; i++) {
    x += Math.floor(Math.random() * 10000).toString(36);
  }
  return x;
};

const route: Route = {
  path: "user/activity",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { user_id, day, from },
        db
      }: any) {
        var token = await retrieve({ user_id, teaken: false }, 60);
        if (!token) {
          return {
            status: "error",
            error_message: "missing_login"
          }
        }
        var data = (
          await request(
            (from ? "/statzee/player/day" : "statzee/player/day") as "statzee/player/day",
            { day },
            token.access_token
          )
        )?.data;
        if (!data) {
          return {
            status: "error",
            error_message: "munzee_api_5xx"
          }
        }
        return {
          status: "success",
          data: {
            ...data,
            captures: data.captures.map(i => ({
              ...i,
              key: rndKey(3)
            })),
            deploys: data.deploys.map(i => ({
              ...i,
              key: rndKey(3)
            })),
            captures_on: data.captures_on.map(i => ({
              ...i,
              key: rndKey(3)
            }))
          }
        };
      },
    },
  ],
};
export default route;