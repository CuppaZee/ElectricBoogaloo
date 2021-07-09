import { retrieve } from "../util";
import config from '../config';
import { Route } from "../types";

const route: Route = {
  path: "auth/get",
  latest: 2,
  versions: [
    {
      version: 2,
      async function({
        params: { teaken: teake, user_id, time, ...rest }
      }: any) {
        if (rest.access_token) {
          return { status: "success", data: rest };
        }
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