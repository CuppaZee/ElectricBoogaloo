import { retrieve } from "../util";
import config from '../config.json';
import { Route } from "../types";

const route: Route = {
  path: "auth/get",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { teaken: teake, user_id, time }
      }) {
        let teaken = teake;
        if (Date.now() > 1593227045659) return {
          status: "error",
          data: null
        }
        if (config.bypass_teakens.includes(teaken)) {
          teaken = false;
        }
        var got = await retrieve({ user_id, teaken }, time ? Number(time) : 7500);
        if (!got) {
          return {
            status: "error",
            data: null
          }
        }
        return {
          status: "success",
          data: got
        }
      },
    },
    {
      version: 2,
      async function({
        params: { teaken: teake, user_id, time },
        db
      }: any) {
        let teaken: string | boolean = teake;
        if (typeof teaken !== "string") {
          return {
            status: "error",
            data: null,
          };
        }
        if (config.bypass_teakens.includes(teaken)) {
          teaken = false;
        }
        var got = await retrieve({ user_id, teaken }, time ? Number(time) : 7500);
        if (!got) {
          return {
            status: "error",
            data: null
          }
        }
        return {
          status: "success",
          data: got
        }
      },
    },
  ],
};
export default route;