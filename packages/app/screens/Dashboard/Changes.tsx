import { useNavigation } from "@react-navigation/native";
import { Button, Layout, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, ScrollView, View, Image } from "react-native";
import builds, { Build } from "../../builds";
import TypeImage from "../../components/Common/TypeImage";
import { useClanBookmarks } from "../../hooks/useBookmarks";
import useTitle from "../../hooks/useTitle";
import { DashCardProps } from "./Dashboard";
import db from "@cuppazee/types";
import { useSettings } from "../../hooks/useSettings";

function BuildCard(build: Build) {
  return (
    <Layout level="4" style={{ margin: 4, padding: 4, borderRadius: 8 }}>
      <Text category="h4" style={{ textAlign: "center" }}>
        Build {build.build}
      </Text>
      <Text category="c1" style={{ textAlign: "center" }}>
        {dayjs(build.date).format("L")}
      </Text>
      {build.features && (
        <View style={{ paddingVertical: 8 }}>
          <Text category="h5" style={{ textAlign: "center" }}>
            New Features
          </Text>
          {build.features.map(feature => (
            <View>
              <Text category="h6" style={{ textAlign: "center" }}>
                {feature.title}
              </Text>
              <Text category="p1" style={{ textAlign: "center" }}>
                {feature.description}
              </Text>
              {feature.image && (
                <Image
                  resizeMode="contain"
                  style={{ height: 300, width: "100%" }}
                  source={{ uri: feature.image }}
                />
              )}
            </View>
          ))}
        </View>
      )}
      {build.types && (
        <View style={{ paddingVertical: 8 }}>
          <Text category="h6" style={{ textAlign: "center" }}>
            New Munzee Types
          </Text>
          {build.types.map(type => (
            <View>
              {type.title && (
                <Text category="s1" style={{ textAlign: "center" }}>
                  {type.title}
                </Text>
              )}
              {type.description && (
                <Text category="p1" style={{ textAlign: "center" }}>
                  {type.description}
                </Text>
              )}
              <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
                {[
                  ...(type.types ?? []),
                  ...(type.categories
                    ?.flatMap(i => db.getCategory(i)?.types ?? [])
                    .map(i => i.icon) ?? []),
                  ...(type.function?.() ?? []).map(i => i.icon),
                ].map(t => (
                  <TypeImage icon={t} style={{ size: 48, margin: 4 }} />
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
      {build.improvements && (
        <View style={{ paddingVertical: 8 }}>
          <Text category="h6" style={{ textAlign: "center" }}>
            Improvements
          </Text>
          {build.improvements.map(improvement => (
            <View>
              <Text category="p1" style={{ textAlign: "center" }}>
                {improvement.description}
              </Text>
              {improvement.thanks && (
                <Text category="p2" style={{ textAlign: "center" }}>
                  Thanks to {improvement.thanks}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
      {build.fixes && (
        <View style={{ paddingVertical: 8 }}>
          <Text category="h6" style={{ textAlign: "center" }}>
            Bug Fixes
          </Text>
          {build.fixes.map(fix => (
            <View>
              <Text category="p1" style={{ textAlign: "center" }}>
                {fix.description}
              </Text>
              {fix.thanks && (
                <Text category="p2" style={{ textAlign: "center" }}>
                  Thanks to {fix.thanks}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </Layout>
  );
}

export default function ChangesDashCard(props: DashCardProps<unknown>) {
  // const { t } = useTranslation();
  const [settings, setSettings] = useSettings();
  useTitle(`☕ Dashboard`);
  return (
    <Layout level="3" style={[styles.card, { flex: 1 }]}>
      <ScrollView onLayout={props.onOuterLayout} style={{ flex: 1 }}>
        <View onLayout={props.onInnerLayout} style={{ padding: 4 }}>
          <Text style={{ marginLeft: 4, textAlign: "center" }} category="h5">
            {/* {t("dashboard:changes")} */}
            Changes
          </Text>
          {builds
            .filter(i => i.build > settings.build)
            .map(i => (
              <BuildCard {...i} />
            ))}
          <Button
            appearance="outline"
            onPress={() =>
              setSettings({
                ...settings,
                build: builds[builds.length - 1].build,
              })
            }
            style={{ margin: 4 }}>
            Close
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  card: { margin: 4, borderRadius: 4 },
});
