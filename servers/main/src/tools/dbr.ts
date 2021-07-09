import { Route } from "../types";
import { loadAgain } from "../util/czdb";

const route: Route = {
  path: "dbr",
  latest: 1,
  versions: [
    {
      version: 1,
      async function() {
        loadAgain()
        return {
          status: "success",
          data: true,
        };
      },
    },
  ],
};
export default route;
