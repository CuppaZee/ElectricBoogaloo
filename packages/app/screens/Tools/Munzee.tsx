import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DrawerItem, Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Image, Linking } from "react-native";
import UserActivityOverview from "../../components/Activity/Overview";
import Loading from "../../components/Loading";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useTitle from "../../hooks/useTitle";
import { ToolsStackParamList, UserStackParamList } from "../../types";
import db from "@cuppazee/types";
import TypeImage from "../../components/Common/TypeImage";
import MapView from "../../components/Maps/MapView";
import dayjs from "dayjs";

export const UserPagesNow = [
  {
    icon: "archive",
    title: "user_inventory",
    screen: "Inventory",
  },
  {
    icon: "star",
    title: "user_bouncers",
    screen: "Bouncers",
  },
  {
    icon: "trophy",
    title: "user_challenges",
    screen: "Challenges",
  },
] as const;
export const UserPagesTools = [
  {
    icon: "shield",
    title: "user_clan_progress",
    screen: "ClanProgress",
  },
  {
    icon: "earth",
    title: "user_universal_capper",
    screen: "Universal",
  },
  {
    icon: "bomb",
    title: "user_blast_checker",
    screen: "Blast",
  },
  {
    icon: "hammer",
    title: "user_qrew_checker",
    screen: "QRew",
  },
] as const;

export default function MunzeeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const nav = useNavigation();
  const route = useRoute<RouteProp<ToolsStackParamList, "Munzee">>();

  const munzee = useMunzeeRequest(
    "munzee",
    route.params.b
      ? { url: `/m/${route.params.a}/${route.params.b}` }
      : ({ munzee_id: Number(route.params?.a) } as any),
    route.params?.a !== undefined
  );
  useTitle(
    `☕ ${munzee.data?.data?.creator_username ?? "Loading..."} - ${
      munzee.data?.data?.friendly_name ?? "Loading..."
    }`
  );

  if (!munzee.data?.data) {
    return (
      <Layout style={{ flex: 1 }}>
        <Loading data={[munzee]} />
      </Layout>
    );
  }

  const m = munzee.data.data;

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            width: 1000,
            maxWidth: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            alignSelf: "center",
          }}>
          <View style={{ padding: 4, width: 1000, maxWidth: "100%", flexGrow: 1 }}>
            <Layout level="3" style={{ margin: 4, borderRadius: 4, height: 400 }}>
              <MapView
                latitude={Number(m.latitude)}
                longitude={Number(m.longitude)}
                zoom={8}
                markers={[
                  {
                    lat: Number(m.latitude),
                    lng: Number(m.longitude),
                    icon: m.pin_icon,
                    id: m.munzee_id.toString(),
                  },
                ]}
              />
            </Layout>
          </View>

          <View style={{ padding: 4, width: 400, maxWidth: "100%", flexGrow: 1 }}>
            <Layout level="3" style={{ margin: 4, borderRadius: 4, flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", padding: 4 }}>
                <TypeImage style={{ margin: 4, size: 48 }} icon={m.original_pin_image} />
                <View style={{ padding: 4, flex: 1 }}>
                  <Text category="h6">{m.friendly_name}</Text>
                  <Text category="s1">By {m.creator_username}</Text>
                  {m.deployed_at && (
                    <Text category="s2">Deployed {dayjs(m.deployed_at).format("L LT")}</Text>
                  )}
                </View>
              </View>
              <DrawerItem
                style={{ backgroundColor: "transparent" }}
                selected={false}
                title={() => (
                  <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                    Open on munzee.com
                  </Text>
                )}
                accessoryLeft={props => <Icon name="open-in-new" {...props} />}
                onPress={() => Linking.openURL(`https://www.munzee.com${m.url}`)}
              />
            </Layout>
          </View>

          {(m.bouncers || m.unicorn_munzee) && (
            <View style={{ padding: 4, width: 400, maxWidth: "100%", flexGrow: 1 }}>
              <Layout level="3" style={{ margin: 4, borderRadius: 4, flex: 1 }}>
                {[
                  ...(m.bouncers ?? []),
                  ...(m.unicorn_munzee
                    ? [{ unicorn_munzee: m.unicorn_munzee, good_until: m.special_good_until || 0 }]
                    : []),
                ].map(b => (
                  <DrawerItem
                    style={{ backgroundColor: "transparent" }}
                    selected={false}
                    title={() => (
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ marginLeft: 4 }} category="s1">
                          Hosting {b.unicorn_munzee.friendly_name}
                          <Text style={{ marginLeft: 4 }} category="s2">
                            by {b.unicorn_munzee.creator_username}
                          </Text>
                        </Text>
                        <Text style={{ marginLeft: 4 }} category="s2">
                          Expires at {dayjs(b.good_until * 1000).format("LTS")}
                        </Text>
                      </View>
                    )}
                    accessoryLeft={() => (
                      <TypeImage
                        icon={"munzee_logo" in b ? b.munzee_logo : m.pin_icon}
                        style={{
                          size: 32,
                          marginVertical: -4,
                          marginHorizontal: 2,
                        }}
                      />
                    )}
                    onPress={() =>
                      nav.setParams({
                        a: b.unicorn_munzee.creator_username,
                        b: b.unicorn_munzee.code.split('/').reverse()[1],
                      })
                    }
                  />
                ))}
              </Layout>
            </View>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
}
