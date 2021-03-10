import { Layout, ListItem, Text } from "@ui-kitten/components";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import useTitle from "../../../hooks/useTitle";
import types from "@cuppazee/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ToolsStackParamList } from "../../../types";
import TypeImage from "../../../components/Common/TypeImage";
import { ToolsNavigatorProp } from "../../../navigation/ToolsNavigator";
import { useTranslation } from "react-i18next";

export default function SearchScreen() {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<ToolsStackParamList, "TypeMunzee">>();
  const type = types.getType(route.params.type);
  useTitle(`☕ ${type?.name || ""}`);
  const nav = useNavigation<ToolsNavigatorProp<"TypeMunzee">>();
  if (!type) {
    nav.goBack();
    return null;
  }

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 4, alignItems: "center" }}>
        <View style={{ padding: 4, width: 400, maxWidth: "100%" }}>
          <Layout level="3" style={{ borderRadius: 8, padding: 8 }}>
            <TypeImage icon={type.icon} style={{ size: 96, alignSelf: "center" }} iconSize={128} />
            <Text style={{ textAlign: "center" }} category="h5">
              {type.name}
            </Text>
            <ListItem
              style={{ padding: 0, backgroundColor: "transparent" }}
              accessoryLeft={() => (
                <TypeImage style={{ size: 32 }} icon={type.category?.icon || ""} />
              )}
              title={type.category?.name || type.category_raw}
              description="Category"
              onPress={() => {
                nav.push("TypeCategory", {
                  category: type.category_raw,
                });
              }}
            />
            {/* {type.points && (
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {type.points.capture !== undefined && (
                  <View style={{ width: 80, alignItems: "center", padding: 4 }}>
                    <Icon name="check" />
                    <Text style={{ textAlign: "center" }} category="c1">
                      {type.points.capture.toLocaleString()}
                    </Text>
                  </View>
                )}
                {type.points.deploy !== undefined && (
                  <View style={{ width: 80, alignItems: "center", padding: 4 }}>
                    <Icon name="external-link" />
                    <Text style={{ textAlign: "center" }} category="c1">
                      {type.points.deploy.toLocaleString()}
                    </Text>
                  </View>
                )}
              </View>
            )} */}
            {/* <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
            </View> */}
          </Layout>
        </View>
        {types.types
          .filter(i => i.category?.active)
          .filter(i => i.meta.bouncer_lands_on?.includes(type.icon)).length > 0 && (
          <View style={{ padding: 4, width: 600, maxWidth: "100%" }}>
            <Layout level="3" style={{ borderRadius: 8, padding: 8 }}>
              <Text style={{ textAlign: "center" }} category="h5">
                {t("type_details:can_host")}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {types.types
                  .filter(i => i.category?.active)
                  .filter(i => i.meta.bouncer_lands_on?.includes(type.icon))
                  .sort((a, b) => Number(a.id) - Number(b.id))
                  .map(i => (
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
        )}
        {types.types
          .filter(i => i.category?.active)
          .filter(i => type.meta.bouncer_lands_on?.includes(i.icon)).length > 0 && (
          <View style={{ padding: 4, width: 600, maxWidth: "100%" }}>
            <Layout level="3" style={{ borderRadius: 8, padding: 8 }}>
              <Text style={{ textAlign: "center" }} category="h5">
                {t("type_details:lands_on")}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {types.types
                  .filter(i => i.category?.active)
                  .filter(i => type.meta.bouncer_lands_on?.includes(i.icon))
                  .sort((a, b) => Number(a.id) - Number(b.id))
                  .map(i => (
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
        )}
      </ScrollView>
    </Layout>
  );
}
