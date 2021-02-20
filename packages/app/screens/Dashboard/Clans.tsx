import { useNavigation } from "@react-navigation/native";
import { Icon, Layout, Text, DrawerItem } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, ScrollView, View } from "react-native";
import Tip from "../../components/Common/Tip";
import { useClanBookmarks } from "../../hooks/useBookmarks";
import useTitle from "../../hooks/useTitle";
import { DashCardProps } from "./Dashboard";

export default function ClansDashCard(props: DashCardProps<unknown>) {
  const { t } = useTranslation();
  const nav = useNavigation();
  const [clans] = useClanBookmarks();
  useTitle(`☕ Dashboard`);
  return (
    <Layout level="3" style={[styles.card, { flex: 1 }]}>
      <ScrollView onLayout={props.onOuterLayout} style={{ flex: 1 }}>
        <View onLayout={props.onInnerLayout} style={{ padding: 4 }}>
          <Text style={{ marginLeft: 4 }} category="h5">
            {t("dashboard:clans")}
          </Text>
          <Tip
            wrapperStyle={{ margin: 4 }}
            id="drawer_clan_bookmarks"
            tip="You can add and remove clans from your Bookmarks in the Settings"
          />
          <DrawerItem
            style={{ backgroundColor: "transparent" }}
            selected={false}
            title={() => (
              <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                {t("pages:clan_requirements")}
              </Text>
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
              style={{ backgroundColor: "transparent" }}
              selected={false}
              title={() => (
                <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                  {t("pages:clan_bookmarks")}
                </Text>
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
              style={{ backgroundColor: "transparent" }}
              selected={false}
              title={() => (
                <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                  {clan.name}
                </Text>
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
    </Layout>
  );
}

const styles = StyleSheet.create({
  card: { margin: 4, borderRadius: 4 },
});
