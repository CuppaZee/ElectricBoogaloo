import * as React from "react";

import { MainDrawerParamList } from "../types";
import UserNavigator from "./UserNavigator";
import ToolsNavigator from "./ToolsNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./Drawer";
import { useWindowDimensions } from "react-native";
import ClanNavigator from "./ClanNavigator";
import DashNavigator from "./DashNavigator";
import WelcomeScreen from "../screens/Welcome";
import SettingsNavigator from "./SettingsNavigator";
import { useSettings } from "../hooks/useSettings";

export const isClanStatsBeta = true;

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export default function StackNavigator() {
  const dimensions = useWindowDimensions();
  const [{ready}, , loaded] = useSettings();
  return (
    <Drawer.Navigator
      drawerContent={props => (ready ? <DrawerContent {...props} /> : null)}
      drawerType={dimensions.width > 1000 ? "permanent" : "front"}
      drawerStyle={{ width: ready ? 256 : 0 }}>
      {(!loaded || ready) && (
        <>
          <Drawer.Screen name="Dashboard" component={DashNavigator} />
          {!isClanStatsBeta && (
            <>
              <Drawer.Screen name="User" component={UserNavigator} />
              <Drawer.Screen name="Tools" component={ToolsNavigator} />
              <Drawer.Screen name="Settings" component={SettingsNavigator} />
            </>
          )}
          <Drawer.Screen name="Clan" component={ClanNavigator} />
        </>
      )}
      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
    </Drawer.Navigator>
  );
}
