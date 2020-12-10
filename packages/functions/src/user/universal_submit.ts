
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'request'.
var {request} = require("../util");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'admin'.
const admin = require('firebase-admin');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'types'.
const types = require('./universal_types.json');

module.exports = {
  path: "user/universal/submit",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "user_id",
        },
      },
      async function({
        params: { code, access_token },
        db
      }: any) {
        var codeData = code.match(/(?:https?:\/\/(?:www.)?)?(?:munzee.com)?\/?m\/([^/]{0,30})\/([0-9]+)\/([0-9a-zA-Z]{6})/);
        var munzee = await request('munzee', { url: `/m/${codeData[1]}/${codeData[2]}` }, access_token);
        var type = types.find((i: any) => i.icon === munzee.pin_icon);
        if(!type) {
          return {
            status: "success",
            data: "We don't yet support this type of Munzee."
          }
        }
        await db.collection('data').doc('universal').update({
          munzees: admin.firestore.FieldValue.arrayUnion(`${codeData[1]}/${codeData[2]}/${codeData[3].toUpperCase()}/${munzee.munzee_id}/${type.id}`)
        });
        return {
          status: "success",
          data: true
        }
      },
    },
  ],
};
