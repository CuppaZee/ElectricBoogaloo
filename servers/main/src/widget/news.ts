import { Route } from "../types";
import { retrieve, request } from "../util";

const cache: {
  data: any;
  updated_at: number;
} = {
  updated_at: 0,
  data: null,
};

const route: Route = {
  path: "widget/news",
  latest: 1,
  versions: [
    {
      version: 1,
      async function() {
        if (cache.updated_at > Date.now() - 900000) {
          return {
            status: "success",
            data: cache.data,
          };
        }
        console.log("CZ- WIDGET NEWS");
        // return {
        //   status: "success",
        //   data: [
        //     {
        //       id: "1234",
        //       show_at: "",
        //       title: "Feature Disabled",
        //       image_url: "",
        //       blog_url: "https://fb.me/CuppaZee",
        //     },
        //     {
        //       id: "5678",
        //       show_at: "",
        //       title: "Visit our Facebook Page to find out more",
        //       image_url: "",
        //       blog_url: "https://fb.me/CuppaZee",
        //     },
        //   ],
        // };
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
        cache.updated_at = Date.now();
        cache.data = news.data;
        return {
          status: "success",
          data: news.data,
        };
      },
    },
  ],
};
export default route;
