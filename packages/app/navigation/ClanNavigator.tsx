import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { ClanStackParamList } from "../types";
import Header from "./Header";

// Pages
import loadable from '@loadable/component'
const ClanStatsScreen = loadable(() => import("../screens/Clan/Stats"));
const ClanBookmarksScreen = loadable(() => import("../screens/Clan/Bookmarks"));
const ClanRequirementsScreen = loadable(() => import("../screens/Clan/Requirements"));

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
      <ClanStack.Screen name="Requirements" component={ClanRequirementsScreen} />
      <ClanStack.Screen name="Stats" component={ClanStatsScreen} />
    </ClanStack.Navigator>
  );
}
