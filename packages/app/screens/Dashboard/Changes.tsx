import dayjs from "dayjs";
import * as React from "react";
import { StyleSheet, ScrollView, View, Image } from "react-native";
import builds, { Build } from "../../builds";
import TypeImage from "../../components/Common/TypeImage";
import { DashCardProps } from "./Dashboard";
import useSetting, { BuildAtom } from "../../hooks/useSetting";
import useDB from "../../hooks/useDB";
import { Box, Button, Heading, Text } from "native-base";

function BuildCard(build: Build) {
  const db = useDB();
  return (
    <Box
      bg="coolGray.300"
      _dark={{ bg: "coolGray.700" }}
      style={{ margin: 4, padding: 4, borderRadius: 8 }}>
      <Heading fontSize="xl" style={{ textAlign: "center" }}>
        Build {build.build}
      </Heading>
      <Heading fontSize="md" style={{ textAlign: "center" }}>
        {dayjs(build.date).format("L")}
      </Heading>
      {build.features && (
        <View style={{ paddingVertical: 8 }}>
          <Heading fontSize="lg" style={{ textAlign: "center" }}>
            New Features
          </Heading>
          {build.features.map(feature => (
            <View key={feature.title}>
              <Heading fontSize="md" style={{ textAlign: "center" }}>
                {feature.title}
              </Heading>
              <Text fontSize="sm" style={{ textAlign: "center" }}>
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
          <Heading fontSize="lg" style={{ textAlign: "center" }}>
            New Munzee Types
          </Heading>
          {build.types.map((type, typeIndex) => (
            <View key={type.title || type.description || typeIndex}>
              {type.title && (
                <Heading fontSize="md" style={{ textAlign: "center" }}>
                  {type.title}
                </Heading>
              )}
              {type.description && (
                <Text fontSize="sm" style={{ textAlign: "center" }}>
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
          <Heading fontSize="lg" style={{ textAlign: "center" }}>
            Improvements
          </Heading>
          {build.improvements.map(improvement => (
            <View key={improvement.description}>
              <Text fontSize="sm" style={{ textAlign: "center" }}>
                {improvement.description}
              </Text>
              {improvement.thanks && (
                <Text fontSize="sm" style={{ textAlign: "center" }}>
                  Thanks to {improvement.thanks}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
      {build.fixes && (
        <View style={{ paddingVertical: 8 }}>
          <Heading fontSize="lg" style={{ textAlign: "center" }}>
            Bug Fixes
          </Heading>
          {build.fixes.map(fix => (
            <View key={fix.description}>
              <Text fontSize="sm" style={{ textAlign: "center" }}>
                {fix.description}
              </Text>
              {fix.thanks && (
                <Text fontSize="sm" style={{ textAlign: "center" }}>
                  Thanks to {fix.thanks}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </Box>
  );
}

export default React.memo(function ChangesDashCard(props: DashCardProps<unknown>) {
  const [build, setBuild, loaded] = useSetting(BuildAtom);
  const db = useDB();
  const buildsList = React.useMemo(() => builds(db), [db]);
  return (
    <Box bg="coolGray.200" _dark={{ bg: "coolGray.800" }} style={[styles.card, { flex: 1 }]}>
      <ScrollView onLayout={props.onOuterLayout} style={{ flex: 1 }}>
        <View onLayout={props.onInnerLayout} style={{ padding: 4 }}>
          <Heading style={{ marginLeft: 4, textAlign: "center" }} fontSize="lg">
            Changes
          </Heading>
          {!!loaded &&
            buildsList.filter(i => i.build > build).map(i => <BuildCard key={i.build} {...i} />)}
        </View>
      </ScrollView>
      <Button
        onPress={() => setBuild(buildsList[buildsList.length - 1].build)}
        style={{ margin: 8 }}>
        Dismiss
      </Button>
    </Box>
  );
}, () => true)

const styles = StyleSheet.create({
  card: { margin: 4, borderRadius: 4 },
});
