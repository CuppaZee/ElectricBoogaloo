import { Icon, Layout, Spinner, Text, useTheme } from "@ui-kitten/components";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, PixelRatio, ScrollView, StyleSheet, View } from "react-native";
import {
  LevelCell,
  RequirementCell,
  RequirementDataCell,
  RequirementTitleCell,
} from "./Cell";
import {
  ClanRequirementsConverter,
  ClanRewardsData,
  gameIDToMonth,
  requirementMeta,
} from "./Data";
import useComponentSize from "../../hooks/useComponentSize";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import { useSettings } from "../../hooks/useSettings";
import SyncScrollView, { SyncScrollViewController } from "./SyncScrollView";
import TypeImage from "../Common/TypeImage";

const levels: { level: number; type: "group" | "individual" }[] = [
  { level: 1, type: "individual" },
  { level: 1, type: "group" },

  { level: 2, type: "individual" },
  { level: 2, type: "group" },

  { level: 3, type: "individual" },
  { level: 3, type: "group" },

  { level: 4, type: "individual" },
  { level: 4, type: "group" },

  { level: 5, type: "individual" },
  { level: 5, type: "group" },
];

export interface ClanRequirementsListProps {
  game_id: number;
  clan_id?: number;
  scrollViewController?: SyncScrollViewController;
}

export default React.memo(
  function ClanRequirementsList({
    game_id,
    clan_id: actual_clan_id = 2041,
    scrollViewController,
  }: ClanRequirementsListProps) {
    const { t } = useTranslation();
    const [size, onLayout] = useComponentSize();
    const fontScale = PixelRatio.getFontScale();
    const [settings] = useSettings();
    const reverse = settings.clan_reverse;
    const compact = settings.clan_style;

    const theme = useTheme();
    const borderColor =
      (theme.style === "dark" ? theme["color-basic-400"] : theme["color-basic-800"])
        .replace("rgb(", "rgba(")
        .slice(0, -1) + ", 0.3)";

    const clan_id = actual_clan_id >= 0 ? actual_clan_id : 2041;

    const requirements_data = useMunzeeRequest("clan/v2/requirements", {
      clan_id,
      game_id,
    });

    const rewards_data = useCuppaZeeRequest<{ data: ClanRewardsData }>("clan/rewards", {
      game_id,
    });

    const requirements = React.useMemo(
      () => ClanRequirementsConverter(requirements_data.data?.data, rewards_data.data?.data),
      [requirements_data.dataUpdatedAt, rewards_data.dataUpdatedAt]
    );

    const rewards = rewards_data.data?.data;

    if (!requirements || !size || !rewards) {
      return (
        <Layout
          onLayout={onLayout}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Spinner />
        </Layout>
      );
    }

    const headerStack = compact !== 0;
    const showSidebar = compact !== 0;
    const sidebarWidth = (compact ? 120 : 150) * fontScale;
    const columnWidth = showSidebar
      ? (compact ? (headerStack ? 68 : 90) : headerStack ? 80 : 120) * fontScale
      : 400;
    const minTableWidth = requirements.all.length * columnWidth + sidebarWidth;

    const requirements_rows = (reverse ? requirements.all : levels) as (
      | number
      | { type: "group" | "individual"; level: number }
    )[];
    const requirements_columns = (reverse ? levels : requirements.all) as (
      | number
      | { type: "group" | "individual"; level: number }
    )[];
    return (
      <Layout onLayout={onLayout} level="2" style={{ margin: 4, borderRadius: 8 }}>
        <Layout
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 48 * fontScale,
            padding: 4,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          level="4">
          <Icon
            style={{
              height: 32 * fontScale,
              width: 32 * fontScale,
              marginRight: 8,
              color: theme.style === "dark" ? "#fff" : "#000",
            }}
            name="playlist-check"
          />
          <View>
            <Text category="h6">{t("clan:clan_requirements")}</Text>
            <Text category="s1">
              {dayjs()
                .set("month", gameIDToMonth(game_id).m)
                .set("year", gameIDToMonth(game_id).y)
                .format("MMMM YYYY")}
            </Text>
          </View>
        </Layout>
        {[1, 2, 3, 4, 5].map(level => (
          <View style={{ paddingBottom: 16 }}>
            <Text style={{ margin: 4 }} category="h6">
              {t("clan:level", { level })}
            </Text>
            <Text style={{ margin: 4 }} category="s1">
              {t("clan:individual")}
            </Text>
            {requirements.individual
              .filter(i => requirements.tasks.individual[i][level])
              .map(i => (
                <View style={{ padding: 4, flexDirection: "row" }}>
                  <Image
                    source={{ uri: `https://server.cuppazee.app/requirements/${i}.png` }}
                    style={{ height: 24, width: 24, marginRight: 8 }}
                  />
                  <Text category="s2">
                    <Text category="s1">
                      {requirements.tasks.individual[i][level]?.toLocaleString()}
                    </Text>{" "}
                    {requirementMeta[i]?.top} {requirementMeta[i]?.bottom}
                  </Text>
                </View>
              ))}

            <Text style={{ margin: 4 }} category="s1">
              {t("clan:group")}
            </Text>
            {requirements.group
              .filter(i => requirements.tasks.group[i][level])
              .map(i => (
                <View style={{ padding: 4, flexDirection: "row" }}>
                  <Image
                    source={{ uri: `https://server.cuppazee.app/requirements/${i}.png` }}
                    style={{ height: 24, width: 24, marginRight: 8 }}
                  />
                  <Text category="s2">
                    <Text category="s1">
                      {requirements.tasks.group[i][level]?.toLocaleString()}
                    </Text>{" "}
                    {requirementMeta[i]?.top} {requirementMeta[i]?.bottom}
                  </Text>
                </View>
              ))}

            <Text style={{ margin: 4 }} category="s1">
              {t("clan:rewards")}
            </Text>
            {rewards.order
              .filter(i => rewards.levels[level - 1][i])
              .map(i => (
                <View style={{ padding: 4, flexDirection: "row" }}>
                  <TypeImage icon={rewards.rewards[i]?.logo} style={{ size: 24, marginRight: 8 }} />
                  <Text category="s2">
                    <Text category="s1">{rewards.levels[level - 1][i]?.toLocaleString()}x</Text>{" "}
                    {rewards.rewards[i]?.name}
                  </Text>
                </View>
              ))}
          </View>
        ))}
      </Layout>
    );
  },
  (prev, now) => prev.clan_id === now.clan_id && prev.game_id === now.game_id
);

const styles = StyleSheet.create({
  card: {
    margin: 4,
    borderRadius: 8,
  },
});
