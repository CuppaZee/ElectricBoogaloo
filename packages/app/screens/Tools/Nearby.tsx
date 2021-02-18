
import { Layout, Spinner, Text } from "@ui-kitten/components";
import * as React from "react";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import useTitle from "../../hooks/useTitle";
import { Platform, ScrollView, View } from "react-native";
import MapView from "../../components/Maps/MapView";
import { MunzeeSpecial, MunzeeSpecialBouncer } from "@cuppazee/api/munzee/specials";
import TypeImage from "../../components/Common/TypeImage";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import types from "@cuppazee/types";
import Loading from "../../components/Loading";


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
}

interface NearbySettings {
  token?: string;
  latitude: number;
  longitude: number;
}

export default function NearbyScreen() {
  const [size, onLayout] = useComponentSize();
  const [settings, setSettings] = React.useState<NearbySettings>();
  useTitle(`☕ Nearby Bouncers`);
  const data = useCuppaZeeRequest<{ data: Bouncer[] }>("bouncers/nearby", settings ?? {}, settings !== undefined);

  React.useEffect(() => {
    (async () => {
      await Location.requestPermissionsAsync();
      const loc = await Location.getCurrentPositionAsync();
      let token;
      if (Platform.OS !== "web") {
        try {
          token = (await Notifications.getExpoPushTokenAsync({
            experienceId: "@sohcah/PaperZee",
          }))?.data;
        }catch(e){}
      }
      setSettings({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        token,
      });
    })()
  }, [])

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
              <Layout
                key={i.hash}
                level="2"
                style={{
                  margin: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 8,
                  width: 400,
                  maxWidth: "100%",
                  flexGrow: 1,
                }}>
                <View style={{ padding: 4 }}>
                  <TypeImage
                    icon={"logo" in i ? i.logo : i.mythological_munzee.munzee_logo}
                    style={{ size: 48 }}
                  />
                </View>
                <View style={{ padding: 4 }}>
                  <Text category="h6">
                    {"mythological_munzee" in i
                      ? i.mythological_munzee.friendly_name
                      : types.getType(i.logo)?.name ?? i.logo.slice(49, -4)}
                  </Text>
                  {"mythological_munzee" in i && (
                    <Text category="s1">By {i.mythological_munzee.creator_username}</Text>
                  )}
                  <Text category="s1">
                    At {i.friendly_name} by {i.full_url.split("/")[4]}
                  </Text>
                  <Text category="s1">
                    {i.distanceStr} {i.direction}
                  </Text>
                  {/* {i.location?.record && (
                  <Text category="s2">
                    {i.location?.record?.name}, {i.location?.record?.countryCode} [
                    {i.timezone.map(t => day().tz(t).format("HH:mm")).join(", ")}]
                  </Text>
                )} */}
                  {/* <Text category="c1">
                  {i.number_of_captures} Captures - Last Captured{" "}
                  {i.last_captured_at ? day(i.last_captured_at).format("L LT") : "Never"}
                </Text> */}
                </View>
              </Layout>
            ))}
        </View>
      </ScrollView>
    </Layout>
  );
}
