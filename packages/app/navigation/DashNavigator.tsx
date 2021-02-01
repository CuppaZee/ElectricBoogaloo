import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { DashStackParamList } from "../types";
import Header from "./Header";
import DashboardScreen from "../screens/Dashboard";
import { isClanStatsBeta } from "./MainNavigator";

const DashStack = createStackNavigator<DashStackParamList>();

export default function DashNavigator() {
  return (
    <DashStack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
        cardStyle: {
          maxHeight: "100%",
        },
      }}>
      <DashStack.Screen name="Dash" component={isClanStatsBeta ? (() => null) : DashboardScreen} />
    </DashStack.Navigator>
  );
}
