import { Route } from "../types";
import { retrieve, request, mhq } from "../util";
import calculate from "../util/clancalculator";

const route: Route = {
  path: "user/clanprogress",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { user_id }, db }: any) {
        var token = await retrieve({ user_id, teaken: false }, 60);
        var dates = [];
        var time = mhq();
        for (let i = 3; i <= time.date(); i++) {
          dates.push(i);
        }
        let allDays = await Promise.all(
          dates.map(i =>
            request(
              "statzee/player/day//" as "statzee/player/day",
              {
                day: `${time.year()}-${(time.month() + 1)
                  .toString()
                  .padStart(2, "0")}-${i.toString().padStart(2, "0")}`,
              },
              token.access_token
            )
          )
        );
        var data = calculate(allDays.map(i=>i?.data));
        return {
          status: "success",
          data: data,
        };
      },
    },
  ],
};

export default route;