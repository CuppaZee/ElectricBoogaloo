import { NavigationContainer, DefaultTheme, DarkTheme, getPathFromState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import * as Notifications from "expo-notifications";
import { ColorSchemeName, Platform } from 'react-native';

import SomewhereWithoutCoffeeScreen from '../screens/SomewhereWithoutCoffee';
import { RootStackParamList } from '../types';
import MainNavigator from "./MainNavigator";
import LinkingConfiguration from './LinkingConfiguration';
import * as Analytics from "expo-firebase-analytics";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const LinkingConfig = React.useMemo(() => LinkingConfiguration(lastNotificationResponse || undefined), [lastNotificationResponse]);
  return (
    <NavigationContainer
      linking={LinkingConfig}
      onStateChange={(state) => {
        if (!state) return;
        const currentScreen = getPathFromState(state);
        Analytics.setCurrentScreen(currentScreen);
      }}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        // header: props => <Header {...props} />,
        headerShown: false,
        cardStyle: {
          maxHeight: Platform.OS === "web" ? "100vh" : undefined,
        },
      }}>
      <Stack.Screen name="Root" component={MainNavigator} />
      <Stack.Screen
        name="somewherewithoutcoffee"
        component={SomewhereWithoutCoffeeScreen}
        options={{ title: "Somewhere without Coffee" }}
      />
    </Stack.Navigator>
  );
}
