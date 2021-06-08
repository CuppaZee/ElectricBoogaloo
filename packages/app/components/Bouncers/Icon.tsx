import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Type } from "@cuppazee/db";
import TypeImage from "../Common/TypeImage";
import { useNavigation } from "@react-navigation/native";

export type BouncerIconProps = {
  type?: Type;
  icon?: string;
  count: number;
};

export function BouncerIcon({ type, count, icon }: BouncerIconProps) {
  const nav = useNavigation()
  return (
    <Pressable onPress={type ? (() => nav.navigate("Tools", {
      screen: "BouncersMap",
      params: {
        type: type.icon
      }
    })) : null}>
      <Layout level="3" style={[styles.card, { opacity: count > 0 ? 1 : 0.2 }]}>
        <TypeImage icon={type?.icon ?? icon ?? ""} style={{ size: 32 }} />
        <Text numberOfLines={1} ellipsizeMode="tail" category="s2">
          {type?.name ?? icon ?? ""}
        </Text>
        <Text category="s1">{count}</Text>
      </Layout>
    </Pressable>
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
