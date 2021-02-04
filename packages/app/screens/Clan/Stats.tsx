import { RouteProp, useRoute } from "@react-navigation/native";
import { Icon, Layout, Spinner, Text, useTheme } from "@ui-kitten/components";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, PixelRatio, ScrollView, StyleSheet, View } from "react-native";
import {
  DataCell,
  LevelCell,
  RequirementCell,
  RequirementDataCell,
  RequirementTitleCell,
  TitleCell,
  UserCell,
} from "../../components/Clan/CellV2";
import {
  ClanStatsConverter,
  ClanStatsFormattedUser,
  ClanStatsFormattedData,
  monthToGameID,
  ClanRequirementsConverter,
  ClanRewardsData,
  ClanShadowData,
  gameIDToMonth,
} from "../../components/Clan/Data";
import useComponentSize from "../../hooks/useComponentSize";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import { useSettings } from "../../hooks/useSettings";
import useTitle from "../../hooks/useTitle";
import { ClanStackParamList } from "../../types";

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
// const levels: {level: number; type: "group" | "individual"}[] = [
//   {level: 1, type: "individual"},
//   {level: 2, type: "individual"},
//   {level: 3, type: "individual"},
//   {level: 4, type: "individual"},
//   {level: 5, type: "individual"},

//   {level: 1, type: "group"},
//   {level: 2, type: "group"},
//   {level: 3, type: "group"},
//   {level: 4, type: "group"},
//   {level: 5, type: "group"},
// ]

