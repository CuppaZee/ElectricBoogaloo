import { Layout, ListItem, Text } from "@ui-kitten/components";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import useTitle from "../../../hooks/useTitle";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ToolsStackParamList } from "../../../types";
import TypeImage from "../../../components/Common/TypeImage";
import { ToolsNavigatorProp } from "../../../navigation-drawer/ToolsNavigator";
import useDB from "../../../hooks/useDB";

export default function SearchScreen() {
  const db = useDB();
  const route = useRoute<RouteProp<ToolsStackParamList, "TypeCategory">>();
  const category =
    db.getCategory(route.params.category) ?? db.getCategory("root") ?? db.categories[0];
  useTitle(`☕ ${category?.name || ""}`);
  const nav = useNavigation<ToolsNavigatorProp<"TypeCategory">>();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 4, alignItems: "center" }}>
        <View style={{ padding: 4, width: 400, maxWidth: "100%" }}>
          <Layout level="3" style={{ borderRadius: 8, padding: 8 }}>
            <Text style={{ textAlign: "center" }} category="h5">
              {category.name}
            </Text>
            {category.children.map(i => (
              <ListItem
                style={{ padding: 0, backgroundColor: "transparent" }}
                accessoryLeft={() => <TypeImage style={{ size: 32 }} icon={i.icon} />}
                title={i.name}
                onPress={() => {
                  nav.push("TypeCategory", {
                    category: i.id,
                  });
                }}
              />
            ))}
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {category.types.map(i => (
                <Pressable
                  onPress={() => nav.push("TypeMunzee", { type: i.icon })}
                  style={{ width: 80, alignItems: "center", flexGrow: 1, padding: 4 }}>
                  <TypeImage style={{ size: 32 }} icon={i.icon} />
                  <Text style={{ textAlign: "center" }} category="c1">
                    {i.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Layout>
        </View>
      </ScrollView>
    </Layout>
  );
}
