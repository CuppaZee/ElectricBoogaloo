import { useNavigation } from "@react-navigation/native";
import { Layout, Text, DrawerItem, DrawerGroup } from "@ui-kitten/components";
import dayjs from "dayjs";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import UserActivityOverview from "../../components/Activity/Overview";
import ZeeOpsOverview from "../../components/ZeeOps/Overview";
import { DashCardProps } from "./Dashboard";
import TypeImage from "../../components/Common/TypeImage";
import { UserPagesNow } from "../User/Profile";
import Icon from "../../components/Common/Icon";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useDB from "../../hooks/useDB";

export default React.memo(function UserDashCard({
  item,
  touched,
  onInnerLayout,
  onOuterLayout,
}: DashCardProps<{ username: string; user_id: string }>) {
  const db = useDB();
  const { t } = useTranslation();
  const nav = useNavigation();
  const user = useMunzeeRequest("user", { username: item.username }, touched);
  return (
    <Layout level="3" style={[styles.card, { flex: 1 }]}>
      <ScrollView onLayout={onOuterLayout} style={{ flex: 1 }}>
        <View onLayout={onInnerLayout}>
          <Pressable
            onPress={() =>
              nav.navigate("User", {
                screen: "Profile",
                params: { username: item.username },
              })
            }>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 4,
                justifyContent: "center",
              }}>
              <Image
                style={{ height: 32, width: 32, borderRadius: 16, marginRight: 8 }}
                source={{
                  uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(
                    item.user_id
                  ).toString(36)}.png`,
                }}
              />
              <Text category="h5">{item.username}</Text>
            </View>
          </Pressable>
          {touched ? (
            <>
              <UserActivityOverview
                user_id={Number(item?.user_id)}
                day={dayjs.mhqNow().format("YYYY-MM-DD")}
              />
              <ZeeOpsOverview user_id={Number(item?.user_id)} />
            </>
          ) : null}
          <View style={{ padding: 4 }}>
            <DrawerItem
              style={{ backgroundColor: "transparent" }}
              selected={false}
              title={() => (
                <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                  {t("pages:user_activity")}
                </Text>
              )}
              accessoryLeft={props => <Icon name="calendar" {...props} />}
              onPress={() =>
                nav.navigate("User", {
                  screen: "Activity",
                  params: { username: item.username },
                })
              }
            />
            {UserPagesNow.map(i => (
              <DrawerItem
                key={i.screen}
                style={{ backgroundColor: "transparent" }}
                selected={false}
                title={() => (
                  <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                    {"title" in i ? t(`pages:${i.title}` as const) : i.nontranslatedtitle}
                  </Text>
                )}
                accessoryLeft={props => <Icon name={i.icon} {...props} />}
                onPress={() =>
                  nav.navigate("User", {
                    screen: i.screen,
                    params: { username: item.username },
                  })
                }
              />
            ))}
            {!!user.data?.data?.clan ? (
              <DrawerItem
                key="Clan"
                style={{ backgroundColor: "transparent" }}
                selected={false}
                title={() => (
                  <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                    {user.data?.data?.clan?.name}
                  </Text>
                )}
                accessoryLeft={() => (
                  <Image
                    source={{ uri: user.data?.data?.clan?.logo ?? "" }}
                    style={{
                      height: 32,
                      width: 32,
                      borderRadius: 16,
                      marginVertical: -4,
                      marginHorizontal: 2,
                    }}
                  />
                )}
                onPress={() =>
                  nav.navigate("Clan", {
                    screen: "Stats",
                    params: { clanid: user.data?.data?.clan?.id },
                  })
                }
              />
            ) : (
              <DrawerItem
                key="Clan"
                style={{ backgroundColor: "transparent" }}
                selected={false}
                title={() => (
                  <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                    {t(`pages:user_clan_progress`)}
                  </Text>
                )}
                accessoryLeft={props => <Icon name="shield-half-full" {...props} />}
                onPress={() =>
                  nav.navigate("User", {
                    screen: "ClanProgress",
                    params: { username: item.username },
                  })
                }
              />
            )}
            {/* <DrawerGroup
              title={() => (
                <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                  {t("pages:tools")}
                </Text>
              )}
              style={{ backgroundColor: "transparent" }}
              accessoryLeft={props => <Icon {...props} name="tools" />}>
              {UserPagesTools.map(i => (
                <DrawerItem
                  key={i.screen}
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
                      params: { username: item.username },
                    })
                  }
                />
              ))}
            </DrawerGroup> */}
            <DrawerGroup
              title={() => (
                <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                  {t("pages:user_captures")}
                </Text>
              )}
              style={{ backgroundColor: "transparent" }}
              accessoryLeft={props => <Icon {...props} name="check-bold" />}>
              {db
                .getCategory("root")
                ?.children.filter(i => i.children.length > 0)
                .map(c => (
                  <DrawerItem
                    key={c.id}
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
                        params: { username: item.username, category: c.id },
                      })
                    }
                  />
                ))}
            </DrawerGroup>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}, (a, b) => a.touched === b.touched && a.item.user_id === b.item.user_id);

const styles = StyleSheet.create({
  card: { margin: 4, borderRadius: 4 },
});
