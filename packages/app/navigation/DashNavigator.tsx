import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";

import { DashStackParamList, MainDrawerParamList } from "../types";
import Header from "./Header";

// Pages
import { lazy } from "@loadable/component";
import { CompositeNavigationProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
const DashboardScreen = lazy(() => import("../screens/Dashboard/Dashboard"))

export type DashNavigatorProp<T extends keyof DashStackParamList> = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList, "Dashboard">,
  StackNavigationProp<DashStackParamList, T>
>;

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
