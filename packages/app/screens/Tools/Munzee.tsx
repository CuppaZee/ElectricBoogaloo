import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DrawerItem, Layout, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Linking } from "react-native";
import Loading from "../../components/Loading";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useTitle from "../../hooks/useTitle";
import { ToolsStackParamList } from "../../types";
import TypeImage from "../../components/Common/TypeImage";
import dayjs from "dayjs";
import Icon from "../../components/Common/Icon";
import { AutoMap, Icons, Layer, Source } from "../../components/Map/Map";
import useDB from "../../hooks/useDB";

export default function MunzeeScreen() {
  const { t } = useTranslation();
  const db = useDB();
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
          {(((m as any).unicorn_host?.latitude ?? m.latitude) !== "0" ||
            ((m as any).unicorn_host?.longitude ?? m.longitude) !== "0") && (
            <View style={{ padding: 4, width: 1000, maxWidth: "100%", flexGrow: 1 }}>
              <Layout level="3" style={{ margin: 4, borderRadius: 4, height: 400 }}>
                <AutoMap
                  key={m.munzee_id}
                  defaultViewport={{
                    latitude: Number((m as any).unicorn_host?.latitude ?? m.latitude),
                    longitude: Number((m as any).unicorn_host?.longitude ?? m.longitude),
                    zoom: 14,
                  }}
                  onPress={point => {
                    const munzee = point.features?.find(i => i.source === "bouncers");
                    if (munzee) {
                      nav.navigate("Tools", {
                        screen: "Munzee",
                        params: { a: munzee.id },
                      });
                    }
                  }}>
                  <Icons icons={[db.strip(m.pin_icon)]} />
                  <Source
                    id="munzee"
                    type="geojson"
                    data={{
                      type: "FeatureCollection",
                      features: [
                        {
                          type: "Feature",
                          geometry: {
                            type: "Point",
                            coordinates: [
                              Number((m as any).unicorn_host?.longitude ?? m.longitude),
                              Number((m as any).unicorn_host?.latitude ?? m.latitude),
                            ],
                          },
                          properties: {
                            icon: db.strip(m.pin_icon),
                            id: m.munzee_id,
                          },
                        },
                      ],
                    }}>
                    <Layer
                      id="munzeePin"
                      type="symbol"
                      paint={{}}
                      layout={{
                        "icon-allow-overlap": true,
                        "icon-anchor": "bottom",
                        "icon-size": 0.8,
                        "icon-image": ["get", "icon"],
                      }}
                    />
                  </Source>
                </AutoMap>
              </Layout>
            </View>
          )}

          <View style={{ padding: 4, width: 400, maxWidth: "100%", flexGrow: 1 }}>
            <Layout level="3" style={{ margin: 4, borderRadius: 4, flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", padding: 4 }}>
                <TypeImage style={{ margin: 4, size: 48 }} icon={m.original_pin_image} />
                <View style={{ padding: 4, flex: 1 }}>
                  <Text category="h6">{m.friendly_name}</Text>
                  <Text category="s1">
                    {t("munzee_details:owner", { username: m.creator_username })}
                  </Text>
                  {m.deployed_at && (
                    <Text category="s2">
                      {t("munzee_details:deployed", { date: dayjs(m.deployed_at).format("L LT") })}
                    </Text>
                  )}
                </View>
              </View>
              <DrawerItem
                style={{ backgroundColor: "transparent" }}
                selected={false}
                title={() => (
                  <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
                    {t("munzee_details:open")}
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
                          {t("munzee_details:bouncer_hosting", {
                            name: b.unicorn_munzee.friendly_name,
                          })}
                          <Text style={{ marginLeft: 4 }} category="s2">
                            {t("munzee_details:owner", {
                              username: b.unicorn_munzee.creator_username,
                            })}
                          </Text>
                        </Text>
                        <Text style={{ marginLeft: 4 }} category="s2">
                          {t("munzee_details:bouncer_expires", {
                            time: dayjs(b.good_until * 1000).format("LTS"),
                          })}
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
                        b: b.unicorn_munzee.code.split("/").reverse()[1],
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
