import { Layout, Popover, Text } from "@ui-kitten/components";
import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import icons from "@cuppazee/icons";
import db, { Type } from "@cuppazee/types";

export type BouncerIconProps = {
  type?: Type;
  icon?: string;
  count: number;
}

export function BouncerIcon({ type, count, icon }: BouncerIconProps) {
  const [visible, setVisible] = React.useState(false);
  return (
    <Popover
      visible={visible}
      anchor={() => (
        <Pressable onPress={() => setVisible(true)}>
          <Layout level="3" style={[styles.card, { opacity: count > 0 ? 1 : 0.2 }]}>
            <Image
              source={
                icons[type?.strippedIcon || ""] ??
                (type
                  ? { uri: `https://icons.cuppazee.app/64/${type.strippedIcon}.png` }
                  : { uri: `https://munzee.global.ssl.fastly.net/images/pins/${icon}.png` })
              }
              style={{ height: 32, width: 32 }}
            />
            <Text numberOfLines={1} ellipsizeMode="tail" category="s2">{type?.name ?? icon ?? ""}</Text>
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
