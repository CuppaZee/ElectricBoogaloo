import { Route } from "../types";
import { retrieve, request, mhqStr } from "../util";

const route: Route = {
  path: "widget/activity",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { username }
      }) {
        console.log("CZ- WIDGET ACTIVITY");
        // return {
        //   status: "success",
        //   data: {
        //     username: "Disabled",
        //     user_id: 0,
        //     time: Date.now(),
        //     capture_count: 0,
        //     capture_points: 0,
        //     deploy_count: 0,
        //     deploy_points: 0,
        //     capon_count: 0,
        //     capon_points: 0,
        //     daily_points: 0,
        //     total_points: 0,
        //   },
        // };
        if (!username) {
          return {
            status: "success",
            data: {
              username: "Long-Press to Edit Username",
              user_id: 0,
              time: Date.now(),
              capture_count: 0,
              capture_points: 0,
              deploy_count: 0,
              deploy_points: 0,
              capon_count: 0,
              capon_points: 0,
              daily_points: 0,
              total_points: 0,
            },
          };
        }
        var token = await retrieve({ user_id: 125914, teaken: false }, 60);
        if (!token) {
          return {
            status: "error",
            error_message: "missing_login"
          }
        }
        var user = (await request('user', { username }, token.access_token))?.data;
        if (!user) {
          return {
            status: "error",
            error_message: "munzee_api_5xx"
          }
        }
        token = await retrieve({ user_id: user.user_id, teaken: false }, 60);
        if (!token) {
          return {
            status: "error",
            error_message: "missing_login"
          }
        }
        var data = (
          await request(
            "//statzee/player/day" as "statzee/player/day",
            { day: mhqStr() },
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
            username: user.username,
            user_id: user.user_id,
            time: Date.now(),
            capture_count: data.captures.length,
            capture_points: data.captures.reduce((a, b) => a + Number(b.points), 0),
            deploy_count: data.deploys.length,
            deploy_points: data.deploys.reduce((a, b) => a + Number(b.points), 0),
            capon_count: data.captures_on.length,
            capon_points: data.captures_on.reduce((a, b) => a + Number(b.points_for_creator), 0),
            daily_points:
              data.captures.reduce((a, b) => a + Number(b.points), 0) +
              data.deploys.reduce((a, b) => a + Number(b.points), 0) +
              data.captures_on.reduce((a, b) => a + Number(b.points_for_creator), 0),
            total_points: user.points,
          },
        };
      },
    },
  ],
};
export default route;