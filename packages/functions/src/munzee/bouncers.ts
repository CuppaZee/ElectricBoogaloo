import { Route } from "../types";
import { retrieve, request } from "../util";

const route: Route = {
  path: "munzee/bouncers",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { munzee_id, username, munzee },
        db
      }) {
        var token = await retrieve({ user_id: 125914, teaken: false }, 60);
        var data = (await request('munzee', munzee_id ? { munzee_id } : { url: `/m/${username}/${munzee}` }, token.access_token))?.data;
        if (!data) {
          return {
            status: "error",
            data: null
          }
        }
        if (data.bouncers) {
          return {
            status: "success",
            data: data.bouncers
          }
        }
        if (data.unicorn_munzee) {
          return {
            status: "success",
            data: [
              {
                unicorn_id: Number(data.unicorn_munzee.munzee_id),
                time_placed: null,
                good_until: data.special_good_until?.toString(),
                mythological_capture_type: data.mythological_capture_type,
                munzee_logo: data.pin_icon,
                unicorn_munzee: data.unicorn_munzee,
                mythological_type: data.mythological_type
              }
            ]
          }
        }
        return {
          status: "success",
          data: []
        }
      },
    },
  ],
};

export default route;