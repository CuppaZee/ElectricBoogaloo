import db, { TypeHidden, TypeTags } from "@cuppazee/types";
import { Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useTitle from "../../hooks/useTitle";

export default function BouncersScreen() {
  useTitle(`☕ Bouncers`);
  const data = useCuppaZeeRequest("bouncers/overview", {});
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>
        {db.categories
          .filter(i =>
            i.types.some(i => i.has_tag(TypeTags.Bouncer) || i.has_tag(TypeTags.Scatter))
          )
          .map(i => (
            <View style={{ flexGrow: 1, width: 400, maxWidth: "100%", padding: 4 }}>
              <Layout level="3" style={{ borderRadius: 8, padding: 4 }}>
                <Text category="h5" style={{ textAlign: "center" }}>
                  {i.name}
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {i.types
                    .filter(i => !i.hidden(TypeHidden.Bouncers))
                    .map(t => (
                      <View>
                        <Image style={{ height: 32, width: 32 }} source={{ uri: i.iconURL }} />
                      </View>
                    ))}
                </View>
              </Layout>
            </View>
          ))}
      </ScrollView>
    </Layout>
  );
}
