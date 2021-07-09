import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import { NotificationResponse } from "expo-notifications";
import { Alert, NativeModules, Platform, DeviceEventEmitter } from "react-native";

const mainUser = { value: "sohcah" };

export default function getConfig(notification?: NotificationResponse): LinkingOptions {
  return {
    prefixes:
      Platform.OS === "web" ? [Linking.makeUrl("/")] : ["cuppazee://", "uk.cuppazee.paper://"],
    config: {
      screens: {
        Root: {
          screens: {
            Dashboard: {
              path: "",
              screens: {
                Dash: "",
              },
            },
            User: {
              path: "user",
              screens: Object.fromEntries(
                Object.entries({
                  Profile: ":username",
                  Activity: ":username/activity/:date?",
                  Inventory: ":username/inventory",
                  ZeeOps: ":username/zeeops",
                  Challenges: ":username/challenges/:date?",
                  Challenge: ":username/challenge/:challenge/:date?",
                  Captures: ":username/captures/:category?",
                  Bouncers: ":username/bouncers",
                  ClanProgress: ":username/clan",
                  QRew: ":username/qrew",
                  Cubimals: ":username/cubimals",
                  QRates: ":username/qrates",
                  Rooms: ":username/rooms",
                }).map(i => [
                  i[0],
                  {
                    path: i[1],
                    parse: {
                      username: value => (value === "_" ? mainUser.value : value),
                    },
                    stringify: {
                      username: value => (value === mainUser.value ? "_" : value),
                    },
                  },
                ])
              ),
            },
            Clan: {
              screens: {
                Cuppa: "clanmanager",
                Bookmarks: "clans/:group?/:month?/:year?",
                Requirements: "clan/requirements/:month?/:year?",
                Stats: "clan/:clanid/:month?/:year?",
              },
            },
            Tools: {
              screens: {
                Search: "search",

                Calendar: "tools/calendar",
                EvoPlanner: "tools/evoplanner",
                TestScan: "tools/testscan",
                Universal: "tools/universal",
                WidgetConfigureActivityWidget: "tools/widget_configure_activity_widget/:id",

                Bouncers: "bouncers/overview",
                BouncersExpiring: "bouncers/expiring",
                Nearby: "bouncers/nearby",
                BouncersMap: "bouncers/:type",

                Blast: "planner/blast",
                POIPlanner: "planner/poi",
                DestinationPlanner: "planner/destination",

                Munzee: "munzee/:a/:b?",

                TypeCategory: "db/:category",
                TypeMunzee: "db/type/:type?",

                Credits: "about/credits",
                Donate: "about/donate",
                OpenSource: "about/opensource",

                GardenPainter: "garden/painter",
              },
            },
            Settings: {
              path: "settings",
              screens: {
                Personalisation: "personalisation",
                Accounts: "accounts",
                Notifications: "notifications",
                Bookmarks: "bookmarks",
              },
            },
            Welcome: "welcome",
          },
        },
        somewherewithoutcoffee: "*",
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();

      if (url != null) {
        return url;
      }

      // Get the `url` property from the notification which corresponds to a screen
      // This property needs to be set on the notification payload when sending it
      const notificationPath = notification?.notification.request.content.data.path;
      if (notificationPath && typeof notificationPath === "string") {
        return notificationPath;
      }

      return;
    },
    subscribe(listener) {
      const loadedMainuser = AsyncStorage.getItem("USER_BOOKMARKS").then(data => {
        try {
          const d = JSON.parse(data || "{}");
          mainUser.value = d[0].username;
        } catch {}
      });
      const onReceiveURL = async ({ url }: { url: string }) => {
        await loadedMainuser;
        listener(url);
      };

      // Listen to incoming links from deep linking
      Linking.addEventListener("url", onReceiveURL);

      // Listen to expo push notifications
      const subscription = Notifications.addNotificationResponseReceivedListener(async response => {
        const path = response.notification.request.content.data.path;
        const url = response.notification.request.content.data.url;

        if (path && typeof path === "string") {
          await loadedMainuser;
          listener("uk.cuppazee.paper://" + path);
        }

        if (url && typeof url === "string") {
          Linking.openURL(url);
        }
      });

      return () => {
        // Clean up the event listeners
        Linking.removeEventListener("url", onReceiveURL);
        subscription.remove();
      };
    },
  };
}
