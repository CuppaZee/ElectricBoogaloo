import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "./polyfill";

import { Platform, useColorScheme, View } from "react-native";
import Navigation from "./navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as JotaiProvider } from "jotai";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as themes from "./themes";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import "./lang/i18n";

import "./BackgroundLocation";
import useSetting, { ThemeAtom } from "./hooks/useSetting";
import { useTranslation } from "react-i18next";

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
      retry: 1,
    },
  },
});

function AppB() {
  const colorScheme = useColorScheme();
  const [themeValue] = useSetting(ThemeAtom);
  const theme = themes[themeValue];
  const { i18n } = useTranslation();
  return (
    <>
      {Platform.OS === "web" && (
        <style>{`*::-webkit-scrollbar {width: 8px;height:8px;}
          *::-webkit-scrollbar-thumb {background-color: ${
            theme.style === "dark" ? theme["color-basic-1100"] : theme["color-basic-400"]
          };border-radius: 8px;}`}</style>
      )}
      <IconRegistry icons={MaterialCommunityIconsPack} />
      <ApplicationProvider
        {...eva}
        customMapping={
          {
            strict:
              Platform.OS === "android"
                ? {
                    "text-heading-1-font-family": "sans-serif-regular",
                    "text-heading-1-font-weight": "700",
                    "text-heading-2-font-family": "sans-serif-regular",
                    "text-heading-2-font-weight": "700",
                    "text-heading-3-font-family": "sans-serif-regular",
                    "text-heading-3-font-weight": "700",
                    "text-heading-4-font-family": "sans-serif-regular",
                    "text-heading-4-font-weight": "700",
                    "text-heading-5-font-family": "sans-serif-regular",
                    "text-heading-5-font-weight": "700",
                    "text-heading-6-font-family": "sans-serif-regular",
                    "text-heading-6-font-weight": "700",

                    "text-subtitle-1-font-weight": "600",
                    "text-subtitle-1-font-family": "sans-serif-medium",
                    "text-subtitle-2-font-weight": "600",
                    "text-subtitle-2-font-family": "sans-serif-medium",

                    "text-paragraph-1-font-weight": "400",
                    "text-paragraph-1-font-family": "sans-serif",
                    "text-paragraph-2-font-weight": "400",
                    "text-paragraph-2-font-family": "sans-serif",

                    "text-caption-1-font-weight": "400",
                    "text-caption-1-font-family": "sans-serif",
                    "text-caption-2-font-weight": "600",
                    "text-caption-2-font-family": "sans-serif-medium",

                    "text-label-font-weight": "700",
                    "text-label-font-family": "sans-serif-regular",
                  }
                : {
                    "text-heading-1-font-weight": "700",
                    "text-heading-2-font-weight": "700",
                    "text-heading-3-font-weight": "700",
                    "text-heading-4-font-weight": "700",
                    "text-heading-5-font-weight": "700",
                    "text-heading-6-font-weight": "700",
                  },
          } as any
        }
        theme={theme}>
        <Navigation key={i18n.language} colorScheme={colorScheme} />
        <StatusBar />
      </ApplicationProvider>
    </>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts(MaterialCommunityIcons.font);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaProvider>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <AppB />
        </QueryClientProvider>
      </JotaiProvider>
    </SafeAreaProvider>
  );
}
