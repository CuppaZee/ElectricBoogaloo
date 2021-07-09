import { Layout, Text, useTheme } from "@ui-kitten/components";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, PixelRatio, StyleSheet, View, Pressable } from "react-native";
import useComponentSize from "../../hooks/useComponentSize";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import TypeImage from "../Common/TypeImage";
import Loading from "../Loading";
import Icon from "../Common/Icon";
import { ClanRewardsData, GameID, generateClanRequirements } from "@cuppazee/utils/lib";
import useDB from "../../hooks/useDB";

export interface ClanRequirementsListProps {
  game_id: number;
  clan_id?: number;
}

export default React.memo(
  function ClanRequirementsList({
    game_id,
    clan_id: actual_clan_id = 2041,
  }: ClanRequirementsListProps) {
    const { t } = useTranslation();
    const [size, onLayout] = useComponentSize();
    const fontScale = PixelRatio.getFontScale();
    const theme = useTheme();

    const db = useDB();

    const clan_id = actual_clan_id >= 0 ? actual_clan_id : 2041;

    const requirements_data = useMunzeeRequest("clan/v2/requirements", {
      clan_id,
      game_id,
    });

    const rewards_data = useCuppaZeeRequest<{ data: ClanRewardsData }>("clan/rewards", {
      game_id,
    });

    const requirements = React.useMemo(
      () => generateClanRequirements(db, requirements_data.data?.data),
      [requirements_data.dataUpdatedAt, db]
    );

    const levelCount = Object.keys(requirements_data.data?.data?.data.levels ?? {}).length;
    const levels = new Array(levelCount).fill(0).map((_, n) => n + 1);

    const rewards = rewards_data.data?.data;
    // const rewardlevels = new Array(levelCount).fill(0).map((_, n) => n + 1);

    if (requirements_data.data?.data?.data.levels.length === 0) {
      return null;
    }

    if (!requirements || !size || !rewards) {
      return (
        <Layout style={{ flex: 1 }} onLayout={onLayout}>
          <Loading data={[requirements_data, rewards_data]} />
        </Layout>
      );
    }
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
            <Pressable
              onPress={() => {
                console.log(JSON.stringify(requirements.all));
              }}>
              <Text category="s1">{dayjs(new GameID(game_id).date).format("MMMM YYYY")}</Text>
            </Pressable>
          </View>
        </Layout>
        {requirements.isAprilFools && (
          <Text style={{ padding: 4 }}>
            Please be aware that the Munzee API is still returning April Fools requirements. I have
            tried my best to manually input the real reqirements here, however there may be a few
            typos. Once Munzee disables the April Fools requirements, CuppaZee will return back to
            using the accurate data provided by Munzee automatically.
          </Text>
        )}
        {levels.map(level => (
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
                    {db.getClanRequirement(i).top} {db.getClanRequirement(i).bottom}
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
                    {db.getClanRequirement(i).top} {db.getClanRequirement(i).bottom}
                  </Text>
                </View>
              ))}

            <Text style={{ margin: 4 }} category="s1">
              {t("clan:rewards")}
            </Text>
            {rewards.order
              .filter(i => rewards.levels[level - 1]?.[i])
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
