import { Route } from "../types";
import bouncersService from '../services/bouncers'
const route: Route = {
  path: "services/bouncers",
  latest: 1,
  versions: [
    {
      version: 1,
      async function() {
        await bouncersService();
        return { status: "success", data: true };
      },
    },
  ],
};

export default route;
