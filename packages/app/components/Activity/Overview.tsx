import React, { useMemo } from "react";
import { Pressable, View } from "react-native";
import TypeImage from "../Common/TypeImage";
import { useTranslation } from "react-i18next";
import useActivity from "../../hooks/useActivity";
import Loading from "../Loading";
import { useNavigation } from "@react-navigation/native";
import Icon from "../Common/Icon";
import useDB from "../../hooks/useDB";
import { generateUserActivityData, UserActivityData } from "@cuppazee/utils/lib";
import { Box, Button, Heading, Popover, Text } from "native-base";

export type UserActivityOverviewProps = {
  user_id: number;
  day: string;
  enabled?: boolean;
  activityData?: UserActivityData;
};

export type UserActivityOverviewItemProps = {
  icon: string;
  data: {
    points: number;
    count: number;
  };
  count: number;
};

const UserActivityOverviewItem = React.memo(
  function ({ icon, data, count }: UserActivityOverviewItemProps) {
    const db = useDB();
    const { t } = useTranslation();
    const nav = useNavigation();
    return (
      <Popover
        trigger={triggerProps => (
          <Pressable {...triggerProps}>
            <Box style={{ padding: 0, alignItems: "center" }}>
              <TypeImage icon={icon} style={{ size: count > 30 ? 24 : 32 }} />
              <Text style={{ textAlign: "center", fontSize: count > 30 ? 12 : 16 }}>
                {data.count.toLocaleString()}
              </Text>
            </Box>
          </Pressable>
        )}>
        <Popover.Content bg="coolGray.400" _dark={{ bg: "coolGray.600" }} style={{ padding: 4 }}>
          <Heading style={{ textAlign: "center" }} fontSize="lg">
            {data.count.toLocaleString()}x {db.getType(icon)?.name || db.strip(icon)}
          </Heading>
          <Heading style={{ textAlign: "center" }} fontSize="md">
            {t("user_activity:overview_points", { count: data.points })}
          </Heading>
          <Button
            style={{ margin: 4 }}
            onPress={() =>
              nav.navigate("Tools", {
                screen: "TypeMunzee",
                params: {
                  type: db.strip(icon),
                },
              })
            }
            startIcon={<Icon style={{ height: 24 }} name="database" />}>
            {t("user_activity:type_info")}
          </Button>
        </Popover.Content>
      </Popover>
    );
  },
  (prev, now) =>
    prev.icon === now.icon &&
    prev.data.count === now.data.count &&
    prev.data.points === now.data.points &&
    prev.count > 30 === now.count > 30
);
export default function UserActivityOverview({ user_id, day, activityData }: UserActivityOverviewProps) {
  const { t } = useTranslation();
  const data = useActivity(user_id, day);
  const db = useDB();
  const d = useMemo(
    () =>
      activityData
        ? activityData
        : data.data?.data
          ? generateUserActivityData(db, data.data?.data, {state: new Set(), category: new Set(), activity: new Set()}, "sohcah")
        : null,
    [data.dataUpdatedAt, activityData]
  );
  if (!data.isFetched || !d) {
    return <Loading level="3" data={[data]} />;
  }
  return (
    <View style={{ padding: 4 }}>
      <Heading fontSize="lg" style={{ textAlign: "center" }}>
        {t("user_activity:overview_points", { count: d.points })}
      </Heading>
      <Heading fontSize="md" style={{ textAlign: "center" }}>
        {t("user_activity:overview_captures", { count: d.overview.capture?.count ?? 0 })} (
        {t("user_activity:overview_points", { count: d.overview.capture?.points ?? 0 })})
      </Heading>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        {Object.entries(d.overview.capture?.types ?? {}).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
      <Heading fontSize="md" style={{ textAlign: "center" }}>
        {t("user_activity:overview_deploys", { count: d.overview.deploy?.count ?? 0 })} (
        {t("user_activity:overview_points", { count: d.overview.deploy?.points ?? 0 })})
      </Heading>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        {Object.entries(d.overview.deploy?.types ?? {}).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
      <Heading fontSize="md" style={{ textAlign: "center" }}>
        {t("user_activity:overview_passive_deploys", {
          count: d.overview.passive_deploy?.count ?? 0,
        })}{" "}
        ({t("user_activity:overview_points", { count: d.overview.passive_deploy?.points ?? 0 })})
      </Heading>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        {Object.entries(d.overview.passive_deploy?.types ?? {}).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
      <Heading fontSize="md" style={{ textAlign: "center" }}>
        {t("user_activity:overview_capons", { count: d.overview.capon?.count ?? 0 })} (
        {t("user_activity:overview_points", { count: d.overview.capon?.points ?? 0 })})
      </Heading>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        {Object.entries(d.overview.capon?.types ?? {}).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
    </View>
  );
}
