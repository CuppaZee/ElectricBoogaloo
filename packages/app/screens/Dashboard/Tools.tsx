import { useNavigation } from "@react-navigation/native";
import { Layout, Text, DrawerItem } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, ScrollView, View, Platform } from "react-native";
import Icon from "../../components/Common/Icon";
import Tip from "../../components/Common/Tip";
import { useClanBookmarks } from "../../hooks/useBookmarks";
import useTitle from "../../hooks/useTitle";
import { DashCardProps } from "./Dashboard";

export const ToolsPagesBouncers = [
  {
    icon: "map-marker-radius",
    title: "tools_nearby",
    screen: "Nearby",
  },
  {
    icon: "map-marker",
    nontranslatedtitle: "Bouncers Overview",
    screen: "Bouncers",
  },
  {
    icon: "clock",
    nontranslatedtitle: "Bouncing Soon",
    screen: "BouncersExpiring",
  },
] as const;
export const ToolsPages = [
  {
    icon: "magnify",
    title: "tools_search",
    screen: "Search",
  },
  {
    icon: "database",
    title: "tools_munzee_types",
    screen: "TypeCategory",
    params: { category: "root" },
  },
  {
    icon: "calendar",
    title: "tools_calendar",
    screen: "Calendar",
  },
  {
    icon: "dna",
    title: "tools_evo_planner",
    screen: "EvoPlanner",
  },
  {
    icon: "qrcode",
    nontranslatedtitle: "Test Scan",
    screen: "TestScan",
    disabled: true,
  },
] as const;
export const ToolsPagesMaps = [
  {
    icon: "map-marker-circle",
    title: "tools_poiplanner",
    screen: "POIPlanner",
  },
  {
    icon: "home-circle-outline",
    nontranslatedtitle: "Destination Planner",
    screen: "DestinationPlanner",
  },
] as const;
export const ToolsPagesSettings = [
  {
    icon: "palette",
    title: "settings_personalisation",
    screen: "Personalisation",
  },
  {
    icon: "bell",
    title: "settings_notifications",
    screen: "Notifications",
    hidden: Platform.OS === "web",
  },
  {
    icon: "account-multiple",
    title: "settings_accounts",
    screen: "Accounts",
  },
  {
    icon: "bookmark-multiple",
    title: "settings_bookmarks",
    screen: "Bookmarks",
  },
] as const;
export const ToolsPagesOther = [
  {
    icon: "heart",
    title: "tools_credits",
    screen: "Credits",
  },
  {
    icon: "code-tags",
    title: "tools_open_source",
    screen: "OpenSource",
  },
  {
    icon: "currency-usd-circle",
    title: "tools_donate",
    screen: "Donate",
  },
] as const;

export default React.memo(function ToolsDashCard(props: DashCardProps<unknown>) {
  const { t } = useTranslation();
  const nav = useNavigation();
  const [clans] = useClanBookmarks();
  return (
    <Layout level="3" style={[styles.card, { flex: 1 }]}>
      <ScrollView onLayout={props.onOuterLayout} style={{ flex: 1 }}>
        <View onLayout={props.onInnerLayout} style={{ padding: 4 }}>
          <Text style={{ marginLeft: 4 }} category="h6">
            {t("pages:tools")}
          </Text>
          {ToolsPages.map(i => (
            <DrawerItem
              key={i.screen}
              style={{ backgroundColor: "transparent" }}
              selected={false}
              title={() => (
                <Text
                  style={{
                    flex: 1,
                    marginLeft: 4,
                    opacity: "disabled" in i && i.disabled ? 0.5 : 1,
                  }}
                  category="s1">
                  {"title" in i ? t(`pages:${i.title}` as const) : i.nontranslatedtitle}
                </Text>
              )}
              disabled={"disabled" in i && i.disabled}
              accessoryLeft={props => <Icon name={i.icon} {...props} />}
              onPress={() =>
                nav.navigate("Tools", {
                  screen: i.screen,
                  params: "params" in i ? i.params : undefined,
                })
              }
            />
          ))}
          <Text style={{ marginLeft: 4 }} category="h6">
            {t("pages:tools_bouncers")}
          </Text>
          {ToolsPagesBouncers.map(i => (
            <DrawerItem
              key={i.screen}
              style={{ backgroundColor: "transparent" }}
              selected={false}
              title={() => (
                <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                  {"title" in i ? t(`pages:${i.title}` as const) : i.nontranslatedtitle}
                </Text>
              )}
              accessoryLeft={props => <Icon name={i.icon} {...props} />}
              onPress={() =>
                nav.navigate("Tools", {
                  screen: i.screen,
                })
              }
            />
          ))}
          <Text style={{ marginLeft: 4 }} category="h6">
            Maps
          </Text>
          {ToolsPagesMaps.map(i => (
            <DrawerItem
              key={i.screen}
              style={{ backgroundColor: "transparent" }}
              selected={false}
              title={() => (
                <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                  {"title" in i ? t(`pages:${i.title}` as const) : i.nontranslatedtitle}
                </Text>
              )}
              accessoryLeft={props => <Icon name={i.icon} {...props} />}
              onPress={() =>
                nav.navigate("Tools", {
                  screen: i.screen,
                })
              }
            />
          ))}
          <Text style={{ marginLeft: 4 }} category="h6">
            {t("pages:settings")}
          </Text>
          {ToolsPagesSettings.filter(i => !("hidden" in i) || !i.hidden).map(i => (
            <DrawerItem
              key={"settings_" + i.screen}
              style={{ backgroundColor: "transparent" }}
              selected={false}
              title={() => (
                <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                  {t(`pages:${i.title}` as const)}
                </Text>
              )}
              accessoryLeft={props => <Icon name={i.icon} {...props} />}
              onPress={() =>
                nav.navigate("Settings", {
                  screen: i.screen,
                })
              }
            />
          ))}
          <Text style={{ marginLeft: 4 }} category="h6">
            Other
          </Text>
          {ToolsPagesOther.map(i => (
            <DrawerItem
              key={i.screen}
              style={{ backgroundColor: "transparent" }}
              selected={false}
              title={() => (
                <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                  {t(`pages:${i.title}` as const)}
                </Text>
              )}
              accessoryLeft={props => <Icon name={i.icon} {...props} />}
              onPress={() =>
                nav.navigate("Tools", {
                  screen: i.screen,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}, () => true)

const styles = StyleSheet.create({
  card: { margin: 4, borderRadius: 4 },
});
