import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import ClanStatsScreen from "../screens/Clan/Stats";
import { ClanStackParamList } from "../types";
import Header from "./Header";

const ClanStack = createStackNavigator<ClanStackParamList>();

export default function ClanNavigator() {
  return (
    <ClanStack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
        cardStyle: {
          maxHeight: "100%"
        }
      }}
    >
      <ClanStack.Screen name="Stats" component={ClanStatsScreen} />
    </ClanStack.Navigator>
  );
}
