import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import CalendarScreen from "../screens/Tools/Calendar";
import CreditsScreen from "../screens/Tools/Credits";
import { ToolsStackParamList } from "../types";
import Header from "./Header";

const ToolsStack = createStackNavigator<ToolsStackParamList>();

export default function ToolsNavigator() {
  return (
    <ToolsStack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
        cardStyle: {
          maxHeight: "100%"
        }
      }}
    >
      <ToolsStack.Screen name="Calendar" component={CalendarScreen} />
      <ToolsStack.Screen name="Credits" component={CreditsScreen} />
    </ToolsStack.Navigator>
  );
}
