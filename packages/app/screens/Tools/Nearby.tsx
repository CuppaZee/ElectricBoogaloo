import { Icon, Layout, Spinner, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import useTitle from "../../hooks/useTitle";
import { Platform, Pressable, ScrollView, View } from "react-native";
import MapView from "../../components/Maps/MapView";
import { MunzeeSpecial, MunzeeSpecialBouncer } from "@cuppazee/api/munzee/specials";
import TypeImage from "../../components/Common/TypeImage";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import types from "@cuppazee/types";
import Loading from "../../components/Loading";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

type Bouncer = (MunzeeSpecialBouncer | MunzeeSpecial) & {
  hash: string;
  distance: number;
  direction: string;
  distanceStr: string;
  // location?: {
  //   record?: {
  //     name: string;
  //     latitude: number;
  //     longitude: number;
  //     countryCode: string;
  //   };
  //   distance: number;
  // };
  // timezone: string[];
};

interface NearbySettings {
  token?: string;
  latitude: number;
  longitude: number;
}

export default function NearbyScreen() {
  const nav = useNavigation();
  const [size, onLayout] = useComponentSize();
  const theme = useTheme();
  const [settings, setSettings] = React.useState<NearbySettings>();
  useTitle(`☕ Nearby Bouncers`);
  const data = useCuppaZeeRequest<{ data: Bouncer[] }>(
    "bouncers/nearby",
    settings ?? {},
    settings !== undefined
  );

  React.useEffect(() => {
    (async () => {
      await Location.requestPermissionsAsync();
      const loc = await Location.getCurrentPositionAsync();
      let token;
      if (Platform.OS !== "web") {
        try {
          token = (
            await Notifications.getExpoPushTokenAsync({
              experienceId: "@sohcah/PaperZee",
            })
          )?.data;
        } catch (e) {}
      }
      setSettings({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        token,
      });
    })();
  }, []);

  if (!data.isFetched || !size || !settings) {
    return (
      <Layout style={{ flex: 1 }} onLayout={onLayout}>
        <Loading data={[data]} />
      </Layout>
    );
  }
  return (
    <Layout onLayout={onLayout} style={{ flex: 1, flexDirection: "row" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 4 }}>
        <Layout style={{ height: 400, margin: 4, borderRadius: 8 }}>
          <MapView
            nav={nav}
            latitude={settings.latitude}
            longitude={settings.longitude}
            zoom={10}
            markers={data.data?.data.map(i => ({
              lat: Number(i.latitude),
              lng: Number(i.longitude),
              icon: "logo" in i ? i.logo : i.mythological_munzee.munzee_logo,
              id: i.munzee_id,
            }))}
          />
        </Layout>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.data?.data
            .slice()
            .sort((a, b) => a.distance - b.distance)
            .map(i => (
              <Pressable
                onPress={() => nav.navigate("Tools", {
                  screen: "Munzee",
                  params: {
                    a: i.munzee_id
                  }
                })}
                style={{
                  width: 400,
                  maxWidth: "100%",
                  flexGrow: 1,
                }}>
                <Layout
                  key={i.hash}
                  level="2"
                  style={{
                    margin: 4,
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 8,
                    flex: 1,
                  }}>
                  <View style={{ padding: 4 }}>
                    <TypeImage
                      icon={"logo" in i ? i.logo : i.mythological_munzee.munzee_logo}
                      style={{ size: 48 }}
                    />
                  </View>
                  <View style={{ padding: 4, flex: 1 }}>
                    <Text category="h6">
                      {"mythological_munzee" in i
                        ? i.mythological_munzee.friendly_name
                        : types.getType(i.logo)?.name ?? i.logo.slice(49, -4)}
                      {"mythological_munzee" in i ? (
                        <Text category="s1"> by {i.mythological_munzee.creator_username}</Text>
                      ) : (
                        ""
                      )}
                    </Text>

                    <Text category="s1">
                      At {i.friendly_name} by {i.full_url.split("/")[4]}
                    </Text>
                    <Text category="c1">
                      Expires {dayjs(i.special_good_until * 1000).format("LTS")}
                    </Text>
                  </View>
                  <Layout
                    level="4"
                    style={{
                      padding: 4,
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                      alignSelf: "stretch",
                      width: 80,
                      justifyContent: "center",
                    }}>
                    <Text style={{ textAlign: "center" }} category="h6">
                      {i.distanceStr}
                    </Text>
                    <Text style={{ textAlign: "center" }} category="s1">
                      <Icon
                        name={
                          {
                            N: "arrow-up-thick",
                            NW: "arrow-top-left-thick",
                            NE: "arrow-top-right-thick",
                            W: "arrow-left-thick",
                            E: "arrow-right-thick",
                            SW: "arrow-bottom-left-thick",
                            SE: "arrow-bottom-right-thick",
                            S: "arrow-down-thick",
                          }[
                            i.direction.slice(2) as
                              | "N"
                              | "NE"
                              | "NW"
                              | "E"
                              | "W"
                              | "SE"
                              | "SW"
                              | "S"
                          ]
                        }
                        style={{ color: theme["text-basic-color"], height: 20, width: 20 }}
                      />
                      {i.direction.slice(2)}
                    </Text>
                  </Layout>
                </Layout>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </Layout>
  );
}
