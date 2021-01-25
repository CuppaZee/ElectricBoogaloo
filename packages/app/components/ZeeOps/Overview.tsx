import React, { useMemo } from "react";
import { Layout, Popover, Spinner, Text } from "@ui-kitten/components";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import icons from "@cuppazee/icons";
import db from "@cuppazee/types";
import { Image, Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";

export type ZeeOpsOverviewProps = {
  user_id: number;
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
    const [visible, setVisible] = React.useState(false);
    return (
      <Popover
        visible={visible}
        anchor={() => (
          <Pressable onPress={() => setVisible(true)}>
            <View style={{ padding: 0, alignItems: "center" }}>
              <Image
                source={icons[db.strip(icon)] ?? icon}
                style={{ height: count > 30 ? 24 : 32, width: count > 30 ? 24 : 32 }}
              />
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
        </Layout>
      </Popover>
    );
  },
  (prev, now) =>
    prev.icon === now.icon &&
    prev.data.count === now.data.count &&
    prev.data.points === now.data.points &&
    prev.count > 30 === now.count > 30
);

export default function ZeeOpsOverview({ user_id }: ZeeOpsOverviewProps) {
  const data = useMunzeeRequest("ops/zeeops/status", { user_id });
  if (!data.data?.data) {
    return (
      <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </View>
    );
  }
  const d = data.data.data;
  return (
    <View
      style={{ flexDirection: "row", padding: 4, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{ width: 48, height: 48, margin: 4 }}
        source={{
          uri: `https://munzee.global.ssl.fastly.net/images/pins/${
            d.missions[d.currentMission].rewards[0].imageUrl
            }`,
        }}
      />
      <View style={{ flex: 1, maxWidth: 400 }}>
        <Text category="s1" style={{ padding: 4 }}>
          {d.missions[d.currentMission].description}
        </Text>
        <Layout level="4" style={{ borderRadius: 8 }}>
          <LinearGradient
            start={[0, 0.5]}
            end={[1, 0.5]}
            locations={[
              0,
              d.missions[d.currentMission].progress / d.missions[d.currentMission].goal,
              d.missions[d.currentMission].progress / d.missions[d.currentMission].goal + 0.0001,
              1,
            ]}
            colors={["transparent", "transparent", "#ffffff77", "#ffffff77"]}
            style={{ padding: 4, borderRadius: 8, borderWidth: 1, borderColor: "#00000077" }}>
            <Text category="s1" style={{ textAlign: "center" }}>
              {d.missions[d.currentMission].progress}/{d.missions[d.currentMission].goal}
            </Text>
          </LinearGradient>
        </Layout>
      </View>
    </View>
  );
}
