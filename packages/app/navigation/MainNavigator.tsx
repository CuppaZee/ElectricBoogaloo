import * as React from "react";

import WelcomeScreen from "../screens/Welcome";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./Drawer";
import { useWindowDimensions } from "react-native";

import { MainDrawerParamList } from "../types";
import DashNavigator from "./DashNavigator";
import UserNavigator from "./UserNavigator";
import ToolsNavigator from "./ToolsNavigator";
import SettingsNavigator from "./SettingsNavigator";
import ClanNavigator from "./ClanNavigator";
import { Layout, Spinner } from "@ui-kitten/components";
import useSetting, { ReadyAtom } from "../hooks/useSetting";

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export default function MainNavigator() {
  const dimensions = useWindowDimensions();
  const [ready, , loaded] = useSetting(ReadyAtom);
  return (
    <React.Suspense
      fallback={
        <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Spinner size="large" status="primary" />
        </Layout>
      }>
      <Drawer.Navigator
        backBehavior="history"
        drawerContent={props => (ready === "2020-02-12" ? <DrawerContent {...props} /> : null)}
        drawerType={dimensions.width > 1000 ? "permanent" : "front"}
        drawerStyle={{ width: ready === "2020-02-12" ? 256 : 0 }}>
        {(!loaded || ready === "2020-02-12") && (
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
        )}
        <Drawer.Screen name="Welcome" component={WelcomeScreen} />
      </Drawer.Navigator>
    </React.Suspense>
  );
}
