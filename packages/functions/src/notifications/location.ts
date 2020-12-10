
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Expo'.
var { Expo } = require('expo-server-sdk');

module.exports = {
  path: "notifications/location",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        params: { latitude, longitude, token },
        db
      }: any) {
        if (!Expo.isExpoPushToken(token)) {
          console.error(`Push token ${token} is not a valid Expo push token`);
          return {
            status: "error",
            data: "Invalid Token"
          }
        }
        await db.collection('push').doc(token).update({
          location: {
            latitude: Number(latitude),
            longitude: Number(longitude),
          }
        });
        return {
          status: "success",
          data: true
        };
      },
    },
  ],
};
