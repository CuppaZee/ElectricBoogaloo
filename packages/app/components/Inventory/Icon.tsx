import { Layout, Popover, Text } from "@ui-kitten/components";
import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { UserInventoryConvertedType } from "./Data";
import icons from "@cuppazee/icons";
import db from "@cuppazee/types";

export function InventoryIcon(data: UserInventoryConvertedType) {
  const [visible, setVisible] = React.useState(false);
  return (
    <Popover
      visible={visible}
      anchor={() => <Pressable onPress={() => setVisible(true)}>
        <Layout level="2" style={[styles.card, {opacity: data.amount > 0 ? 1 : 0.2}]}>
          <Image
            source={icons[db.strip(data.icon || "")] ?? (data.type ? { uri: `https://icons.cuppazee.app/64/${data.icon}.png` } : { uri: `https://munzee.global.ssl.fastly.net/images/pins/${data.icon}.png` })}
            style={{ height: 32, width: 32 }}
          />
          <Text category="s5">{data.amount}</Text>
        </Layout>
      </Pressable>}
      onBackdropPress={() => setVisible(false)}>
      <Layout style={{ padding: 4 }}>
        <Text style={{ textAlign: "center" }} category="h6">{data.amount.toLocaleString()}x {data.type?.name ?? data.name ?? data.icon ?? ""}</Text>
        {!!data.undeployed && <Text style={{ textAlign: "center" }} category="s1">{data.undeployed.toLocaleString()} Undeployed</Text>}
        {!!data.credit && <Text style={{ textAlign: "center" }} category="s1">{data.credit.toLocaleString()} Credits</Text>}
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
