import * as React from "react";

import { MainDrawerParamList } from "../types";
import UserNavigator from "./UserNavigator";
import ToolsNavigator from "./ToolsNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./Drawer";
import { useWindowDimensions } from "react-native";
import ClanNavigator from "./ClanNavigator";
import AuthScreen from "../screens/Auth";

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export default function StackNavigator() {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerType={dimensions.width > 1000 ? "permanent" : "front"}
      drawerStyle={{ width: 256 }}
    >
      <Drawer.Screen name="Dashboard" component={AuthScreen} />
      <Drawer.Screen name="User" component={UserNavigator} />
      <Drawer.Screen name="Clan" component={ClanNavigator} />
      <Drawer.Screen name="Tools" component={ToolsNavigator} />
      <Drawer.Screen name="Auth" component={AuthScreen} />
    </Drawer.Navigator>
  );
}
