import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "./polyfill";

import { useColorScheme } from "react-native";
import Navigation from "./navigation-drawer";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as JotaiProvider } from "jotai";

import "./lang/i18n";

import CheckStatus from "./BackgroundLocation";
import useSetting, {
  LiveLocationErrorAtom,
} from "./hooks/useSetting";
import { useTranslation } from "react-i18next";
import "expo-firebase-analytics";
import * as Sentry from "sentry-expo";
import EvaWrapper from "./EvaWrapper";

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
  const [liveLocationError, setLiveLocationError, liveLocationErrorLoaded] = useSetting(
    LiveLocationErrorAtom
  );

  React.useEffect(() => {
    if (liveLocationErrorLoaded && !liveLocationError) {
      CheckStatus().then(value => setLiveLocationError(value));
    }
  }, [liveLocationErrorLoaded]);
  const { i18n } = useTranslation();

  return (
    <>
      <EvaWrapper>
        <Navigation key={i18n.language} colorScheme={colorScheme} />
        <StatusBar />
      </EvaWrapper>
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
