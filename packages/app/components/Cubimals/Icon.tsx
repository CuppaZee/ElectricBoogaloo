import { Button, Layout, Popover, Text } from "@ui-kitten/components";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import TypeImage from "../Common/TypeImage";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Icon from "../Common/Icon";

export type CubimalsIconProps = {
  name?: string;
  icon?: string;
  count: number;
};

export function CubimalsIcon({ count, icon, name }: CubimalsIconProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const nav = useNavigation();
  return (
    <Popover
      visible={visible}
      anchor={() => (
        <Pressable onPress={() => setVisible(true)}>
          <Layout level="3" style={[styles.card, { opacity: count > 0 ? 1 : 0.2 }]}>
            <TypeImage category="cubimals" icon={icon ?? ""} style={{ size: 32 }} />
            <Text numberOfLines={1} ellipsizeMode="tail" category="s2">
              {name ?? icon}
            </Text>
            <Text category="s1">{count}</Text>
          </Layout>
        </Pressable>
      )}
      onBackdropPress={() => setVisible(false)}>
      <Layout style={{ padding: 4 }}>
        <Text style={{ textAlign: "center" }} category="h6">
          {count.toLocaleString()}x {name ?? icon ?? ""}
        </Text>
        <Button
          style={{ margin: 4 }}
          appearance="outline"
          onPress={() =>
            nav.navigate("Tools", {
              screen: "TypeMunzee",
              params: {
                type: icon ?? "",
              },
            })
          }
          accessoryLeft={props => <Icon {...props} name="database" />}>
          {t("user_activity:type_info")}
        </Button>
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
