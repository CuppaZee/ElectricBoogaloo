import * as React from "react";

import WelcomeScreen from "../screens/Welcome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrawerContent from "./Drawer";
import { useWindowDimensions } from "react-native";

import { MainDrawerParamList } from "../types";
import DashNavigator from "./DashNavigator";
import UserNavigator from "./UserNavigator";
import ToolsNavigator from "./ToolsNavigator";
import SettingsNavigator from "./SettingsNavigator";
import ClanNavigator from "./ClanNavigator";
import { Layout, Spinner } from "@ui-kitten/components";
import useSetting, { DrawerAtom, ReadyAtom } from "../hooks/useSetting";

const Drawer = createBottomTabNavigator<MainDrawerParamList>();

export default React.memo(function MainNavigator() {
  const dimensions = useWindowDimensions();
  const [ready, , loaded] = useSetting(ReadyAtom);
  const [drawerSettings] = useSetting(DrawerAtom);
  const open = drawerSettings.open || dimensions.width <= 1000;
  return (
    <React.Suspense
      fallback={
        <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Spinner size="large" status="primary" />
        </Layout>
      }>
      <Drawer.Navigator
        backBehavior="history"
        // drawerContent={props => <DrawerContent {...props} />}
        // drawerType={dimensions.width > 1000 ? "permanent" : "front"}
        // drawerStyle={{ width: ready === "2020-03-20" ? (open ? 256 : 53) : 0 }}
      >
        {!loaded || ready === "2020-03-20" ? (
          <>
            <Drawer.Screen name="Dashboard" component={DashNavigator} />
            <Drawer.Screen
              getId={({ params }) => params.username}
              name="User"
              component={UserNavigator}
            />
            <Drawer.Screen name="Tools" component={ToolsNavigator} />
            <Drawer.Screen name="Settings" component={SettingsNavigator} />
            <Drawer.Screen name="Clan" component={ClanNavigator} />
          </>
        ) : (
          <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        )}
      </Drawer.Navigator>
    </React.Suspense>
  );
}, () => true)
