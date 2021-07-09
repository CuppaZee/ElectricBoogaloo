import { Button, Layout, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import * as React from "react";
import { StyleSheet, ScrollView, View, Image } from "react-native";
import builds, { Build } from "../../builds";
import TypeImage from "../../components/Common/TypeImage";
import { DashCardProps } from "./Dashboard";
import useSetting, { BuildAtom } from "../../hooks/useSetting";
import useDB from "../../hooks/useDB";

function BuildCard(build: Build) {
  const db = useDB();
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
            <View key={feature.title}>
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
              {feature.avatars && (
                <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
                  {feature.avatars.map(image => (
                    <Image
                      resizeMode="contain"
                      style={{ height: 64, width: 64, borderRadius: 32 }}
                      source={{ uri: image }}
                    />
                  ))}
                </View>
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
          {build.types.map((type, typeIndex) => (
            <View key={type.title || type.description || typeIndex}>
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
                  <TypeImage key={t} icon={t} style={{ size: 48, margin: 4 }} />
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
            <View key={improvement.description}>
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
            <View key={fix.description}>
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

export default React.memo(function ChangesDashCard(props: DashCardProps<unknown>) {
  const [build, setBuild, loaded] = useSetting(BuildAtom);
  const db = useDB();
  const buildsList = React.useMemo(() => builds(db), [db]);
  return (
    <Layout level="3" style={[styles.card, { flex: 1 }]}>
      <ScrollView onLayout={props.onOuterLayout} style={{ flex: 1 }}>
        <View onLayout={props.onInnerLayout} style={{ padding: 4 }}>
          <Text style={{ marginLeft: 4, textAlign: "center" }} category="h5">
            Changes
          </Text>
          {!!loaded &&
            buildsList.filter(i => i.build > build).map(i => <BuildCard key={i.build} {...i} />)}
        </View>
      </ScrollView>
      <Button
        appearance="outline"
        onPress={() => setBuild(buildsList[buildsList.length - 1].build)}
        style={{ margin: 8 }}>
        Dismiss
      </Button>
    </Layout>
  );
}, () => true)

const styles = StyleSheet.create({
  card: { margin: 4, borderRadius: 4 },
});
