import {request} from "../util";
import admin from 'firebase-admin';
import types from './universal_types.json';
import { Route } from "../types";

const route: Route = {
  path: "user/universal/submit",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { code, access_token },
        db
      }: any) {
        var codeData = code.match(/(?:https?:\/\/(?:www.)?)?(?:munzee.com)?\/?m\/([^/]{0,30})\/([0-9]+)\/([0-9a-zA-Z]{6})/);
        var munzee = await request('munzee', { url: `/m/${codeData[1]}/${codeData[2]}` }, access_token);
        var type = types.find(i => i.icon === munzee?.data?.pin_icon);
        if(!type) {
          return {
            status: "success",
            data: "We don't yet support this type of Munzee."
          }
        }
        if(!munzee?.data?.deployed_at) {
          return {
            status: "success",
            data: "You must deploy the Munzee before submitting."
          }
        }
        await db.collection('data').doc('universal').update({
          munzees: admin.firestore.FieldValue.arrayUnion(`${codeData[1]}/${codeData[2]}/${codeData[3].toUpperCase()}/${munzee?.data?.munzee_id}/${type.id}`)
        });
        return {
          status: "success",
          data: true
        }
      },
    },
  ],
};

export default route;