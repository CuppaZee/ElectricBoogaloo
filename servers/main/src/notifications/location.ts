import { Expo } from 'expo-server-sdk';
import { Route } from '../types';
import mongo from '../util/mongo';

const route: Route = {
  path: "notifications/location",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { latitude, longitude, token }
      }) {
        if (!Expo.isExpoPushToken(token)) {
          console.error(`Push token ${token} is not a valid Expo push token`);
          return {
            status: "error",
            data: "Invalid Token"
          }
        }
        await mongo.db("notifications").collection('settings').updateOne({ token }, {
          "locations.dynamic": {
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

export default route;