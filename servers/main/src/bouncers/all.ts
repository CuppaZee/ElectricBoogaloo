import { Route } from "../types";
import { getBouncers } from "../util/cache";

const route: Route = {
  path: "bouncers/all",
  latest: 1,
  versions: [
    {
      version: 1,
      async function() {
        const bouncers = await getBouncers();
        return {
          status: "success",
          data: bouncers,
        };
      },
    },
  ],
};

export default route;