import { Button, Icon, Layout, List, ListItem, Text } from "@ui-kitten/components";
import * as React from "react";
import { Linking } from "react-native";
import dependencies from "../../assets/dependencies.json";
import useTitle from "../../hooks/useTitle";

type Lib = {
  Name: string;
  Version: string;
  License: string;
  URL: string;
  VendorUrl: string;
  VendorName: string;
  Starred: boolean;
};

const excludedLibs = new Set(["@cuppazee/app", "@cuppazee/clan", "@cuppazee/functions"]);
const starredLibs = new Set([
  "@cuppazee/api",
  "@cuppazee/icons",
  "@cuppazee/types",
  "@eva-design/eva",
  "@expo/vector-icons",
  "@react-google-maps/api",
  "@react-native-async-storage/async-storage",
  "@react-native-community/masked-view",
  "@react-navigation/bottom-tabs",
  "@react-navigation/drawer",
  "@react-navigation/native",
  "@react-navigation/stack",
  "@types/color",
  "@types/react-native-snap-carousel",
  "@ui-kitten/components",
  "@ui-kitten/eva-icons",
  "@visx/group",
  "@visx/hierarchy",
  "@visx/mock-data",
  "@visx/scale",
  "color",
  "dayjs",
  "expo",
  "expo-app-loading",
  "expo-asset",
  "expo-clipboard",
  "expo-constants",
  "expo-font",
  "expo-linear-gradient",
  "expo-linking",
  "expo-notifications",
  "expo-random",
  "expo-splash-screen",
  "expo-status-bar",
  "expo-task-manager",
  "expo-updates",
  "expo-web-browser",
  "fast-json-stable-stringify",
  "fuse.js",
  "i18next",
  "jotai",
  "react",
  "react-dom",
  "react-i18next",
  "react-native",
  "react-native-gesture-handler",
  "react-native-map-clustering",
  "react-native-maps",
  "react-native-reanimated",
  "react-native-safe-area-context",
  "react-native-screens",
  "react-native-snap-carousel",
  "react-native-svg",
  "react-native-unimodules",
  "react-native-web",
  "react-native-web-swiper",
  "react-query",

  "@babel/core",
  "@expo/webpack-config",
  "@types/react",
  "@types/react-native",
  "babel-jest",
  "expo-yarn-workspaces",
  "jest",
  "jest-expo",
  "react-test-renderer",
  "typescript",
  "webpack-bundle-analyzer",
]);
const libs: any[] = dependencies.data.body
  .map(dep => ({
    Name: dep[0],
    Version: dep[1],
    License: dep[2],
    URL: dep[3],
    VendorUrl: dep[4],
    VendorName: dep[5],
    Starred: dep[0].includes("cuppazee") || starredLibs.has(dep[0]),
  }))
  .filter(i => !excludedLibs.has(i.Name))
  .sort((a, b) => (a.Name > b.Name ? 1 : (a.Name < b.Name ? -1 : 0)));

export default function OpenSourceScreen() {
  useTitle("☕ Open Source");
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <List
        ListHeaderComponent={
          <Layout>
            <Layout style={{ margin: 4, padding: 4, borderRadius: 8 }} level="3">
              <Text style={{ textAlign: "center" }} category="h5">
                CuppaZee Open Source
              </Text>
              <Text style={{ textAlign: "center" }} category="p1">
                The source code for the CuppaZee App is available on GitHub
              </Text>
              <Button
                appearance="ghost"
                size="small"
                accessoryLeft={props => <Icon {...props} name="code-tags" />}
                onPress={() => Linking.openURL("https://github.com/CuppaZee/ElectricBoogaloo")}
              >
                Source Code
              </Button>
              <Text style={{ textAlign: "center" }} category="p1">
                CuppaZee publishes 3 packages on NPM
              </Text>
              <Text style={{ textAlign: "center" }} category="p2">
                @cuppazee/types - A Database of Most Munzee Types
              </Text>
              <Text style={{ textAlign: "center" }} category="p2">
                @cuppazee/icons - A Database of Most Munzee Type Icons
              </Text>
              <Text style={{ textAlign: "center" }} category="p2">
                @cuppazee/api - TypeScript Definitions for the Munzee API
              </Text>
            </Layout>
          </Layout>
        }
        windowSize={5}
        style={{ width: 600, maxWidth: "100%" }}
        data={[...libs.filter(i => i.Starred), ...libs.filter(i => !i.Starred)]}
        keyExtractor={i => `${i.Name}@${i.Version}`}
        renderItem={({ item }: { item: Lib }) => (
          <ListItem
            title={`${item.Name} - ${item.Version}`}
            description={`${item.VendorName} - ${item.VendorUrl}\n${item.License} License`}
            accessoryLeft={item.Starred ? props => <Icon {...props} name="star" /> : undefined}
            accessoryRight={() => (
              <>
                {item.VendorUrl !== "Unknown" && (
                  <Button
                    appearance="ghost"
                    size="small"
                    accessoryLeft={props => <Icon {...props} name="link" />}
                    onPress={() => Linking.openURL(item.VendorUrl)}
                  />
                )}
                {item.URL !== "Unknown" && (
                  <Button
                    appearance="ghost"
                    size="small"
                    accessoryLeft={props => <Icon {...props} name="code-tags" />}
                    onPress={() => Linking.openURL(item.URL)}
                  />
                )}
              </>
            )}
          />
        )}
      />
    </Layout>
  );
}
