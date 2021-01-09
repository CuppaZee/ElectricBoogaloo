import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Platform } from 'react-native';

import SomewhereWithoutCoffeeScreen from '../screens/SomewhereWithoutCoffee';
import { RootStackParamList } from '../types';
import StackNavigator from './MainNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      cardStyle: {
        maxHeight: Platform.OS === "web" ? "100vh" : undefined,
      },
    }}>
      <Stack.Screen name="Root" component={StackNavigator} />
      <Stack.Screen name="somewherewithoutcoffee" component={SomewhereWithoutCoffeeScreen} options={{ title: 'Somewhere without Coffee' }} />
    </Stack.Navigator>
  );
}
