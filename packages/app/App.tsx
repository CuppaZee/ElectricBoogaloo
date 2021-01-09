import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme, View } from "react-native";
import Navigation from "./navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as JotaiProvider } from "jotai";

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const MaterialCommunityIconsPack = {
  name: 'mci',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy({}, {
    get(target, name) {
      return IconProvider(name);
    },
  });
}

const IconProvider = (name: string | number | symbol) => ({
  toReactElement: (props: any) => MCIcon({ name, ...props }),
});

function MCIcon({ name, style }: {name: string | number | symbol, style: any}) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <View style={{ height }}><MaterialCommunityIcons name={name as any} size={height} color={tintColor} style={iconStyle} /></View>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 900000
    }
  }
});

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <IconRegistry icons={MaterialCommunityIconsPack} />
      <ApplicationProvider {...eva} theme={{dark: colorScheme === "dark", ...eva[colorScheme ?? "light"]}}>
        <JotaiProvider>
          <QueryClientProvider client={queryClient}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </QueryClientProvider>
        </JotaiProvider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}
