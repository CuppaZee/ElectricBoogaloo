import { Layout, Popover, Text } from "@ui-kitten/components";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import TypeImage from "../Common/TypeImage";
import { BlastPointsData } from "../../screens/Tools/Blast";
import { useTranslation } from "react-i18next";
import useDB from "../../hooks/useDB";

export type BlastIconProps = {
  icon: string;
  points: BlastPointsData;
  total: number;
}

export function BlastIcon({ icon, points, total }: BlastIconProps) {
  const db = useDB();
  const { t } = useTranslation();
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
          {t("user_blast_checker:points", points)}
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
