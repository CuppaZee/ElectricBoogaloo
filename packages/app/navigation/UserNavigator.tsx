import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";

import { MainDrawerParamList, UserStackParamList } from "../types";
import Header from "./Header";

// Pages
import { lazy } from "@loadable/component";
import { CompositeNavigationProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
const UserProfileScreen = lazy(() => import("../screens/User/Profile"));
const UserActivityScreen = lazy(() => import("../screens/User/Activity"));
const UserInventoryScreen = lazy(() => import("../screens/User/Inventory"));
const UserZeeOpsScreen = lazy(() => import("../screens/User/ZeeOps"));
const UserChallengesScreen = lazy(() => import("../screens/User/Challenges"));
const UserChallengeScreen = lazy(() => import("../screens/User/Challenge"));
const UserCapturesScreen = lazy(() => import("../screens/User/Captures"));
const UserBouncersScreen = lazy(() => import("../screens/User/Bouncers"));
const UserClanScreen = lazy(() => import("../screens/User/Clan"));
const UserUniversalScreen = lazy(() => import("../screens/User/Universal"));
const UserBlastScreen = lazy(() => import("../screens/User/Blast"));
const UserQRewScreen = lazy(() => import("../screens/User/QRew"));

export type SettingsNavigatorProp<T extends keyof UserStackParamList> = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList, "User">,
  StackNavigationProp<UserStackParamList, T>
>;

const UserStack = createStackNavigator<UserStackParamList>();

export default function UserNavigator() {
  return (
    <UserStack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
        cardStyle: {
          maxHeight: "100%",
        },
      }}>
      <UserStack.Screen name="Profile" component={UserProfileScreen} />
      <UserStack.Screen name="Activity" component={UserActivityScreen} />
      <UserStack.Screen name="Inventory" component={UserInventoryScreen} />
      <UserStack.Screen name="ZeeOps" component={UserZeeOpsScreen} />
      <UserStack.Screen name="Bouncers" component={UserBouncersScreen} />
      <UserStack.Screen name="Challenges" component={UserChallengesScreen} />
      <UserStack.Screen name="Challenge" component={UserChallengeScreen} />
      <UserStack.Screen name="Captures" component={UserCapturesScreen} />
      <UserStack.Screen name="ClanProgress" component={UserClanScreen} />
      <UserStack.Screen name="Universal" component={UserUniversalScreen} />
      <UserStack.Screen name="Blast" component={UserBlastScreen} />
      <UserStack.Screen name="QRew" component={UserQRewScreen} />
    </UserStack.Navigator>
  );
}
