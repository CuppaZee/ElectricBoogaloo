import * as React from "react";
import loadable, { DefaultComponent, OptionsWithResolver } from "@loadable/component";
import { Layout, useTheme } from "@ui-kitten/components";
import { ActivityIndicator, Platform } from "react-native";

export default function lazy(
  loadFn: (props: unknown) => Promise<DefaultComponent<unknown>>,
  options?: OptionsWithResolver<unknown, DefaultComponent<unknown>>
) {
  return loadable(
    async a => {
      try {
        return await loadFn(a);
      } catch (e) {
        if (Platform.OS === "web") {
          location.reload();
        }
        return () => (
          <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {/* <Spinner size="large" status="primary" /> */}
            <ActivityIndicator />
          </Layout>
        );
      }
    },
    {
      fallback: (
        <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {/* <Spinner size="large" status="primary" /> */}
          <ActivityIndicator />
        </Layout>
      ),
      ...(options ?? {}),
    }
  );
}
