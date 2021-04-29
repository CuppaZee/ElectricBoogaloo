import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DrawerItem, Layout, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Image } from "react-native";
import UserActivityOverview from "../../components/Activity/Overview";
import Loading from "../../components/Loading";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useTitle from "../../hooks/useTitle";
import { UserStackParamList } from "../../types";
import db from "@cuppazee/types";
import TypeImage from "../../components/Common/TypeImage";
import dayjs from "dayjs";
import Icon from "../../components/Common/Icon";

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
  {
    icon: "hammer",
    title: "user_qrew_checker",
    screen: "QRew",
  },
  // {
  //   icon: "star-box",
  //   title: "user_qrates",
  //   screen: "QRates",
  // },
] as const;

export default function TabOneScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const nav = useNavigation();
  const route = useRoute<RouteProp<UserStackParamList, "Profile">>();
  useTitle(`☕ ${route.params.username}`);

  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );

  if (!user.data?.data) {
    return (
      <Layout style={{ flex: 1 }}>
        <Loading data={[user]} />
      </Layout>
    );
  }

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
            <Layout level="3" style={{ margin: 4, borderRadius: 4 }}>
              <DrawerItem
                style={{ backgroundColor: "transparent" }}
                selected={false}
                title={() => (
                  <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                    {t(`pages:user_activity` as const)}
                  </Text>
                )}
                accessoryLeft={props => <Icon name="calendar" {...props} />}
                accessoryRight={props => <Icon name="chevron-right" {...props} />}
                onPress={() =>
                  nav.navigate("User", {
                    screen: "Activity",
                    params: { username: route.params.username },
                  })
                }
              />
              <UserActivityOverview
                user_id={user.data.data.user_id}
                day={dayjs.mhqNow().format("YYYY-MM-DD")}
              />
            </Layout>
          </View>

          <View style={{ padding: 4, width: 400, maxWidth: "100%", flexGrow: 1 }}>
            <Layout level="3" style={{ margin: 4, borderRadius: 4, flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", padding: 4 }}>
                <Image
                  style={{ margin: 4, height: 48, width: 48, borderRadius: 24 }}
                  source={{
                    uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${user.data?.data?.user_id.toString(
                      36
                    )}.png`,
                  }}
                />
                <View style={{ padding: 4, flex: 1 }}>
                  <Text category="h6">{user.data.data.username}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      style={{
                        color: theme["text-basic-color"],
                        height: 16,
                        width: 16,
                        marginRight: 4,
                      }}
                      name="arrow-up"
                    />
                    <Text category="s1">
                      {t("user_profile:level", { level: user.data.data.level })} -{" "}
                      {t("user_profile:points", { n: user.data.data.points, count: user.data.data.points })}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      style={{
                        color: theme["text-basic-color"],
                        height: 16,
                        width: 16,
                        marginRight: 4,
                      }}
                      name="trophy"
                    />
                    <Text category="s1">
                      {t("user_profile:rank", { rank: user.data.data.rank })}
                    </Text>
                  </View>
                  {user.data.data.titles && user.data.data.titles.length > 0 && (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Icon
                        style={{
                          color: theme["text-basic-color"],
                          height: 16,
                          width: 16,
                          marginRight: 4,
                        }}
                        name="star"
                      />
                      <Text category="s1">{user.data.data.titles.join(", ")}</Text>
                    </View>
                  )}
                </View>
              </View>
              {UserPagesNow.map(i => (
                <DrawerItem
                  style={{ backgroundColor: "transparent" }}
                  selected={false}
                  title={() => (
                    <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                      {t(`pages:${i.title}` as const)}
                    </Text>
                  )}
                  accessoryLeft={props => <Icon name={i.icon} {...props} />}
                  onPress={() =>
                    nav.navigate("User", {
                      screen: i.screen,
                      params: { username: route.params.username },
                    })
                  }
                />
              ))}
            </Layout>
          </View>

          {/* <View style={{ padding: 4, width: 400, maxWidth: "100%", flexGrow: 1 }}>
            <Layout level="3" style={{ margin: 4, borderRadius: 4, flex: 1 }}>
              {UserPagesTools.map(i => (
                <DrawerItem
                  style={{ backgroundColor: "transparent" }}
                  selected={false}
                  title={() => (
                    <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                      {t(`pages:${i.title}` as const)}
                    </Text>
                  )}
                  accessoryLeft={props => <Icon name={i.icon} {...props} />}
                  onPress={() =>
                    nav.navigate("User", {
                      screen: i.screen,
                      params: { username: route.params.username },
                    })
                  }
                />
              ))}
            </Layout>
          </View> */}

          <View style={{ padding: 4, width: 400, maxWidth: "100%", flexGrow: 1 }}>
            <Layout level="3" style={{ margin: 4, borderRadius: 4, flex: 1 }}>
              {db
                .getCategory("root")
                ?.children.filter(i => i.children.length > 0)
                .map(c => (
                  <DrawerItem
                    style={{ backgroundColor: "transparent" }}
                    selected={false}
                    title={() => (
                      <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                        {c.name}
                      </Text>
                    )}
                    accessoryLeft={() => (
                      <TypeImage icon={c.icon} style={{ size: 32, marginVertical: -4 }} />
                    )}
                    onPress={() =>
                      nav.navigate("User", {
                        screen: "Captures",
                        params: { username: route.params.username, category: c.id },
                      })
                    }
                  />
                ))}
            </Layout>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
