import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import ClanStatsScreen from "../screens/Clan/Stats";
import ClanBookmarksScreen from "../screens/Clan/Bookmarks";
import { ClanStackParamList } from "../types";
import Header from "./Header";

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
      <ClanStack.Screen name="Stats" component={ClanStatsScreen} />
    </ClanStack.Navigator>
  );
}
