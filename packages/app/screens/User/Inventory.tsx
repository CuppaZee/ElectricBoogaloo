import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, Layout } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import InventoryConverter, {
  UserInventoryData,
} from "../../components/Inventory/Data";
import { InventoryIcon } from "../../components/Inventory/Icon";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import { UserStackParamList } from "../../types";
import db from "@cuppazee/types";
import useTitle from "../../hooks/useTitle";

export default function UserInventoryScreen() {
  const route = useRoute<RouteProp<UserStackParamList, "Inventory">>();
  useTitle(`☕ ${route.params.username} - Inventory`);
  const user = useMunzeeRequest("user", { username: route.params.username });
  const data = useCuppaZeeRequest<{ data: UserInventoryData }>(
    "user/inventory",
    { user_id: user.data?.data?.user_id },
    user.data?.data?.user_id !== undefined,
    user.data?.data?.user_id
  );
  const d = React.useMemo(
    () => (data.data?.data ? InventoryConverter(data.data?.data) : null),
    [data.dataUpdatedAt]
  );
  const categories = d?.categories
    .map((c) => ({
      category: c,
      types: d?.types.filter(
        (i) => (i.type?.category || db.getCategory("other")) === c
      ),
      total: d?.types
        .filter((i) => (i.type?.category || db.getCategory("other")) === c)
        .reduce((a, b) => a + b.amount, 0),
    }))
    .sort((a, b) => b.total - a.total);
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.grid}>
        {categories?.map((c) => (
          <Layout
            level="3"
            style={{
              width: 400,
              flexGrow: 1,
              maxWidth: "100%",
              margin: 4,
              borderRadius: 4,
            }}
          >
            <Text category="h6" style={{ textAlign: "center" }}>
              {c.category.name} ({c.total})
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {c.types
                .slice()
                .sort((a, b) => b.amount - a.amount)
                .map((i) => (
                  <InventoryIcon {...i} />
                ))}
            </View>
          </Layout>
        ))}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
