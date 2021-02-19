import { Layout, Popover, Text } from "@ui-kitten/components";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import db from "@cuppazee/types";
import TypeImage from "../Common/TypeImage";
import { BlastPointsData } from "../../screens/User/Blast";

export type BlastIconProps = {
  icon: string;
  points: BlastPointsData;
  total: number;
}

export function BlastIcon({ icon, points, total }: BlastIconProps) {
  const [visible, setVisible] = React.useState(false);
  return (
    <Popover
      visible={visible}
      anchor={() => (
        <Pressable onPress={() => setVisible(true)}>
          <View style={styles.card}>
            <TypeImage icon={icon} style={{ size: 32 }} />
            <Text category="s1">{total}</Text>
          </View>
        </Pressable>
      )}
      onBackdropPress={() => setVisible(false)}>
      <Layout style={{ padding: 4 }}>
        <Text style={{ textAlign: "center" }} category="h6">
          {total.toLocaleString()}x {db.getType(icon)?.name ?? icon ?? ""}
        </Text>
        <Text style={{ textAlign: "center" }} category="s1">
          {points.min} - {points.max} Pts (Avg. {points.avg})
        </Text>
      </Layout>
    </Popover>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
    alignItems: "center",
  },
});
