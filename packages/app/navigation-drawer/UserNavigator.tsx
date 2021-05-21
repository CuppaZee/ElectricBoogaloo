import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";

import { MainDrawerParamList, UserStackParamList } from "../types";
import Header from "./Header";

// Pages
import lazy from "../components/lazy";
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
const UserQRewScreen = lazy(() => import("../screens/User/QRew"));
const UserCubimalsScreen = lazy(() => import("../screens/User/Cubimals"));
const UserQRatesScreen = lazy(() => import("../screens/User/QRates"));
const UserRoomsScreen = lazy(() => import("../screens/User/Rooms"));

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
      <UserStack.Screen
        getId={({ params }) => params.date}
        name="Activity"
        component={UserActivityScreen}
      />
      <UserStack.Screen name="Inventory" component={UserInventoryScreen} />
      <UserStack.Screen name="ZeeOps" component={UserZeeOpsScreen} />
      <UserStack.Screen name="Bouncers" component={UserBouncersScreen} />
      <UserStack.Screen
        getId={({ params }) => params.date}
        name="Challenges"
        component={UserChallengesScreen}
      />
      <UserStack.Screen
        getId={({ params }) => `${params.date}/${params.challenge}`}
        name="Challenge"
        component={UserChallengeScreen}
      />
      <UserStack.Screen
        getId={({ params }) => params.category}
        name="Captures"
        component={UserCapturesScreen}
      />
      <UserStack.Screen name="ClanProgress" component={UserClanScreen} />
      <UserStack.Screen name="QRew" component={UserQRewScreen} />
      <UserStack.Screen name="Cubimals" component={UserCubimalsScreen} />
      <UserStack.Screen name="QRates" component={UserQRatesScreen} />
      <UserStack.Screen name="Rooms" component={UserRoomsScreen} />
    </UserStack.Navigator>
  );
}
