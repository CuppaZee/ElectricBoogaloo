import { Route } from "../types";
import { retrieve, request } from "../util";

const route: Route = {
  path: "user/find",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { text },
        db
      }: any) {
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        if (!token) {
          return {
            status: "error",
            error_message: "missing_login"
          }
        }
        var data = await request('user/find', { text }, token.access_token)
        if (!data) {
          return {
            status: "error",
            error_message: "munzee_api_5xx"
          }
        }
        return {
          status: "success",
          data: data
        }
      },
    },
  ],
};

export default route;