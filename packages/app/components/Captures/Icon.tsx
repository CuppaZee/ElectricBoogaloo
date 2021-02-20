import { Layout, Popover, Text } from "@ui-kitten/components";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Type } from "@cuppazee/types";
import TypeImage from "../Common/TypeImage";

export type CapturesIconProps = {
  type?: Type;
  icon?: string;
  count: number;
};

export function CapturesIcon({ type, count, icon }: CapturesIconProps) {
  const [visible, setVisible] = React.useState(false);
  return (
    <Popover
      visible={visible}
      anchor={() => (
        <Pressable onPress={() => setVisible(true)}>
          <Layout level="3" style={[styles.card, { opacity: count > 0 ? 1 : 0.2 }]}>
            <TypeImage icon={type?.icon ?? icon ?? ""} style={{ size: 32 }} />
            <Text numberOfLines={1} ellipsizeMode="tail" category="s2">
              {type?.name ?? icon ?? ""}
            </Text>
            <Text category="s1">{count}</Text>
          </Layout>
        </Pressable>
      )}
      onBackdropPress={() => setVisible(false)}>
      <Layout style={{ padding: 4 }}>
        <Text style={{ textAlign: "center" }} category="h6">
          {count.toLocaleString()}x {type?.name ?? icon ?? ""}
        </Text>
      </Layout>
    </Popover>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
    alignItems: "center",
    width: 80,
    flexGrow: 1,
  },
});
