import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { UserStackParamList } from "../types";
import Header from "./Header";

// Pages
import loadable from '@loadable/component'
const UserProfileScreen = loadable(() => import("../screens/User/Profile"));
const UserActivityScreen = loadable(() => import("../screens/User/Activity"));
const UserInventoryScreen = loadable(() => import("../screens/User/Inventory"));
const UserZeeOpsScreen = loadable(() => import("../screens/User/ZeeOps"));
const UserChallengesScreen = loadable(() => import("../screens/User/Challenges"));
const UserBouncersScreen = loadable(() => import("../screens/User/Bouncers"));

const UserStack = createStackNavigator<UserStackParamList>();

export default function UserNavigator() {
  return (
    <UserStack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
        cardStyle: {
          maxHeight: "100%",
        },
      }}>
      <UserStack.Screen name="Profile" component={UserProfileScreen} />
      <UserStack.Screen name="Activity" component={UserActivityScreen} />
      <UserStack.Screen name="Inventory" component={UserInventoryScreen} />
      <UserStack.Screen name="ZeeOps" component={UserZeeOpsScreen} />
      <UserStack.Screen name="Bouncers" component={UserBouncersScreen} />
      <UserStack.Screen name="Challenges" component={UserChallengesScreen} />
    </UserStack.Navigator>
  );
}
