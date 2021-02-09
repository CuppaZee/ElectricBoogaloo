import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { ToolsStackParamList } from "../types";
import Header from "./Header";

// Pages
import loadable from '@loadable/component'
const SearchScreen = loadable(() => import("../screens/Tools/Search"));
const CalendarScreen = loadable(() => import("../screens/Tools/Calendar"));
const CreditsScreen = loadable(() => import("../screens/Tools/Credits"));
const OpenSourceScreen = loadable(() => import("../screens/Tools/OpenSource"));
const BouncersScreen = loadable(() => import("../screens/Tools/Bouncers"));
const ActivityWidgetScreen = loadable(() => import("../screens/Tools/WidgetConfigure/ActivityWidget"));

const ToolsStack = createStackNavigator<ToolsStackParamList>();

export default function ToolsNavigator() {
  return (
    <ToolsStack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
        cardStyle: {
          maxHeight: "100%",
        },
      }}>
      <ToolsStack.Screen name="Search" component={SearchScreen} />
      <ToolsStack.Screen name="Calendar" component={CalendarScreen} />
      <ToolsStack.Screen name="Credits" component={CreditsScreen} />
      <ToolsStack.Screen name="OpenSource" component={OpenSourceScreen} />
      <ToolsStack.Screen name="Bouncers" component={BouncersScreen} />
      <ToolsStack.Screen name="WidgetConfigureActivityWidget" component={ActivityWidgetScreen} />
    </ToolsStack.Navigator>
  );
}
