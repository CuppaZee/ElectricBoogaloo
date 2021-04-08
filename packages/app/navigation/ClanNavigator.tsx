import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";

import { ClanStackParamList, MainDrawerParamList } from "../types";
import Header from "./Header";

// Pages
import lazy from "../components/lazy";
import { CompositeNavigationProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
const ClanStatsScreen = lazy(() => import("../screens/Clan/Stats"));
const ClanBookmarksScreen = lazy(() => import("../screens/Clan/Bookmarks"));
const ClanRequirementsScreen = lazy(() => import("../screens/Clan/Requirements"));
const CuppaManagerScreen = lazy(() => import("../screens/Clan/CuppaManager"));

export type ClanNavigatorProp<T extends keyof ClanStackParamList> = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList, "Dashboard">,
  StackNavigationProp<ClanStackParamList, T>
>;

const ClanStack = createStackNavigator<ClanStackParamList>();

export default function ClanNavigator() {
  return (
    <ClanStack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
        cardStyle: {
          maxHeight: "100%",
        },
      }}>
      <ClanStack.Screen name="Bookmarks" component={ClanBookmarksScreen} />
      <ClanStack.Screen name="Cuppa" component={CuppaManagerScreen} />
      <ClanStack.Screen name="Requirements" component={ClanRequirementsScreen} />
      <ClanStack.Screen
        getId={({ params }) => params?.clanid.toString()}
        name="Stats"
        component={ClanStatsScreen}
      />
    </ClanStack.Navigator>
  );
}
