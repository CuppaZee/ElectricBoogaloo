import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme, View } from "react-native";
import Navigation from "./navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as JotaiProvider } from "jotai";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as themes from "./themes";

function MCIcon({ name, style }: { name: string | number | symbol; style: any }) {
  try {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <View style={{ height }}>
        <MaterialCommunityIcons
          name={name as any}
          size={height}
          color={tintColor}
          style={iconStyle}
        />
      </View>
    );
  } catch (e) {}
}

const IconProvider = (name: string | number | symbol) => ({
  toReactElement: (props: any) => MCIcon({ name, ...props }),
});

function createIconsMap() {
  const x: { [key: string]: any } = {};
  for (const glyph of Object.keys(MaterialCommunityIcons.glyphMap)) {
    x[glyph] = IconProvider(glyph);
  }
  return x;
}

export const MaterialCommunityIconsPack = {
  name: "mci",
  icons: createIconsMap(),
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 900000,
    },
  },
});

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <IconRegistry icons={MaterialCommunityIconsPack} />
      <ApplicationProvider {...eva} theme={themes.green_light}>
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
