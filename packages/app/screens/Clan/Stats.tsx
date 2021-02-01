import { RouteProp, useRoute } from "@react-navigation/native";
import { Layout, Spinner } from "@ui-kitten/components";
import React from "react";
import { PixelRatio, ScrollView, StyleSheet, View } from "react-native";
import {
  // DataCell,
  LevelCell,
  RequirementCell,
  RequirementDataCell,
  RequirementTitleCell,
  TitleCell,
  UserCell,
} from "../../components/Clan/Cell";
import {
  DataCell,
  // LevelCell,
  // RequirementCell,
  // RequirementDataCell,
  // RequirementTitleCell,
  // TitleCell,
  // UserCell,
} from "../../components/Clan/CellV2";
import {
  ClanStatsConverter,
  ClanStatsFormattedUser,
  ClanStatsFormattedData,
  monthToGameID,
  ClanRequirementsConverter,
  ClanRewardsData,
  ClanShadowData,
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
  const [size, onLayout] = useComponentSize();
  const fontScale = PixelRatio.getFontScale();
  const [settings] = useSettings();
  const reverse = settings.clan_reverse;
  const compact = settings.clan_style;
  const subtract: number = 5;

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

  const levelColours = ["#eb0000", "#ef6500", "#fa9102", "#fcd302", "#bfe913", "#55f40b"];
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

  const headerStack = compact !== 0 || size?.width > 720;
  const showSidebar = size?.width > 720 || compact !== 0;
  const sidebarWidth = (compact ? 120 : 150) * fontScale;
  const columnWidth = showSidebar
    ? (compact ? (headerStack ? 68 : 90) : headerStack ? 80 : 120) * fontScale
    : 400;
  const headerRowHeight = Math.max(
    40,
    (headerStack ? (compact === 2 ? 36 : 44) : 0) + 33 * fontScale
  );
  const requirementHeaderRowHeight =
    Math.max(40, 33 * fontScale) + (headerStack && !reverse ? (compact === 2 ? 24 : 32) : 0) + 4;
  const rowHeight = Math.max(compact === 2 ? 34 : 40, 33 * fontScale);
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
        <View style={{ flexDirection: "row" }}>
          {showSidebar && (
            <View
              key="sidebar"
              style={{
                alignSelf: "flex-start",
                marginLeft: 8,
                width: sidebarWidth,
                flexGrow: size.width < minTableWidth ? undefined : 1,
              }}>
              <TitleCell
                key="header"
                height={headerRowHeight}
                compact={compact}
                clan={clan_data.data}
                shadow={shadow_data.data}
                reverse={reverse}
                stack={headerStack}
              />
              {main_rows.map(row =>
                typeof row === "number" ? (
                  <RequirementCell
                    height={rowHeight}
                    key={row}
                    levelColours={levelColours}
                    compact={compact}
                    task_id={row}
                  />
                ) : "type" in row ? (
                  <LevelCell
                    key={`${row.level}_${row.type}`}
                    height={rowHeight}
                    compact={compact}
                    level={row.level}
                    type={row.type}
                    levelColours={levelColours}
                    stats={true}
                  />
                ) : (
                  <UserCell
                    height={rowHeight}
                    key={"user_id" in row ? row.user_id : "Clan Total"}
                    compact={compact}
                    user={row}
                    levelColours={levelColours}
                  />
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
                {typeof column === "number" ? (
                  <RequirementCell
                    height={headerRowHeight}
                    key="Header"
                    levelColours={levelColours}
                    compact={compact}
                    task_id={column}
                    stack={headerStack}
                  />
                ) : "type" in column ? (
                  <LevelCell
                    key={`${column.level}_${column.type}`}
                    height={headerRowHeight}
                    compact={compact}
                    level={column.level}
                    type={column.type}
                    stack={headerStack}
                    levelColours={levelColours}
                    stats={true}
                  />
                ) : (
                  <UserCell
                    height={headerRowHeight}
                    key="Header"
                    compact={compact}
                    user={column}
                    levelColours={levelColours}
                    stack={headerStack}
                  />
                )}
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
                      height={rowHeight}
                      subtract={subtract}
                      compact={compact}
                      task={task_id}
                      level={user.level}
                      type={user.type}
                      levelColours={levelColours}
                      reverse={reverse}
                      size={size}
                      requirements={requirements}
                    />
                  ) : (
                    <DataCell
                      height={rowHeight}
                      key={key}
                      subtract={subtract}
                      compact={compact}
                      user={user}
                      task_id={task_id}
                      levelColours={levelColours}
                      reverse={reverse}
                      size={size}
                    />
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row" }}>
          {showSidebar && (
            <View
              key="sidebar"
              style={{
                marginLeft: 8,
                minWidth: sidebarWidth,
                flex: size.width < minTableWidth ? undefined : 1,
              }}>
              <RequirementTitleCell
                key="header"
                height={requirementHeaderRowHeight}
                compact={compact}
                stack={headerStack}
                reverse={reverse}
              />
              {requirements_rows.map(row =>
                typeof row == "number" ? (
                  <RequirementCell
                    key={row}
                    height={rowHeight}
                    levelColours={levelColours}
                    compact={compact}
                    task_id={row}
                  />
                ) : (
                  <LevelCell
                    key={`${row.level}_${row.type}`}
                    height={rowHeight}
                    compact={compact}
                    level={row.level}
                    type={row.type}
                    levelColours={levelColours}
                  />
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
                {typeof column === "number" ? (
                  <RequirementCell
                    key="header"
                    height={requirementHeaderRowHeight}
                    compact={compact}
                    task_id={column}
                    stack={headerStack}
                    levelColours={levelColours}
                  />
                ) : (
                  <LevelCell
                    key="header"
                    height={requirementHeaderRowHeight}
                    compact={compact}
                    level={column.level}
                    type={column.type}
                    levelColours={levelColours}
                    stack={headerStack}
                  />
                )}
                {requirements_rows.map(row => {
                  if (typeof row !== "number" && typeof column === "number") {
                    return (
                      <RequirementDataCell
                        key={`${row.level}_${row.type}`}
                        height={rowHeight}
                        subtract={subtract}
                        compact={compact}
                        task={column}
                        level={row.level}
                        type={row.type}
                        levelColours={levelColours}
                        reverse={reverse}
                        size={size}
                        requirements={requirements}
                      />
                    );
                  }
                  if (typeof row === "number" && typeof column !== "number") {
                    return (
                      <RequirementDataCell
                        key={row}
                        height={rowHeight}
                        subtract={subtract}
                        compact={compact}
                        task={row}
                        level={column.level}
                        type={column.type}
                        levelColours={levelColours}
                        reverse={reverse}
                        size={size}
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
