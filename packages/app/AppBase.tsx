import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "./polyfill";

import { Platform, useColorScheme } from "react-native";
import Navigation from "./navigation-drawer";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as JotaiProvider } from "jotai";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import * as themes from "./themes";

import "./lang/i18n";

import CheckStatus from "./BackgroundLocation";
import useSetting, {
  LiveLocationErrorAtom,
  ThemeAtom,
} from "./hooks/useSetting";
import { useTranslation } from "react-i18next";
import "expo-firebase-analytics";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://7823a6409bf1417dafa6f3e3ab47b6ed@o444031.ingest.sentry.io/5418530",
} as any);

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

function AppBase() {
  const colorScheme = useColorScheme();
  const [themeValue] = useSetting(ThemeAtom);
  const [liveLocationError, setLiveLocationError, liveLocationErrorLoaded] = useSetting(
    LiveLocationErrorAtom
  );

  React.useEffect(() => {
    if (liveLocationErrorLoaded && !liveLocationError) {
      CheckStatus().then(value => setLiveLocationError(value));
    }
  }, [liveLocationErrorLoaded]);
  const theme = themeValue !== "generate" && themeValue in themes ? (themes as any)[themeValue] : themes.generate(themeValue);
  const { i18n } = useTranslation();

  return (
    <>
      {Platform.OS === "web" && (
        <style>{`*::-webkit-scrollbar {width: 8px;height:8px;}
          *::-webkit-scrollbar-thumb {background-color: ${
            theme.style === "dark" ? theme["color-basic-1100"] : theme["color-basic-400"]
          };border-radius: 8px;}`}</style>
      )}
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

export default function AppProviders() {
  return (
    <SafeAreaProvider>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <AppBase />
        </QueryClientProvider>
      </JotaiProvider>
    </SafeAreaProvider>
  );
}
