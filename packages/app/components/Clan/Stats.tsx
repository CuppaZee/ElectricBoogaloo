import { Button, Icon, Layout, Modal, Spinner, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { Image, PixelRatio, StyleSheet, View } from "react-native";
import {
  DataCell,
  LevelCell,
  RequirementCell,
  RequirementDataCell,
  TitleCell,
  UserCell,
} from "./Cell";
import {
  ClanStatsConverter,
  ClanStatsFormattedUser,
  ClanStatsFormattedData,
  ClanRequirementsConverter,
  ClanRewardsData,
  ClanShadowData,
} from "../../components/Clan/Data";
import useComponentSize from "../../hooks/useComponentSize";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import { useSettings } from "../../hooks/useSettings";
import useTitle from "../../hooks/useTitle";
import ClanSettingsModal from "./SettingsModal";
import SyncScrollView, { SyncScrollViewController } from "./SyncScrollView";
export interface ClanStatsTableProps {
  game_id: number;
  clan_id: number;
  title?: boolean;
  scrollViewController?: SyncScrollViewController;
}


export default React.memo(
  function ClanStatsTable({
    game_id,
    clan_id: actual_clan_id,
    title,
    scrollViewController,
  }: ClanStatsTableProps) {
    const [size, onLayout] = useComponentSize();
    const fontScale = PixelRatio.getFontScale();
    const [settings] = useSettings();
    if (!settings.clan_options[actual_clan_id])
      settings.clan_options[actual_clan_id] = {
        shadow: true,
        level: 5,
        share: false,
        subtract: false,
      };
    const [modalVisible, setModalVisible] = React.useState(false);
    const [sortBy, setSortBy] = React.useState(3);
    const reverse = settings.clan_reverse;
    const compact = settings.clan_style;

    const theme = useTheme();
    const borderColor =
      (theme.style === "dark" ? theme["color-basic-400"] : theme["color-basic-800"])
        .replace("rgb(", "rgba(")
        .slice(0, -1) + ", 0.3)";

    const clan_id = actual_clan_id >= 0 ? actual_clan_id : 2041;

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
      [-1, 1349, 1441, 457, 1902, 2042, 1870].includes(actual_clan_id)
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
          settings.clan_options[actual_clan_id].shadow ? shadow_data.data?.data : undefined
        ),
      [
        clan_data.dataUpdatedAt,
        shadow_data.dataUpdatedAt,
        requirements,
        settings.clan_options[actual_clan_id].shadow,
      ]
    );

    if (title)
      useTitle(
        `☕ ${
          shadow_data.data?.data?.details.name ??
          clan_data.data?.data?.details.name ??
          actual_clan_id
        }`
      );

    if (
      !stats ||
      !requirements ||
      !size ||
      !clan_data.data ||
      (!shadow_data.data && [-1, 1349, 1441, 457, 1902, 2042, 1870].includes(actual_clan_id))
    ) {
      return (
        <Layout
          onLayout={onLayout}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Spinner />
        </Layout>
      );
    }

    function sort(a: ClanStatsFormattedUser, b: ClanStatsFormattedUser) {
      if(sortBy < 0) return (a.requirements[-sortBy]?.value ?? -1) - (b.requirements[-sortBy]?.value ?? -1);
      return (b.requirements[sortBy]?.value ?? -1) - (a.requirements[sortBy]?.value ?? -1);
    }

    const headerStack = compact !== 0;
    const showSidebar = compact !== 0;
    const sidebarWidth = (compact ? 120 : 150) * fontScale;
    const columnWidth = showSidebar
      ? (compact ? (headerStack ? 68 : 90) : headerStack ? 80 : 120) * fontScale
      : 400;
    const minTableWidth = (Object.keys(stats.users).length + 1) * columnWidth + sidebarWidth;

    const main_users = [
      { type: settings.clan_options[clan_id].share ? "share" : "individual", level: settings.clan_options[clan_id].level },
      ...Object.values(stats.users).sort(sort),
      stats,
      { type: "group", level: settings.clan_options[clan_id].level },
    ];
    const main_rows = (reverse ? requirements.all : main_users) as (
      | number
      | ClanStatsFormattedUser
      | ClanStatsFormattedData
      | { type: "group" | "individual" | "share"; level: number }
    )[];
    const main_columns = (reverse ? main_users : requirements.all) as (
      | number
      | ClanStatsFormattedUser
      | ClanStatsFormattedData
      | { type: "group" | "individual" | "share"; level: number }
    )[];
    return (
      <Layout onLayout={onLayout} level="2" style={{ margin: 4, borderRadius: 8 }}>
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
          <View style={{ flex: 1 }}>
            <Text category="h6">{clan_data.data.data?.details.name}</Text>
            <Text category="s1">{clan_data.data.data?.details.tagline}</Text>
          </View>
          <Button
            appearance="ghost"
            accessoryLeft={props => <Icon {...props} name="cog" />}
            onPress={() => setModalVisible(true)}
          />
        </Layout>
        <Modal
          backdropStyle={{ backgroundColor: "#00000077" }}
          visible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <ClanSettingsModal close={() => setModalVisible(false)} clan_id={actual_clan_id} />
        </Modal>
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
                  <RequirementCell
                    key={row}
                    task_id={row}
                    requirements={requirements}
                    onPress={() => setSortBy(sortBy === row ? row : row)}
                    sortBy={sortBy}
                  />
                ) : "type" in row ? (
                  <LevelCell key={`${row.level}_${row.type}`} level={row.level} type={row.type} />
                ) : (
                  <UserCell key={"user_id" in row ? row.user_id : "Clan Total"} user={row} />
                )
              )}
            </View>
          )}
          <SyncScrollView
            controller={scrollViewController}
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
                      onPress={() => setSortBy(sortBy === column ? -column : column)}
                      sortBy={sortBy}
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
                      members={Object.keys(stats.users).length}
                      key={key}
                      task={task_id}
                      level={user.level}
                      type={user.type}
                      requirements={requirements}
                    />
                  ) : (
                    <DataCell
                      clan_id={actual_clan_id}
                      requirements={requirements}
                      key={key}
                      user={user}
                      task_id={task_id}
                    />
                  );
                })}
              </View>
            ))}
          </SyncScrollView>
        </View>
      </Layout>
    );
  },
  (prev, now) => prev.clan_id === now.clan_id && prev.game_id === now.game_id
);