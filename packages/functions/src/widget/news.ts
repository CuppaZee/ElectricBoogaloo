import { Route } from "../types";
import { retrieve, request } from "../util";

const route: Route = {
  path: "widget/news",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ db }) {
        var token = await retrieve({ user_id: 125914, teaken: false }, 60);
        if (!token) {
          return {
            status: "error",
            error_message: "missing_login",
          };
        }
        var news = (await request("assets/news", {}, token.access_token))?.data;
        if (!news) {
          return {
            status: "error",
            error_message: "munzee_api_5xx",
          };
        }
        return {
          status: "success",
          data: news.data,
        };
      },
    },
  ],
};
export default route;
