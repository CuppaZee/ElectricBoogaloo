import { Route } from "../types";
import { Expo } from 'expo-server-sdk';
import { DeviceNotificationSettings, FullDeviceNotificationSettings } from "../util/notificationSettings";

const route: Route = {
  path: "notifications/get",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { token },
        db
      }) {
        if (!Expo.isExpoPushToken(token)) {
          console.error(`Push token ${token} is not a valid Expo push token`);
          return {
            status: "error",
            data: "Invalid Token"
          }
        }
        const data = (await db.collection("notification_settings").doc(token).get()).data() as Partial<DeviceNotificationSettings> | null;
        var d: FullDeviceNotificationSettings = {
          type: "expo",
          token,
          users: [],
          munzee_blog: false,
          imperial: false,
          starred_users: [],
          ...(data || {}),
          locations: {
            static: [],
            ...(data?.locations ?? {}),
          },
          bouncers: {
            enabled: false,
            default: "0",
            starred: "",
            overrides: [],
            ...(data?.bouncers ?? {}),
          },
        };
        return {
          status: "success",
          data: d
        };
      },
    },
  ],
};

export default route;