import { Route } from "../types";
import { getBouncers } from "../util/cache";

const route: Route = {
  path: "bouncers/expiring",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { time = 600000 } }) {
        const bouncers = await getBouncers();
        return {
          status: "success",
          data: bouncers.filter(bouncer => bouncer.special_good_until * 1000 < Date.now() + time).map((i, n) => ([
            i.friendly_name,
            ("logo" in i ? i.logo : i.mythological_munzee.munzee_logo).slice(49, -4),
            i.special_good_until,
            i.munzee_id,
            n,
            ...("mythological_munzee" in i ? [
              i.mythological_munzee.friendly_name,
              i.mythological_munzee.creator_username,
            ] : [])
          ])),
        };
      },
    },
  ],
};

export default route;
