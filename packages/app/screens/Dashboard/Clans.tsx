import { useNavigation } from "@react-navigation/native";
import { DrawerItem } from "@ui-kitten/components";
import { Box, Heading } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, ScrollView, View } from "react-native";
import Icon from "../../components/Common/Icon";
import Tip from "../../components/Common/Tip";
import { useClanBookmarks } from "../../hooks/useBookmarks";
import { DashCardProps } from "./Dashboard";

export default React.memo(function ClansDashCard(props: DashCardProps<unknown>) {
  const { t } = useTranslation();
  const nav = useNavigation();
  const [clans] = useClanBookmarks();
  return (
    <Box bg="coolGray.200" _dark={{ bg: "coolGray.800" }} style={[styles.card, { flex: 1 }]}>
      <ScrollView onLayout={props.onOuterLayout} style={{ flex: 1 }}>
        <View onLayout={props.onInnerLayout} style={{ padding: 4 }}>
          <Heading style={{ marginLeft: 4 }} fontSize="xl">
            {t("dashboard:clans")}
          </Heading>
          <Tip
            wrapperStyle={{ margin: 4 }}
            id="drawer_clan_bookmarks"
            tip="You can add and remove clans from your Bookmarks in the Settings"
          />
          <DrawerItem
            key="clan_requirements"
            style={{ backgroundColor: "transparent" }}
            selected={false}
            title={() => (
              <Heading style={{ flex: 1, marginLeft: 4 }} fontSize="md">
                {t("pages:clan_requirements")}
              </Heading>
            )}
            accessoryLeft={props => <Icon name="star" {...props} />}
            onPress={() =>
              nav.navigate("Clan", {
                screen: "Requirements",
              })
            }
          />
          {!!clans && clans.length > 0 && (
            <DrawerItem
              key="clan_bookmarks"
              style={{ backgroundColor: "transparent" }}
              selected={false}
              title={() => (
                <Heading style={{ flex: 1, marginLeft: 4 }} fontSize="md">
                  {t("pages:clan_bookmarks")}
                </Heading>
              )}
              accessoryLeft={props => <Icon name="bookmark" {...props} />}
              onPress={() =>
                nav.navigate("Clan", {
                  screen: "Bookmarks",
                })
              }
            />
          )}
          {clans?.map(clan => (
            <DrawerItem
              key={clan.clan_id}
              style={{ backgroundColor: "transparent" }}
              selected={false}
              title={() => (
                <Heading style={{ flex: 1, marginLeft: 4 }} fontSize="md">
                  {clan.name}
                </Heading>
              )}
              accessoryLeft={() => (
                <Image
                  source={{
                    uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${clan.clan_id.toString(
                      36
                    )}.png`,
                  }}
                  style={{
                    height: 32,
                    marginVertical: -4,
                    width: 32,
                    borderRadius: 16,
                    marginHorizontal: 2,
                  }}
                />
              )}
              onPress={() =>
                nav.navigate("Clan", {
                  params: { clanid: clan.clan_id.toString() },
                  screen: "Stats",
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </Box>
  );
}, () => true)

const styles = StyleSheet.create({
  card: { margin: 4, borderRadius: 4 },
});
