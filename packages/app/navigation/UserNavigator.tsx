import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import UserProfileScreen from "../screens/User/Profile";
import UserActivityScreen from "../screens/User/Activity";
import UserInventoryScreen from "../screens/User/Inventory";
import { UserStackParamList } from "../types";
import Header from "./Header";

const UserStack = createStackNavigator<UserStackParamList>();

export default function UserNavigator() {
  return (
    <UserStack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
        cardStyle: {
          maxHeight: "100%"
        }
      }}
    >
      <UserStack.Screen name="Profile" component={UserProfileScreen} />
      <UserStack.Screen name="Activity" component={UserActivityScreen} />
      <UserStack.Screen name="Inventory" component={UserInventoryScreen} />
    </UserStack.Navigator>
  );
}
