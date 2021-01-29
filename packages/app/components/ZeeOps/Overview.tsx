import React, { useMemo } from "react";
import { Icon, Layout, Popover, Spinner, Text } from "@ui-kitten/components";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import icons from "@cuppazee/icons";
import db from "@cuppazee/types";
import { Image, Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import dayjs from "dayjs";
import Svg, {Text as SvgText} from 'react-native-svg';

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
  const data = useMunzeeRequest("ops/zeeops/status", { user_id }, true, user_id);
  if (data.tokenStatus.status !== "valid") return null;
  if (!data.data?.data) {
    return (
      <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </View>
    );
  }
  const d = data.data.data;
  let current = d.missions.find(i => i.id === d.currentMission);
  if (dayjs(d.start_time).valueOf() > Date.now() && d.currentMission === 1) {
    return <Icon name="check" style={{ height: 24, width: 24 }} />;
  } else if (dayjs(d.start_time).valueOf() > Date.now()) {
    current = d.missions.find(i => i.id === d.currentMission - 1);
  }
  console.log(current);
  if (!current) return null;
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <View>
        <Image
          style={{ width: 48, height: 48, margin: 4 }}
          source={{
            uri: `https://munzee.global.ssl.fastly.net/images/pins/${current?.rewards[0].imageUrl}`,
          }}
        />
        {current?.rewards[0].amount > 1 && <Svg
          style={{
            position: "absolute",
            bottom: 0,
            right: -4,
            height: 56,
            width: 56,
          }}>
          <SvgText
            fill="white"
            stroke="black"
            strokeWidth="1.5"
            fontFamily={`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`}
            fontSize="24"
            fontWeight="bold"
            x="52"
            y="52"
            textAnchor="end">
            x{current?.rewards[0].amount}
          </SvgText>
        </Svg>}
      </View>
      <View style={{ flex: 1, maxWidth: 400 }}>
        <Text category="s1" style={{ padding: 4 }}>
          {current?.description}
        </Text>
        <Layout level="4" style={{ borderRadius: 8 }}>
          <LinearGradient
            start={[0, 0.5]}
            end={[1, 0.5]}
            locations={[
              0,
              (current.rewardCollected ? Infinity : current?.progress) / current?.goal,
              (current.rewardCollected ? Infinity : current?.progress) / current?.goal + 0.0001,
              1,
            ]}
            colors={["transparent", "transparent", "#ffffff77", "#ffffff77"]}
            style={{ padding: 4, borderRadius: 8, borderWidth: 1, borderColor: "#00000077" }}>
            <Text category="s1" style={{ textAlign: "center" }}>
              {current.rewardCollected ? "Collected!" : `${current?.progress}/${current?.goal}`}
            </Text>
          </LinearGradient>
        </Layout>
      </View>
    </View>
  );
}
