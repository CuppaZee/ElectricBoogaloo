import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { DashStackParamList } from "../types";
import Header from "./Header";

// Pages
import { lazy } from "@loadable/component";
const DashboardScreen = lazy(() => import("../screens/Dashboard/Dashboard"))

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
      <DashStack.Screen name="Dash" component={DashboardScreen} />
    </DashStack.Navigator>
  );
}
