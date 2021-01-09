import React, { useMemo } from "react";
import { Layout, Popover, Spinner, Text } from "@ui-kitten/components";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import icons from "@cuppazee/icons";
import db from "@cuppazee/types";
import { Image, Pressable, View } from "react-native";
import { ActivityConverter, UserActivityData } from "./Data";

export type UserActivityOverviewProps = {
  user_id: number;
  day: string;
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
  return (
    <Popover
      visible={visible}
      anchor={() => <Pressable onPress={() => setVisible(true)}>
        <View style={{ padding: 0, alignItems: "center" }}>
          <Image
            source={icons[db.strip(icon)] ?? icon}
            style={{ height: count > 30 ? 24 : 32, width: count > 30 ? 24 : 32 }}
          />
          <Text style={{ textAlign: "center", fontSize: count > 30 ? 12 : 16 }}>{data.count.toLocaleString()}</Text>
        </View>
      </Pressable>}
      onBackdropPress={() => setVisible(false)}>
      <Layout style={{ padding: 4 }}>
        <Text style={{ textAlign: "center" }} category="h6">{data.count.toLocaleString()}x {db.getType(icon)?.name || db.strip(icon)}</Text>
        <Text style={{ textAlign: "center" }} category="s1">{data.points.toLocaleString()} Points</Text>
      </Layout>
    </Popover>
  );
}, (prev, now) => (prev.icon === now.icon && prev.data.count === now.data.count && prev.data.points === now.data.points && (prev.count > 30) === (now.count > 30)))

export default function UserActivityOverview({
  user_id,
  day,
}: UserActivityOverviewProps) {
  const data = useCuppaZeeRequest<{ data: UserActivityData }>(
    "user/activity",
    { user_id, day }
  );
  const d = useMemo(
    () =>
      data.data?.data
        ? ActivityConverter(data.data?.data, undefined, { username: "sohcah" })
        : null,
    [data.dataUpdatedAt]
  );
  if (!data.isFetched || !d) {
    return (
      <View
        style={{ height: 100, justifyContent: "center", alignItems: "center" }}
      >
        <Spinner />
      </View>
    );
  }
  return (
    <View style={{ padding: 4 }}>
      <Text category="h6" style={{ textAlign: "center" }}>
        {d.points} {JSON.stringify({user_id, day})}
      </Text>
      <Text category="s1" style={{ textAlign: "center" }}>
        {d.captures.count} Captures ({d.captures.points} Points)
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(d.captures.types).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
      <Text category="s1" style={{ textAlign: "center" }}>
        {d.deploys.count} Deploys ({d.deploys.points} Points)
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(d.deploys.types).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
      <Text category="s1" style={{ textAlign: "center" }}>
        {d.capons.count} Cap-ons ({d.capons.points} Points)
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(d.capons.types).map((i, _, a) => (
          <UserActivityOverviewItem key={i[0]} icon={i[0]} data={i[1]} count={a.length} />
        ))}
      </View>
    </View>
  );
}
