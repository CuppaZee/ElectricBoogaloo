import {request} from "../util";
import types from './universal_types.json';
import { Route } from "../types";
import mongo from "../util/mongo";
import czdb from "../util/czdb";

const route: Route = {
  path: "user/universal/submit",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { code, access_token }
      }) {
        var codeData = code.match(/(?:https?:\/\/(?:www.)?)?(?:munzee.com)?\/?m\/([^/]{0,30})\/([0-9]+)\/([0-9a-zA-Z]{6})/);
        var munzee = await request('munzee', { url: `/m/${codeData[1]}/${codeData[2]}` }, access_token);
        console.log(codeData, types, munzee?.data?.pin_icon);
        var type = types.find(i => czdb.value.strip(i.icon) === czdb.value.strip(munzee?.data?.pin_icon || ""));
        if (!type) {
          return {
            status: "error",
            data: "We don't yet support this type of Munzee."
          }
        }
        if (!munzee?.data?.deployed_at) {
          return {
            status: "error",
            data: "You must deploy the Munzee before submitting."
          }
        }
        await mongo.collection("universals").updateOne({ munzee_id: munzee?.data?.munzee_id?.toString?.() }, {
          $set: {
            code: `${codeData[1]}/${codeData[2]}/${codeData[3].toUpperCase()}`,
            munzee_id: munzee?.data?.munzee_id?.toString?.(),
            type: type?.id,
          }
        }, {upsert: true});
        return {
          status: "success",
          data: true
        }
      },
    },
  ],
};

export default route;