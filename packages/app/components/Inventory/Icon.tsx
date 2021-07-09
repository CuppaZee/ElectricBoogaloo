import { Layout, Popover, Text } from "@ui-kitten/components";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import TypeImage from "../Common/TypeImage";
import { useTranslation } from "react-i18next";
import { UserInventoryItem } from "@cuppazee/utils";

export function InventoryIcon(data: UserInventoryItem) {
  const { t } = useTranslation()
  const [visible, setVisible] = React.useState(false);
  return (
    <Popover
      visible={visible}
      anchor={() => (
        <Pressable onPress={() => setVisible(true)}>
          <Layout level="3" style={[styles.card, { opacity: data.amount > 0 ? 1 : 0.2 }]}>
            <TypeImage icon={data.icon ?? ""} style={{ size: 32 }} />
            <Text category="s5">{data.amount}</Text>
          </Layout>
        </Pressable>
      )}
      onBackdropPress={() => setVisible(false)}>
      <Layout style={{ padding: 4 }}>
        <Text style={{ textAlign: "center" }} category="h6">
          {data.amount.toLocaleString()}x {data.type?.name ?? data.name ?? data.icon ?? ""}
        </Text>
        {!!data.undeployed && (
          <Text style={{ textAlign: "center" }} category="s1">
            {t("user_inventory:amount_undeployed", { count: data.undeployed })}
          </Text>
        )}
        {!!data.credit && (
          <Text style={{ textAlign: "center" }} category="s1">
            {t("user_inventory:amount_credits", { count: data.credit })}
          </Text>
        )}
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
