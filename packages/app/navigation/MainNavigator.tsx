import * as React from "react";

import { MainDrawerParamList } from "../types";
import UserNavigator from "./UserNavigator";
import ToolsNavigator from "./ToolsNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./Drawer";
import { useWindowDimensions } from "react-native";
import ClanNavigator from "./ClanNavigator";
import AuthScreen from "../screens/Auth";
import { useTeakens } from "../hooks/useToken";

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export default function StackNavigator() {
  const dimensions = useWindowDimensions();
  const teakens = useTeakens();
  return (
    <Drawer.Navigator
      drawerContent={(props) => (Object.keys(teakens.data).length > 0 ? <DrawerContent {...props} /> : null)}
      drawerType={dimensions.width > 1000 ? "permanent" : "front"}
      drawerStyle={{ width: Object.keys(teakens.data).length > 0 ? 256 : 0 }}
    >
      {(!teakens.loaded || Object.keys(teakens.data).length > 0) && <>
        <Drawer.Screen name="Dashboard" component={AuthScreen} />
        <Drawer.Screen name="User" component={UserNavigator} />
        <Drawer.Screen name="Clan" component={ClanNavigator} />
        <Drawer.Screen name="Tools" component={ToolsNavigator} />
      </>}
      <Drawer.Screen name="Auth" component={AuthScreen} />
    </Drawer.Navigator>
  );
}
