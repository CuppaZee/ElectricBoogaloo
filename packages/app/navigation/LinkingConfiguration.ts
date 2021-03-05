import * as Linking from "expo-linking";
import { Platform } from "react-native";

export default {
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
            screens: {
              Profile: ":username",
              Activity: ":username/activity/:date?",
              Inventory: ":username/inventory",
              ZeeOps: ":username/zeeops",
              Challenges: ":username/challenges/:date?",
              Challenge: ":username/challenge/:challenge/:date?",
              Captures: ":username/captures/:category?",
              Bouncers: ":username/bouncers",
              ClanProgress: ":username/clan",
              Universal: ":username/universal",
              Blast: ":username/blast",
              QRew: ":username/qrew",
            },
          },
          Clan: {
            screens: {
              Bookmarks: "clans/:group?/:month?/:year?",
              Requirements: "clan/requirements/:month?/:year?",
              Stats: "clan/:clanid/:month?/:year?",
            },
          },
          Tools: {
            path: "tools",
            screens: {
              Search: "search",
              Calendar: "calendar",
              Bouncers: "bouncers",
              BouncersMap: "bouncers/:type",
              Munzee: "munzee/:a/:b?",
              TypeCategory: "db/:category",
              TypeMunzee: "db/type/:type?",
              Nearby: "nearby",
              Credits: "credits",
              Donate: "donate",
              POIPlanner: "poiplanner",
              EvoPlanner: "evoplanner",
              OpenSource: "opensource",
              WidgetConfigureActivityWidget: "widget_configure_activity_widget/:id",
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
};
