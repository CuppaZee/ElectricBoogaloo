import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import SearchScreen from "../screens/Tools/Search";
import CalendarScreen from "../screens/Tools/Calendar";
import CreditsScreen from "../screens/Tools/Credits";
import OpenSourceScreen from "../screens/Tools/OpenSource";
import BouncersScreen from "../screens/Tools/Bouncers";
import ActivityWidgetScreen from "../screens/Tools/WidgetConfigure/ActivityWidget";
import { ToolsStackParamList } from "../types";
import Header from "./Header";

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
