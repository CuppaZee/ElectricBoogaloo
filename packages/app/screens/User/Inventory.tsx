import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, Layout, CheckBox } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import InventoryConverter, {
  UserInventoryConvertedType,
  UserInventoryData,
  getCategory,
} from "../../components/Inventory/Data";
import { InventoryIcon } from "../../components/Inventory/Icon";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import { UserStackParamList } from "../../types";
import { TypeCategory, TypeState } from "@cuppazee/types";
import useTitle from "../../hooks/useTitle";
import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading";

export default function UserInventoryScreen() {
  const [includeZeroes, setIncludeZeroes] = React.useState(false);
  const [groupByState, setGroupByState] = React.useState(false);
  const { t } = useTranslation();
  const route = useRoute<RouteProp<UserStackParamList, "Inventory">>();
  useTitle(`☕ ${route.params.username} - ${t("pages:user_inventory")}`);
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

  const categories:
    | ((
        | {
            state: "physical" | "virtual" | "credit";
          }
        | {
            category: TypeCategory;
          }
      ) & {
        types?: UserInventoryConvertedType[];
        total?: number;
      })[]
    | undefined
    | null = groupByState
    ? [
        {
          state: "physical",
          types: d?.types.filter(i => i.type?.state === TypeState.Physical),
          total: d?.types
            .filter(i => i.type?.state === TypeState.Physical)
            .reduce((a, b) => a + b.amount, 0),
        },
        {
          state: "virtual",
          types: d?.types.filter(i => i.type?.state === TypeState.Virtual),
          total: d?.types
            .filter(i => i.type?.state === TypeState.Virtual)
            .reduce((a, b) => a + b.amount, 0),
        },
        {
          state: "credit",
          types: d?.types.filter(
            i => i.type?.state !== TypeState.Physical && i.type?.state !== TypeState.Virtual
          ),
          total: d?.types
            .filter(
              i => i.type?.state !== TypeState.Physical && i.type?.state !== TypeState.Virtual
            )
            .reduce((a, b) => a + b.amount, 0),
        },
      ]
    : d?.categories
        .map(c => ({
          category: c,
          types: d?.types.filter(i => getCategory(i) === c),
          total: d?.types
            .filter(i => getCategory(i) === c)
            .reduce((a, b) => a + b.amount, 0),
        }))
        .sort((a, b) => b.total - a.total);

  if (!user.isFetched || !data.isFetched || !d) {
    return <Loading level="1" data={[user, data]} />;
  }

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", padding: 4 }}>
          <CheckBox
            checked={includeZeroes}
            onChange={i => setIncludeZeroes(i)}
            style={{ margin: 8 }}>
            {t("user_inventory:settings_zero")}
          </CheckBox>
          <CheckBox
            checked={!groupByState}
            onChange={i => setGroupByState(!i)}
            style={{ margin: 8 }}>
            {t("user_inventory:settings_group")}
          </CheckBox>
        </View>
        <View style={styles.grid}>
          {categories?.filter(includeZeroes ? () => true : i => (i.total ?? 0) > 0).map(c => (
            <Layout
              level="3"
              style={{
                width: 400,
                flexGrow: 1,
                maxWidth: "100%",
                margin: 4,
                borderRadius: 4,
              }}>
              <Text category="h6" style={{ textAlign: "center" }}>
                {"category" in c
                  ? c.category.name
                  : c.state.slice(0, 1).toUpperCase() + c.state.slice(1) + "s"}{" "}
                ({c.total || "0"})
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}>
                {c.types
                  ?.slice()
                  .filter(includeZeroes ? () => true : i => i.amount > 0)
                  .sort((a, b) => b.amount - a.amount)
                  .map(i => (
                    <InventoryIcon {...i} />
                  ))}
              </View>
            </Layout>
          ))}
        </View>
        <Text style={{ textAlign: "center" }} category="h5">
          {t("user_inventory:history")}
        </Text>
        <View style={styles.grid}>
          {d?.history.map(c => (
            <Layout
              level="3"
              style={{
                width: 400,
                flexGrow: 1,
                maxWidth: "100%",
                margin: 4,
                borderRadius: 4,
              }}>
              <Text category="h6" style={{ textAlign: "center" }}>
                {typeof c.title === "string" ? c.title : t(c.title[0] as any, c.title[1])}
              </Text>
              <Text category="c1" style={{ textAlign: "center" }}>
                {c.time.format("L LT")}
              </Text>
              {c.description && (
                <Text category="p1" style={{ textAlign: "center" }}>
                  {c.description}
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}>
                {c.types
                  .slice()
                  .sort((a, b) => b.amount - a.amount)
                  .map(i => (
                    <InventoryIcon {...i} />
                  ))}
              </View>
            </Layout>
          ))}
        </View>
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
