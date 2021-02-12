import { DrawerContentComponentProps, DrawerContentOptions } from "@react-navigation/drawer";
import { NavigationState, PartialState, useNavigationState } from "@react-navigation/native";
import {
  Button,
  CheckBox,
  DrawerGroup,
  DrawerItem,
  Icon,
  Layout,
  Radio,
  RadioGroup,
  Text,
} from "@ui-kitten/components";
import React from "react";
import { Image, Platform, Pressable, ScrollView, View } from "react-native";
import { useClanBookmarks, useUserBookmarks } from "../hooks/useBookmarks";
import useDay from "../hooks/useDay";
import { useSettings } from "../hooks/useSettings";
import { isClanStatsBeta } from "./MainNavigator";
import * as themes from "../themes";
import dayjs from "dayjs";
import Clipboard from "expo-clipboard";
import { useTranslation } from "react-i18next";
import Tip from "../components/Common/Tip";

type NavigationRoute = {
  state?: NavigationState | PartialState<NavigationState>;
  key: string;
  name: string;
  params?: any;
};

export default function DrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>) {
  const { t } = useTranslation();
  const [users] = useUserBookmarks();
  const [clans] = useClanBookmarks();
  const day = useDay();
  const state = useNavigationState(i => i);
  const page: NavigationRoute[] = [state.routes[state.routes.length - 1]];
  const [settings, setSettings] = useSettings();
  while (page[page.length - 1].state) {
    const p = page[page.length - 1].state;
    if (p?.history && p?.routes) {
      const history = (p.history as { type: string; key?: string }[]).filter(
        i => i.type !== "drawer"
      );
      const x = (p.routes as NavigationRoute[]).find(
        i => i.key === history[history.length - 1]?.key
      );
      if (x) {
        page.push(x);
      } else {
        console.log("BREAK ERR - A", p);
        break;
      }
    } else {
      const x = p?.routes[(p?.routes.length ?? 0) - 1];
      if (x) {
        page.push(x as NavigationRoute);
      } else {
        console.log("BREAK ERR - B", p);
        break;
      }
    }
  }

  if (isClanStatsBeta) {
    return (
      <Layout style={{ flex: 1 }}>
        <ScrollView style={{ flexGrow: 1 }}>
          <Text category="h6" style={{ textAlign: "center" }}>
            This is a private beta
          </Text>
          {[
            {
              clan_id: 1349,
              key: 1349,
              name: "The Cup of Coffee Clan",
              tagline: "A Stronger Brew",
              type: "clan_stats",
            },
            {
              clan_id: 457,
              key: 457,
              name: "The Cup Of Tea Clan",
              tagline: "Just For Fun!",
              type: "clan_stats",
            },
            {
              clan_id: 2042,
              key: 2042,
              name: "The Cup of Mocha Clan",
              tagline: "A chocolate flavoured variant of a cup of latte",
              type: "clan_stats",
            },
            {
              clan_id: 1441,
              key: 1441,
              name: "The Cup Of Cocoa Clan",
              tagline: "Time to relax",
              type: "clan_stats",
            },
            {
              clan_id: 1902,
              key: 1902,
              name: "The Cup of Hot Chocolate Clan",
              tagline: "Extra Marshmallows!",
              type: "clan_stats",
            },
            {
              clan_id: 1870,
              key: 1870,
              name: "The Cup of Horlicks Clan",
              tagline: "Keeping it Simple",
              type: "clan_stats",
            },
          ].map(clan => (
            <DrawerItem
              selected={
                page[1]?.name === "Clan" &&
                page[2]?.name === "Stats" &&
                (page[2]?.params as any)?.clanid === clan.clan_id.toString()
              }
              title={clan.name}
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
                props.navigation.navigate("Clan", {
                  params: { clanid: clan.clan_id.toString() },
                  screen: "Stats",
                })
              }
            />
          ))}
          <CheckBox
            style={{ margin: 8 }}
            checked={settings.clan_reverse}
            onChange={checked => setSettings({ ...settings, clan_reverse: checked })}>
            Reverse
          </CheckBox>
          <CheckBox
            disabled={settings.clan_style === 0}
            style={{ margin: 8 }}
            checked={settings.clan_single_line}
            onChange={checked => setSettings({ ...settings, clan_single_line: checked })}>
            Single Line
          </CheckBox>
          <CheckBox
            style={{ margin: 8 }}
            checked={settings.clan_full_background}
            onChange={checked => setSettings({ ...settings, clan_full_background: checked })}>
            Full Background
          </CheckBox>
          <RadioGroup
            style={{ margin: 8 }}
            selectedIndex={settings.clan_style}
            onChange={index => setSettings({ ...settings, clan_style: index })}>
            <Radio disabled={settings.clan_single_line}>Large</Radio>
            <Radio>Comfortable</Radio>
            <Radio>Compact</Radio>
          </RadioGroup>
          <View style={{ width: 200, flexDirection: "row", flexWrap: "wrap", alignSelf: "center" }}>
            {Object.entries(themes).map(i => (
              <Pressable
                onPress={() =>
                  setSettings({
                    ...settings,
                    theme: i[0] as typeof settings.theme,
                  })
                }
                style={{ padding: settings?.theme === i[0] ? 0 : 4 }}>
                <View
                  style={{
                    borderRadius: 24,
                    height: settings?.theme === i[0] ? 40 : 32,
                    width: settings?.theme === i[0] ? 40 : 32,
                    borderWidth: 2,
                    backgroundColor:
                      i[1][i[1].style === "dark" ? "color-basic-800" : "color-basic-200"],
                  }}
                />
              </Pressable>
            ))}
          </View>
          <Button
            onPress={() =>
              Clipboard.setString(
                JSON.stringify({
                  date: dayjs().format(),
                  year: dayjs().year(),
                  month: dayjs().month(),
                  mhq_date: dayjs().tz("America/Chicago").format(),
                  mhq_year: dayjs().tz("America/Chicago").year(),
                  mhq_month: dayjs().tz("America/Chicago").month(),
                })
              )
            }>
            Copy Debug Info
          </Button>
        </ScrollView>
      </Layout>
    );
  }

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flexGrow: 1 }}>
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Search"}
          title={t("pages:tools_search")}
          accessoryLeft={props => <Icon {...props} name="magnify" />}
          onPress={() =>
            props.navigation.navigate("Tools", {
              screen: "Search",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Dashboard"}
          title={t("pages:dashboard_dashboard")}
          accessoryLeft={props => <Icon {...props} name="home" />}
          onPress={() => props.navigation.navigate("Dashboard")}
        />

        <Layout level="4" style={{ height: 1 }} />

        {/* Users */}
        {users.map(user => (
          <DrawerGroup
            title={user.username}
            accessoryLeft={() => (
              <Image
                source={{
                  uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(
                    user.user_id
                  ).toString(36)}.png`,
                }}
                style={{
                  height: 32,
                  marginVertical: -4,
                  width: 32,
                  borderRadius: 16,
                  marginHorizontal: 2,
                }}
              />
            )}>
            <DrawerItem
              selected={
                page[1]?.name === "User" &&
                page[2]?.name === "Profile" &&
                (page[2]?.params as any)?.username === user.username
              }
              title={t("pages:user_profile")}
              accessoryLeft={props => <Icon {...props} name="account" />}
              onPress={() =>
                props.navigation.navigate("User", {
                  params: { username: user.username },
                  screen: "Profile",
                })
              }
            />
            <DrawerItem
              selected={
                page[1]?.name === "User" &&
                page[2]?.name === "Activity" &&
                (page[2]?.params as any)?.username === user.username
              }
              title={t("pages:user_activity")}
              accessoryLeft={props => <Icon {...props} name="calendar" />}
              onPress={() =>
                props.navigation.navigate("User", {
                  params: {
                    username: user.username,
                    date: day().tz("America/Chicago").format("YYYY-MM-DD"),
                  },
                  screen: "Activity",
                })
              }
            />
            <DrawerItem
              selected={
                page[1]?.name === "User" &&
                page[2]?.name === "Inventory" &&
                (page[2]?.params as any)?.username === user.username
              }
              title={t("pages:user_inventory")}
              accessoryLeft={props => <Icon {...props} name="archive" />}
              onPress={() =>
                props.navigation.navigate("User", {
                  params: { username: user.username },
                  screen: "Inventory",
                })
              }
            />
            <DrawerItem
              disabled={true}
              title={t("pages:user_zeeops")}
              accessoryLeft={props => <Icon {...props} name="briefcase" />}
            />
            <DrawerItem
              disabled={true}
              title={t("pages:user_clan_progress")}
              accessoryLeft={props => <Icon {...props} name="shield" />}
            />
            <DrawerItem
              selected={
                page[1]?.name === "User" &&
                page[2]?.name === "Bouncers" &&
                (page[2]?.params as any)?.username === user.username
              }
              title={t("pages:user_bouncers")}
              accessoryLeft={props => <Icon {...props} name="star" />}
              onPress={() =>
                props.navigation.navigate("User", {
                  params: { username: user.username },
                  screen: "Bouncers",
                })
              }
            />
            <DrawerItem
              disabled={true}
              title={t("pages:user_blast_checker")}
              accessoryLeft={props => <Icon {...props} name="bomb" />}
            />
            <DrawerItem
              disabled={true}
              title={t("pages:user_qrew_checker")}
              accessoryLeft={props => <Icon {...props} name="hammer" />}
            />
            <DrawerItem
              disabled={true}
              title={t("pages:user_universal_capper")}
              accessoryLeft={props => <Icon {...props} name="check" />}
            />
          </DrawerGroup>
        ))}
        <Tip
          wrapperStyle={{ margin: 4 }}
          small
          id="drawer_user_bookmarks"
          tip="You can add and remove users from your Bookmarks in the Settings"
        />

        <Layout level="4" style={{ height: 1 }} />

        {/* Clans */}
        <DrawerItem
          selected={page[1]?.name === "Clan" && page[2]?.name === "Requirements"}
          title={t("pages:clan_requirements")}
          accessoryLeft={props => <Icon {...props} name="star" />}
          onPress={() =>
            props.navigation.navigate("Clan", {
              screen: "Requirements",
            })
          }
        />
        {clans && clans?.length > 0 && <DrawerItem
          selected={page[1]?.name === "Clan" && page[2]?.name === "Bookmarks"}
          title={t("pages:clan_bookmarks")}
          accessoryLeft={props => <Icon {...props} name="bookmark" />}
          onPress={() =>
            props.navigation.navigate("Clan", {
              screen: "Bookmarks",
            })
          }
        />}
        {clans?.slice(0, 5).map(clan => (
          <DrawerItem
            selected={
              page[1]?.name === "Clan" &&
              page[2]?.name === "Stats" &&
              (page[2]?.params as any)?.clanid === clan.clan_id.toString()
            }
            title={clan.name}
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
              props.navigation.navigate("Clan", {
                params: { clanid: clan.clan_id.toString() },
                screen: "Stats",
              })
            }
          />
        ))}

        {(clans?.length || 0) > 5 && (
          <DrawerGroup
            title={t("drawer:more_clans")}
            key={`moreclans_${clans?.length}`}
            accessoryLeft={props => <Icon {...props} name="shield-half-full" />}>
            {clans?.slice(5).map(clan => (
              <DrawerItem
                selected={
                  page[1]?.name === "Clan" &&
                  page[2]?.name === "Stats" &&
                  (page[2]?.params as any)?.clanid === clan.clan_id.toString()
                }
                title={clan.name}
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
                  props.navigation.navigate("Clan", {
                    params: { clanid: clan.clan_id.toString() },
                    screen: "Stats",
                  })
                }
              />
            ))}
          </DrawerGroup>
        )}
        <Tip
          wrapperStyle={{ margin: 4 }}
          small
          id="drawer_clan_bookmarks"
          tip="You can add and remove clans from your Bookmarks in the Settings"
        />

        <Layout level="4" style={{ height: 1 }} />

        {/* Tools */}
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Bouncers"}
          title={t("pages:tools_bouncers")}
          accessoryLeft={props => <Icon {...props} name="map-marker" />}
          onPress={() =>
            props.navigation.navigate("Tools", {
              screen: "Bouncers",
            })
          }
        />
        <DrawerItem
          disabled={true}
          title={t("pages:tools_munzee_types")}
          accessoryLeft={props => <Icon {...props} name="database" />}
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Calendar"}
          title={t("pages:tools_calendar")}
          accessoryLeft={props => <Icon {...props} name="calendar" />}
          onPress={() =>
            props.navigation.navigate("Tools", {
              screen: "Calendar",
            })
          }
        />
        <DrawerItem
          disabled={true}
          title={t("pages:tools_evo_planner")}
          accessoryLeft={props => <Icon {...props} name="dna" />}
        />

        {/* Settings */}
        <DrawerGroup title={t("pages:settings")} accessoryLeft={props => <Icon {...props} name="cog" />}>
          <DrawerItem
            selected={page[1]?.name === "Settings" && page[2]?.name === "Personalisation"}
            title={t("pages:settings_personalisation")}
            accessoryLeft={props => <Icon {...props} name="palette" />}
            onPress={() =>
              props.navigation.navigate("Settings", {
                screen: "Personalisation",
              })
            }
          />
          {Platform.OS !== "web" ? (
            <DrawerItem
              selected={page[1]?.name === "Settings" && page[2]?.name === "Notifications"}
              title={t("pages:settings_notifications")}
              accessoryLeft={props => <Icon {...props} name="bell" />}
              onPress={() =>
                props.navigation.navigate("Settings", {
                  screen: "Notifications",
                })
              }
            />
          ) : (
            <></>
          )}
          <DrawerItem
            selected={page[1]?.name === "Settings" && page[2]?.name === "Accounts"}
            title={t("pages:settings_accounts")}
            accessoryLeft={props => <Icon {...props} name="account-multiple" />}
            onPress={() =>
              props.navigation.navigate("Settings", {
                screen: "Accounts",
              })
            }
          />
          <DrawerItem
            selected={page[1]?.name === "Settings" && page[2]?.name === "Bookmarks"}
            title={t("pages:settings_bookmarks")}
            accessoryLeft={props => <Icon {...props} name="bookmark-multiple" />}
            onPress={() =>
              props.navigation.navigate("Settings", {
                screen: "Bookmarks",
              })
            }
          />
        </DrawerGroup>

        {/* More */}
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Credits"}
          title={t("pages:tools_credits")}
          accessoryLeft={props => <Icon {...props} name="heart" />}
          onPress={() =>
            props.navigation.navigate("Tools", {
              screen: "Credits",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "OpenSource"}
          title={t("pages:tools_open_source")}
          accessoryLeft={props => <Icon {...props} name="code-tags" />}
          onPress={() =>
            props.navigation.navigate("Tools", {
              screen: "OpenSource",
            })
          }
        />
        <DrawerItem
          disabled={true}
          title={t("pages:tools_donate")}
          accessoryLeft={props => <Icon {...props} name="currency-usd-circle" />}
        />
      </ScrollView>
    </Layout>
  );
}
