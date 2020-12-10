
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Expo'.
var { Expo } = require('expo-server-sdk');

module.exports = {
  path: "notifications/signup",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        params: { data },
        db
      }: any) {
        var d = JSON.parse(data);
        if (!Expo.isExpoPushToken(d.token)) {
          console.error(`Push token ${d.token} is not a valid Expo push token`);
          return {
            status: "error",
            data: "Invalid Token"
          }
        }
        await db.collection('push').doc(d.token).set(d);
        return {
          status: "success",
          data: d
        };
      },
    },
  ],
};
