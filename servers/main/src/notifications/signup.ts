import { Route } from "../types";
import { Expo } from 'expo-server-sdk';
import mongo from "../util/mongo";

const route: Route = {
  path: "notifications/signup",
  latest: 1,
  versions: [
    {
      version: 1,
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
        await mongo.db("notifications").collection("settings").updateOne({ token: d.token }, { $set: d }, {upsert: true});
        return {
          status: "success",
          data: d
        };
      },
    },
  ],
};
export default route;
