import config from '../config';
import { Route } from "../types";
import mongo from '../util/mongo';
import { AuthApplication, validateTeaken } from "../util/retrieve";

const route: Route = {
  path: "auth/settings/save",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { teaken: teake, user_id, settings }
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
        var { valid } = await validateTeaken(Number(user_id), teaken, AuthApplication.Main);
        if (valid) {
          await mongo.collection("user_settings").updateOne({ user_id: Number(user_id) }, { $set: settings }, {upsert: true});
          return {
            status: "success",
            data: true
          };
        }
        return {
          status: "error",
          data: null,
        }
      },
    },
  ],
};
export default route;