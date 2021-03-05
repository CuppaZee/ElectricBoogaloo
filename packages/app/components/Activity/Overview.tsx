import React, { useMemo } from "react";
import { Button, Icon, Layout, Popover, Spinner, Text } from "@ui-kitten/components";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import db from "@cuppazee/types";
import { Pressable, View } from "react-native";
import { ActivityConverter, UserActivityData } from "./Data";
import TypeImage from "../Common/TypeImage";
import { useTranslation } from "react-i18next";
import useActivity from "../../hooks/useActivity";
import Loading from "../Loading";
import { useNavigation } from "@react-navigation/native";

export type UserActivityOverviewProps = {
  user_id: number;
  day: string;
  enabled?: boolean;
};

export type UserActivityOverviewItemProps = {
  icon: string;
  data: {
    points: number;
    count: number;
  };
  count: number;
};

const UserActivityOverviewItem = React.memo(function ({
  icon,
  data,
  count,
}: UserActivityOverviewItemProps) {
  const [visible, setVisible] = React.useState(false);
  const nav = useNavigation();
  return (
    <Popover
      visible={visible}
      anchor={() => (
        <Pressable onPress={() => setVisible(true)}>
          <View style={{ padding: 0, alignItems: "center" }}>
            <TypeImage icon={icon} style={{ size: count > 30 ? 24 : 32 }} />
            <Text style={{ textAlign: "center", fontSize: count > 30 ? 12 : 16 }}>
              {data.count.toLocaleString()}
            </Text>
          </View>
        </Pressable>
      )}
      onBackdropPress={() => setVisible(false)}>
      <Layout style={{ padding: 4 }}>
        <Text style={{ textAlign: "center" }} category="h6">
          {data.count.toLocaleString()}x {db.getType(icon)?.name || db.strip(icon)}
        </Text>
        <Text style={{ textAlign: "center" }} category="s1">
          {data.points.toLocaleString()} Points
        </Text>
        <Button
          style={{ margin: 4 }}
          appearance="outline"
          onPress={() =>
            nav.navigate("Tools", {
              screen: "TypeMunzee",
              params: {
                type: db.strip(icon),
              },
            })
          }
          accessoryLeft={props => <Icon {...props} name="database" />}>
          Type Info
        </Button>
      </Layout>
    </Popover>
  );
}, (prev, now) => (prev.icon === now.icon && prev.data.count === now.data.count && prev.data.points === now.data.points && (prev.count > 30) === (now.count > 30)))

export default function UserActivityOverview({
  user_id,
  day,
}: UserActivityOverviewProps) {
  const { t } = useTranslation();
  const data = useActivity(user_id, day);
  const d = useMemo(
    () =>
      data.data?.data
        ? ActivityConverter(data.data?.data, undefined, { username: "sohcah" })
        : null,
    [data.dataUpdatedAt]
  );
  if (!data.isFetched || !d) {
    return <Loading level="3" data={[data]} />
  }
  return (
    <View style={{ padding: 4 }}>
      <Text category="h6" style={{ textAlign: "center" }}>
        {t("user_activity:overview_points", { count: d.points })}
      </Text>
      <Text category="s1" style={{ textAlign: "center" }}>
        {t("user_activity:overview_captures", { count: d.captures.count })} (
        {t("user_activity:overview_points", { count: d.captures.points })})
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        {Object.entries(d.captures.types).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
      <Text category="s1" style={{ textAlign: "center" }}>
        {t("user_activity:overview_deploys", { count: d.deploys.count })} (
        {t("user_activity:overview_points", { count: d.deploys.points })})
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        {Object.entries(d.deploys.types).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
      <Text category="s1" style={{ textAlign: "center" }}>
        {d.passive_deploys.count} Passive Deploy{d.passive_deploys.count === 1 ? "" : "s"} (
        {t("user_activity:overview_points", { count: d.passive_deploys.points })})
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        {Object.entries(d.passive_deploys.types).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
      <Text category="s1" style={{ textAlign: "center" }}>
        {t("user_activity:overview_capons", { count: d.capons.count })} (
        {t("user_activity:overview_points", { count: d.capons.points })})
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        {Object.entries(d.capons.types).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
    </View>
  );
}
