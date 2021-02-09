import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { SettingsStackParamList } from "../types";
import Header from "./Header";

// Pages
import loadable from '@loadable/component'
const PersonalisationScreen = loadable(() => import("../screens/Settings/Personalisation"));
const AccountsScreen = loadable(() => import("../screens/Settings/Accounts"));
const NotificationScreen = loadable(() => import("../screens/Settings/Notifications"));
const BookmarksScreen = loadable(() => import("../screens/Settings/Bookmarks"));

const SettingsStack = createStackNavigator<SettingsStackParamList>();

export default function SettingsNavigator() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
        cardStyle: {
          maxHeight: "100%",
        },
      }}>
      <SettingsStack.Screen name="Personalisation" component={PersonalisationScreen} />
      <SettingsStack.Screen name="Accounts" component={AccountsScreen} />
      <SettingsStack.Screen name="Notifications" component={NotificationScreen} />
      <SettingsStack.Screen name="Bookmarks" component={BookmarksScreen} />
    </SettingsStack.Navigator>
  );
}
