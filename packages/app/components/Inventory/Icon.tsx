import React from "react";
import { Pressable, StyleSheet } from "react-native";
import TypeImage from "../Common/TypeImage";
import { useTranslation } from "react-i18next";
import { UserInventoryItem } from "@cuppazee/utils";
import { Box, Heading, Popover, Text } from "native-base";

export function InventoryIcon(data: UserInventoryItem) {
  const { t } = useTranslation()
  return (
    <Popover
      trigger={triggerProps => (
        <Pressable {...triggerProps}>
          <Box style={[styles.card, { opacity: data.amount > 0 ? 1 : 0.2 }]}>
            <TypeImage icon={data.icon ?? ""} style={{ size: 32 }} />
            <Text fontSize="md">{data.amount}</Text>
          </Box>
        </Pressable>
      )}>
      <Popover.Content style={{ padding: 4 }}>
        <Box bg="coolGray.400" _dark={{ bg: "coolGray.600" }}>
          <Heading style={{ textAlign: "center" }} fontSize="lg">
            {data.amount.toLocaleString()}x {data.type?.name ?? data.name ?? data.icon ?? ""}
          </Heading>
          {!!data.undeployed && (
            <Text style={{ textAlign: "center" }} fontSize="md">
              {t("user_inventory:amount_undeployed", { count: data.undeployed })}
            </Text>
          )}
          {!!data.credit && (
            <Text style={{ textAlign: "center" }} fontSize="md">
              {t("user_inventory:amount_credits", { count: data.credit })}
            </Text>
          )}
        </Box>
      </Popover.Content>
    </Popover>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
    alignItems: "center",
  },
});
