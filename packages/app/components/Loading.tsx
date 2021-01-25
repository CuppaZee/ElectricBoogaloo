import { Layout, Spinner, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { Image } from "react-native";
import { QueryObserverResult } from "react-query";
import useComponentSize from "../hooks/useComponentSize";

export default function Loading({ data }: { data: QueryObserverResult[] }) {
  const [size, onLayout] = useComponentSize();
  const theme = useTheme();
  if (data.some(i => i.isError)) {
    return (
      <Layout
        onLayout={onLayout}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={
            theme.style === "dark"
              ? require("../assets/images/error.png")
              : require("../assets/images/error-light.png")
          }
          resizeMode="contain"
          style={{
            width: Math.min(300, size?.width || 0),
            height: Math.min(100, size?.height || 0),
          }}
        />
        <Text category="h4">Looks like the coffee split out of the cup.</Text>
        <Text category="s1">Something went wrong when requesting this data.</Text>
      </Layout>
    );
  }

  return (
    <Layout onLayout={onLayout} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner size="large" status="primary" />
    </Layout>
  );
}