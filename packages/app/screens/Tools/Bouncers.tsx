import db, { TypeHidden, TypeTags } from "@cuppazee/types";
import { Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import BouncerOverviewConverter from "../../components/Bouncers/Data";
import { BouncerIcon } from "../../components/Bouncers/Icon";
import Loading from "../../components/Loading";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useTitle from "../../hooks/useTitle";

export default function BouncersScreen() {
  useTitle(`☕ Bouncers`);
  const data = useCuppaZeeRequest("bouncers/overview", {});
  const d = React.useMemo(() => data.data ? BouncerOverviewConverter(data.data.data) : null, [data.dataUpdatedAt]);
  

  if (!data.isFetched || !d) {
    return (
      <Layout style={{ flex: 1 }}>
        <Loading data={[data]} />
      </Layout>
    );
  }
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>
        {d && d.uncategoriesTypes.length > 0 && (
          <View style={{ flexGrow: 1, width: 400, maxWidth: "100%", padding: 4 }}>
            <Layout level="3" style={{ borderRadius: 8, padding: 4 }}>
              <Text category="h5" style={{ textAlign: "center" }}>
                Uncategorised
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {d?.uncategoriesTypes.map(t => (
                  <BouncerIcon count={d.counts[t]} icon={t} />
                ))}
              </View>
            </Layout>
          </View>
        )}
        {db.categories
          .filter(i => i.active)
          .filter(i =>
            i.types.some(i => i.has_tag(TypeTags.Bouncer) || i.has_tag(TypeTags.Scatter))
          )
          .map(i => (
            <View style={{ flexGrow: 1, width: 400, maxWidth: "100%", padding: 4 }}>
              <Layout level="3" style={{ borderRadius: 8, padding: 4 }}>
                <Text category="h5" style={{ textAlign: "center" }}>
                  {i.name}
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                  {i.types
                    .filter(i => !i.hidden(TypeHidden.Bouncers))
                    .map(t => (
                      <BouncerIcon count={d?.counts[t.strippedIcon] || 0} type={t} />
                    ))}
                </View>
              </Layout>
            </View>
          ))}
      </ScrollView>
    </Layout>
  );
}
