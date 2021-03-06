import { DrawerContentComponentProps, DrawerContentOptions } from "@react-navigation/drawer";
import { getPathFromState, useNavigationState } from "@react-navigation/native";
import {
  DrawerGroup as UIKittenDrawerGroup,
  DrawerGroupProps,
  DrawerItem as UIKittenDrawerItem,
  DrawerItemProps,
  Layout,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { Alert, Image, Platform, ScrollView, useWindowDimensions, View } from "react-native";
import { useClanBookmarks, useUserBookmarks } from "../hooks/useBookmarks";
import useDay from "../hooks/useDay";
import { useTranslation } from "react-i18next";
import Tip from "../components/Common/Tip";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "../components/Common/Icon";
import useSetting, { DrawerAtom, ReadyAtom } from "../hooks/useSetting";
import ExpoClipboard from "expo-clipboard";
import useDB, { dbLoadLog } from "../hooks/useDB";

const DrawerItem = React.memo(
  function ({ title, style, ...props }: DrawerItemProps) {
    const [drawerSettings] = useSetting(DrawerAtom);
    const dimensions = useWindowDimensions();
    const open = drawerSettings.open || dimensions.width <= 1000;
    return (
      <UIKittenDrawerItem
        {...props}
        title={open ? title : ""}
        style={[
          style,
          open
            ? undefined
            : {
                width: 52,
                paddingLeft: 8,
              },
        ]}
      />
    );
  },
  (a, b) => a.title === b.title && a.selected === b.selected
);

function DrawerGroup({ title, style, ...props }: DrawerGroupProps) {
  const [drawerSettings] = useSetting(DrawerAtom);
  const dimensions = useWindowDimensions();
  const open = drawerSettings.open || dimensions.width <= 1000;
  if (open) {
    return <UIKittenDrawerGroup {...props} title={title} style={style} />;
  }
  return (
    <UIKittenDrawerGroup
      {...props}
      title=""
      accessoryRight={() => <></>}
      style={[
        style,
        {
          width: 52,
        },
      ]}
    />
  );
}

const MainDrawerContent = function ({ page, navigation }: { page: any[]; navigation: any }) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [users] = useUserBookmarks();
  const [clans] = useClanBookmarks();
  const day = useDay();
  const [drawerSettings, setDrawerSettings] = useSetting(DrawerAtom);
  const dimensions = useWindowDimensions();
  const [showDBDebug, setDBDebug] = useState(false);
  useDB();
  const open = drawerSettings.open || dimensions.width <= 1000;
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={open}
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Search"}
          title={t("pages:tools_search")}
          accessoryLeft={props => <Icon {...props} name="magnify" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "Search",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Dashboard"}
          title={t("pages:dashboard_dashboard")}
          accessoryLeft={props => <Icon {...props} name="home" />}
          onPress={() => navigation.navigate("Dashboard")}
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Nearby"}
          title={t("pages:tools_nearby")}
          accessoryLeft={props => <Icon {...props} name="map-marker-radius" />}
          onPress={() => navigation.navigate("Tools", { screen: "Nearby" })}
        />

        <Layout level="4" style={{ height: 1 }} />

        {/* Users */}
        {users.map(user => (
          <DrawerGroup
            key={user.user_id}
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
                navigation.navigate("User", {
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
                navigation.navigate("User", {
                  params: {
                    username: user.username,
                    date: day.mhqNow().format("YYYY-MM-DD"),
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
                navigation.navigate("User", {
                  params: { username: user.username },
                  screen: "Inventory",
                })
              }
            />
            {/* <DrawerItem
              disabled={true}
              title={t("pages:user_zeeops")}
              accessoryLeft={props => <Icon {...props} name="briefcase" />}
            /> */}
            <DrawerItem
              selected={
                page[1]?.name === "User" &&
                page[2]?.name === "ClanProgress" &&
                (page[2]?.params as any)?.username === user.username
              }
              title={t("pages:user_clan_progress")}
              accessoryLeft={props => <Icon {...props} name="shield" />}
              onPress={() =>
                navigation.navigate("User", {
                  params: { username: user.username },
                  screen: "ClanProgress",
                })
              }
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
                navigation.navigate("User", {
                  params: { username: user.username },
                  screen: "Bouncers",
                })
              }
            />
            <DrawerItem
              selected={
                page[1]?.name === "User" &&
                page[2]?.name === "QRew" &&
                (page[2]?.params as any)?.username === user.username
              }
              title={t("pages:user_qrew_checker")}
              accessoryLeft={props => <Icon {...props} name="hammer" />}
              onPress={() =>
                navigation.navigate("User", {
                  params: { username: user.username },
                  screen: "QRew",
                })
              }
            />
            <DrawerItem
              selected={
                page[1]?.name === "User" &&
                (page[2]?.name === "Challenges" || page[2]?.name === "Challenge") &&
                (page[2]?.params as any)?.username === user.username
              }
              title={t("pages:user_challenges")}
              accessoryLeft={props => <Icon {...props} name="trophy" />}
              onPress={() =>
                navigation.navigate("User", {
                  params: { username: user.username },
                  screen: "Challenges",
                })
              }
            />
          </DrawerGroup>
        ))}
        {open && (
          <Tip
            wrapperStyle={{ margin: 4 }}
            small
            id="drawer_user_bookmarks"
            tip="You can add and remove users from your Bookmarks in the Settings"
          />
        )}

        <Layout level="4" style={{ height: 1 }} />

        {/* Clans */}
        <DrawerItem
          selected={page[1]?.name === "Clan" && page[2]?.name === "Requirements"}
          title={t("pages:clan_requirements")}
          accessoryLeft={props => <Icon {...props} name="star" />}
          onPress={() =>
            navigation.navigate("Clan", {
              screen: "Requirements",
            })
          }
        />
        {clans && clans?.length > 0 && (
          <DrawerItem
            selected={page[1]?.name === "Clan" && page[2]?.name === "Bookmarks"}
            title={t("pages:clan_bookmarks")}
            accessoryLeft={props => <Icon {...props} name="bookmark" />}
            onPress={() =>
              navigation.navigate("Clan", {
                screen: "Bookmarks",
              })
            }
          />
        )}
        {clans?.slice(0, 5).map(clan => (
          <DrawerItem
            key={clan.clan_id}
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
              navigation.navigate("Clan", {
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
                key={clan.clan_id}
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
                  navigation.navigate("Clan", {
                    params: { clanid: clan.clan_id.toString() },
                    screen: "Stats",
                  })
                }
              />
            ))}
          </DrawerGroup>
        )}
        {open && (
          <Tip
            wrapperStyle={{ margin: 4 }}
            small
            id="drawer_clan_bookmarks"
            tip="You can add and remove clans from your Bookmarks in the Settings"
          />
        )}

        <Layout level="4" style={{ height: 1 }} />

        {/* Tools */}
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Bouncers"}
          title={t("pages:tools_bouncers")}
          accessoryLeft={props => <Icon {...props} name="map-marker" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "Bouncers",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "BouncersExpiring"}
          title="Bouncing Soon"
          accessoryLeft={props => <Icon {...props} name="clock" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "BouncersExpiring",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name.startsWith("Type")}
          title={t("pages:tools_munzee_types")}
          accessoryLeft={props => <Icon {...props} name="database" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "TypeCategory",
              params: { category: "root" },
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Calendar"}
          title={t("pages:tools_calendar")}
          accessoryLeft={props => <Icon {...props} name="calendar" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "Calendar",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Universal"}
          title={t("pages:user_universal_capper")}
          accessoryLeft={props => <Icon {...props} name="earth" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "Universal",
            })
          }
        />

        <Layout level="4" style={{ height: 1 }} />

        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Blast"}
          title="Blast Planner"
          accessoryLeft={props => <Icon {...props} name="bomb" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "Blast",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "POIPlanner"}
          title={t("pages:tools_poiplanner")}
          accessoryLeft={props => <Icon {...props} name="map-marker-circle" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "POIPlanner",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "DestinationPlanner"}
          title="Destination Planner"
          accessoryLeft={props => <Icon {...props} name="home-circle-outline" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "DestinationPlanner",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "EvoPlanner"}
          title={t("pages:tools_evo_planner")}
          accessoryLeft={props => <Icon {...props} name="dna" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "EvoPlanner",
            })
          }
        />

        <Layout level="4" style={{ height: 1 }} />

        {/* Settings */}
        <DrawerGroup
          title={t("pages:settings")}
          accessoryLeft={props => <Icon {...props} name="cog" />}>
          <DrawerItem
            selected={page[1]?.name === "Settings" && page[2]?.name === "Personalisation"}
            title={t("pages:settings_personalisation")}
            accessoryLeft={props => <Icon {...props} name="palette" />}
            onPress={() =>
              navigation.navigate("Settings", {
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
                navigation.navigate("Settings", {
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
              navigation.navigate("Settings", {
                screen: "Accounts",
              })
            }
          />
          <DrawerItem
            selected={page[1]?.name === "Settings" && page[2]?.name === "Bookmarks"}
            title={t("pages:settings_bookmarks")}
            accessoryLeft={props => <Icon {...props} name="bookmark-multiple" />}
            onPress={() =>
              navigation.navigate("Settings", {
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
            navigation.navigate("Tools", {
              screen: "Credits",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "OpenSource"}
          title={t("pages:tools_open_source")}
          accessoryLeft={props => <Icon {...props} name="code-tags" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "OpenSource",
            })
          }
        />
        <DrawerItem
          selected={page[1]?.name === "Tools" && page[2]?.name === "Donate"}
          title={t("pages:tools_donate")}
          accessoryLeft={props => <Icon {...props} name="currency-usd-circle" />}
          onPress={() =>
            navigation.navigate("Tools", {
              screen: "Donate",
            })
          }
        />
        {showDBDebug && (
          <>
            <Text category="h6">Hello 2</Text>
            {dbLoadLog.map(i => (
              <View>
                <Text category="s1">{i}</Text>
              </View>
            ))}
          </>
        )}
        <DrawerItem
          selected={false}
          title="View DB Debug"
          accessoryLeft={props => <Icon {...props} name="star" />}
          onPress={() => {
            // ExpoClipboard.setString(dbLoadLog.join(', \n'))
            setDBDebug(true);
            // if (Platform.OS === "web") {
            //   alert("Copied to Clipboard")
            // } else {
            //   Alert.alert("Copied to Clipboard");
            // }
          }}
        />
        {dimensions.width > 1000 && <View style={{ height: 44 }} />}
      </ScrollView>
      {dimensions.width > 1000 && (
        <DrawerItem
          style={{ position: "absolute", bottom: 0, left: 0, width: open ? 255 : 52 }}
          title={open ? "Minimise" : ""}
          accessoryLeft={props => (
            <Icon {...props} name={open ? "chevron-left" : "chevron-right"} />
          )}
          onPress={() => setDrawerSettings({ ...drawerSettings, open: !drawerSettings.open })}
        />
      )}
    </Layout>
  );
};

export default function DrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>) {
  const state = useNavigationState(i => i);
  const pathURL = getPathFromState(state);
  const page = React.useMemo(() => {
    const path = pathURL.split("?")[0];
    const params = Object.fromEntries(
      (pathURL.split("?")[1] || "")
        .split("&")
        .filter(i => i)
        .map(i => i.split("=").map(i => decodeURIComponent(i)))
    );
    const page = path
      .split("/")
      .slice(1)
      .map(i => ({
        name: i,
        params: params.screen ? params.params : params,
      }));
    if (params.screen) {
      page.push({
        name: params.screen,
        params: params.params,
      });
    }
    return page;
  }, [pathURL]);

  const [ready] = useSetting(ReadyAtom);
  if (ready !== "2020-03-20") return null;

  return (
    // <EvaWrapper dark>
      <MainDrawerContent page={page} navigation={props.navigation} />
    // </EvaWrapper>
  );
}