export default function ClanStatsScreen() {
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
  console.log(borderColor);

  const route = useRoute<RouteProp<ClanStackParamList, "Stats">>();
  const game_id = monthToGameID(
    route.params.year ? Number(route.params.year) : undefined,
    route.params.month ? Number(route.params.month) - 1 : undefined
  );
  const clan_id = Number(route.params.clanid) >= 0 ? Number(route.params.clanid) : 2041;
  const actual_clan_id = Number(route.params.clanid);

  const clan_data = useMunzeeRequest("clan/v2", { clan_id });
  const requirements_data = useMunzeeRequest("clan/v2/requirements", {
    clan_id,
    game_id,
  });

  const shadow_data = useCuppaZeeRequest<{ data?: ClanShadowData }>(
    "clan/shadow",
    {
      clan_id: actual_clan_id,
      game_id,
    },
    [-1, 1349, 1441, 457, 1902, 2042, 1870].includes(Number(route.params.clanid))
  );
  const rewards_data = useCuppaZeeRequest<{ data: ClanRewardsData }>("clan/rewards", {
    game_id,
  });

  const requirements = React.useMemo(
    () => ClanRequirementsConverter(requirements_data.data?.data, rewards_data.data?.data),
    [requirements_data.dataUpdatedAt, rewards_data.dataUpdatedAt]
  );
  const stats = React.useMemo(
    () =>
      ClanStatsConverter(
        clan_data.data?.data,
        requirements_data.data?.data,
        requirements || undefined,
        actual_clan_id,
        shadow_data.data?.data
      ),
    [clan_data.dataUpdatedAt, shadow_data.dataUpdatedAt, requirements]
  );

  useTitle(
    `☕ ${
      shadow_data.data?.data?.details.name ?? clan_data.data?.data?.details.name ?? actual_clan_id
    }`
  );

  if (!stats || !requirements || !size || !clan_data.data) {
    return (
      <Layout
        onLayout={onLayout}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Spinner />
      </Layout>
    );
  }

  function sort(a: ClanStatsFormattedUser, b: ClanStatsFormattedUser) {
    return (b.requirements[3]?.value ?? -1) - (a.requirements[3]?.value ?? -1);
  }

  const headerStack = compact !== 0;
  const showSidebar = compact !== 0;
  const sidebarWidth = (compact ? 120 : 150) * fontScale;
  const columnWidth = showSidebar
    ? (compact ? (headerStack ? 68 : 90) : headerStack ? 80 : 120) * fontScale
    : 400;
  const minTableWidth = (Object.keys(stats.users).length + 1) * columnWidth + sidebarWidth;

  const main_users = [
    { type: "individual", level: 5 },
    ...Object.values(stats.users).sort(sort),
    stats,
    { type: "group", level: 5 },
  ];
  const main_rows = (reverse ? requirements.all : main_users) as (
    | number
    | ClanStatsFormattedUser
    | ClanStatsFormattedData
    | { type: "group" | "individual"; level: number }
  )[];
  const main_columns = (reverse ? main_users : requirements.all) as (
    | number
    | ClanStatsFormattedUser
    | ClanStatsFormattedData
    | { type: "group" | "individual"; level: number }
  )[];

  const requirements_rows = (reverse ? requirements.all : levels) as (
    | number
    | { type: "group" | "individual"; level: number }
  )[];
  const requirements_columns = (reverse ? levels : requirements.all) as (
    | number
    | { type: "group" | "individual"; level: number }
  )[];
  return (
    <Layout onLayout={onLayout} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Layout level="2" style={{ margin: 4, borderRadius: 8 }}>
          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 48,
              padding: 4,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            level="4">
            <Image
              style={{ height: 32, width: 32, borderRadius: 16, marginRight: 8 }}
              source={{
                uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${clan_id.toString(
                  36
                )}.png`,
              }}
            />
            <View>
              <Text category="h6">{clan_data.data.data?.details.name}</Text>
              <Text category="s1">{clan_data.data.data?.details.tagline}</Text>
            </View>
          </Layout>
          <View style={{ flexDirection: "row" }}>
            {showSidebar && (
              <View
                key="sidebar"
                style={{
                  alignSelf: "flex-start",
                  width: sidebarWidth,
                  flexGrow: size.width < minTableWidth ? undefined : 1,
                  borderRightWidth: 2,
                  borderColor,
                }}>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderColor,
                  }}>
                  <TitleCell key="header" clan={clan_data.data} shadow={shadow_data.data} />
                </View>
                {main_rows.map(row =>
                  typeof row === "number" ? (
                    <RequirementCell key={row} task_id={row} requirements={requirements} />
                  ) : "type" in row ? (
                    <LevelCell key={`${row.level}_${row.type}`} level={row.level} type={row.type} />
                  ) : (
                    <UserCell key={"user_id" in row ? row.user_id : "Clan Total"} user={row} />
                  )
                )}
              </View>
            )}
            <ScrollView
              style={{
                alignSelf: "flex-start",
                flexGrow: (reverse
                  ? [...Object.values(stats.users).sort(sort), stats]
                  : requirements.all
                ).length,
              }}
              contentContainerStyle={{ flexGrow: 1, alignItems: "flex-start" }}
              horizontal={true}
              pagingEnabled={size.width < 720 || size.width < minTableWidth}
              snapToInterval={columnWidth === 400 && size.width < 400 ? undefined : columnWidth}
              snapToAlignment={showSidebar || !reverse ? "start" : "center"}>
              {main_columns.map(column => (
                <View
                  key={
                    typeof column === "number"
                      ? column
                      : "user_id" in column
                      ? column.user_id
                      : "type" in column
                      ? `${column.level}_${column.type}`
                      : "Clan Stats"
                  }
                  style={{
                    width: columnWidth,
                    flexGrow: 1,
                    maxWidth: size?.width,
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderColor,
                    }}>
                    {typeof column === "number" ? (
                      <RequirementCell
                        key="Header"
                        task_id={column}
                        stack={headerStack}
                        requirements={requirements}
                      />
                    ) : "type" in column ? (
                      <LevelCell
                        key={`${column.level}_${column.type}`}
                        level={column.level}
                        type={column.type}
                        stack={headerStack}
                      />
                    ) : (
                      <UserCell key="Header" user={column} stack={headerStack} />
                    )}
                  </View>
                  {main_rows.map(row => {
                    const user =
                      typeof row !== "number" ? row : typeof column !== "number" ? column : null;
                    const task_id =
                      typeof row === "number" ? row : typeof column === "number" ? column : null;
                    const key =
                      typeof row === "number"
                        ? row
                        : "user_id" in row
                        ? row.user_id
                        : "type" in row
                        ? `${row.level}_${row.type}`
                        : "Clan Stats";
                    if (!user || !task_id) return null;
                    return "type" in user ? (
                      <RequirementDataCell
                        key={key}
                        task={task_id}
                        level={user.level}
                        type={user.type}
                        requirements={requirements}
                      />
                    ) : (
                      <DataCell key={key} user={user} task_id={task_id} />
                    );
                  })}
                </View>
              ))}
            </ScrollView>
          </View>
        </Layout>

        <Layout level="2" style={{ margin: 4, borderRadius: 8 }}>
          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 48,
              padding: 4,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            level="4">
            <Icon style={{ height: 32, width: 32, marginRight: 8 }} name="playlist-check" />
            <View>
              <Text category="h6">{t("clan:requirements")}</Text>
              <Text category="s1">
                {dayjs()
                  .set("month", gameIDToMonth(game_id).m)
                  .set("year", gameIDToMonth(game_id).y)
                  .format("MMMM YYYY")}
              </Text>
            </View>
          </Layout>
          <View style={{ flexDirection: "row" }}>
            {showSidebar && (
              <View
                key="sidebar"
                style={{
                  minWidth: sidebarWidth,
                  flex: size.width < minTableWidth ? undefined : 1,
                  borderRightWidth: 2,
                  borderColor,
                }}>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderColor,
                  }}>
                  <RequirementTitleCell
                    key="header"
                    game_id={game_id}
                    date={dayjs()
                      .set("month", gameIDToMonth(game_id).m)
                      .set("year", gameIDToMonth(game_id).y)}
                  />
                </View>
                {requirements_rows.map(row =>
                  typeof row == "number" ? (
                    <RequirementCell key={row} task_id={row} requirements={requirements} />
                  ) : (
                    <LevelCell key={`${row.level}_${row.type}`} level={row.level} type={row.type} />
                  )
                )}
              </View>
            )}
            <ScrollView
              style={{
                flex: (reverse ? levels : requirements.all).length,
              }}
              contentContainerStyle={{ flexGrow: 1 }}
              horizontal={true}
              pagingEnabled={size.width < 720 || size.width < minTableWidth}
              snapToInterval={columnWidth}
              snapToAlignment={showSidebar || !reverse ? "start" : "center"}>
              {requirements_columns.map(column => (
                <View
                  key={typeof column === "number" ? column : `${column.level}_${column.type}`}
                  style={{
                    width: columnWidth,
                    flexGrow: 1,
                    maxWidth: size?.width,
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderColor,
                    }}>
                    {typeof column === "number" ? (
                      <RequirementCell
                        key="header"
                        task_id={column}
                        stack={headerStack}
                        requirements={requirements}
                      />
                    ) : (
                      <LevelCell
                        key="header"
                        level={column.level}
                        type={column.type}
                        stack={headerStack}
                      />
                    )}
                  </View>
                  {requirements_rows.map(row => {
                    if (typeof row !== "number" && typeof column === "number") {
                      return (
                        <RequirementDataCell
                          key={`${row.level}_${row.type}`}
                          task={column}
                          level={row.level}
                          type={row.type}
                          requirements={requirements}
                        />
                      );
                    }
                    if (typeof row === "number" && typeof column !== "number") {
                      return (
                        <RequirementDataCell
                          key={row}
                          task={row}
                          level={column.level}
                          type={column.type}
                          requirements={requirements}
                        />
                      );
                    }
                    return null;
                  })}
                </View>
              ))}
            </ScrollView>
          </View>
        </Layout>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
    borderRadius: 8,
  },
});
