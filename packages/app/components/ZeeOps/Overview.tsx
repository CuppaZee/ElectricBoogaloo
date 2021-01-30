import React from "react";
import { Icon, Layout, Spinner, Text } from "@ui-kitten/components";
import { Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import dayjs from "dayjs";
import Svg, {Text as SvgText} from 'react-native-svg';

export type ZeeOpsOverviewProps = {
  user_id: number;
};

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
    // TODO: Rework COLLECTED View
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
