import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import { UserStackParamList } from "../../types";
import useTitle from "../../hooks/useTitle";
import { Pressable, ScrollView, View } from "react-native";
import { UserDeploys } from "@cuppazee/api/user/deploys";
import TypeImage from "../../components/Common/TypeImage";
import Loading from "../../components/Loading";
import { AutoMap, Icons, Layer, Source } from "../../components/Map/Map";
import db from "@cuppazee/types/lib";
import dayjs from "dayjs";

export default function UserBouncersScreen() {
  const nav = useNavigation();
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "Rooms">>();
  useTitle(`☕ ${route.params.username} - Rooms`);
  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );
  const data = useCuppaZeeRequest<{
    data: { rooms: NonNullable<UserDeploys["response"]["data"]>["munzees"] };
  }>(
    "user/rooms",
    {
      user_id: user.data?.data?.user_id,
    },
    user.data?.data?.user_id !== undefined
  );

  if (!data.data || !size) {
    return (
      <Layout style={{ flex: 1 }} onLayout={onLayout}>
        <Loading data={[user, data]} />
      </Layout>
    );
  }
  return (
    <Layout onLayout={onLayout} style={{ flex: 1, flexDirection: "row" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 4 }}>
        <Layout style={{ height: 400, margin: 4, borderRadius: 8 }}>
          <AutoMap
            onPress={point => {
              const munzee = point.features?.find(i => i.source === "bouncers");
              if (munzee) {
                nav.navigate("Tools", {
                  screen: "Munzee",
                  params: { a: munzee.id },
                });
              }
            }}
            controls={
              <>
                {(
                  [
                    ["#ff0000", "0-5", "white"],
                    ["#ff5500", "6-10", "white"],
                    ["#ffff00", "11-20"],
                    ["#00ff00", "21+"],
                  ] as const
                ).map(i => (
                  <View style={{ margin: 4, borderRadius: 4, padding: 4, backgroundColor: i[0] }}>
                    <Text category="s1" style={{ textAlign: "center", color: i[2] || "black" }}>
                      {i[1]} Days Left
                    </Text>
                  </View>
                ))}
              </>
            }>
            <Icons
              icons={Object.keys(
                data.data.data.rooms.reduce(
                  (a, b) => ({ ...a, [db.strip(b.pin_icon)]: 1 }),
                  {} as any
                )
              )}
            />
            <Source
              id="bouncers"
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: data.data.data.rooms.map(i => ({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [Number(i.longitude), Number(i.latitude)],
                  },
                  properties: {
                    icon: db.strip(i.pin_icon),
                    id: i.munzee_id,
                    days: Math.ceil((Date.now() - dayjs(i.deployed_at).valueOf()) / 86400000),
                  },
                })),
              }}>
              <Layer
                id="bouncers_circle"
                type="circle"
                paint={{
                  "circle-color": [
                    "step",
                    ["get", "days"],
                    "#00ff00",
                    10,
                    "#ffff00",
                    20,
                    "#ff7700",
                    25,
                    "#ff0000",
                  ],
                  "circle-opacity": 0.4,
                  "circle-radius": ["step", ["get", "days"], 5, 10, 7, 20, 10, 25, 15],
                }}
              />
              <Layer
                id="bouncers_symbols"
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
        {data.data.data.rooms.length ? (
          <Text category="h4">You have rented {data.data.data.rooms.length} rooms</Text>
        ) : (
          <Text category="h4">You haven't rented any Timeshare or Vacation Condo Rooms</Text>
        )}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.data.data.rooms.map(i => (
            <Pressable
              style={{
                width: 400,
                maxWidth: "100%",
                flexGrow: 1,
              }}
              onPress={() =>
                nav.navigate("Tools", {
                  screen: "Munzee",
                  params: {
                    a: i.munzee_id,
                  },
                })
              }>
              <Layout
                level="2"
                style={{
                  margin: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 8,
                  flex: 1,
                }}>
                <View style={{ padding: 4 }}>
                  <TypeImage icon={i.pin_icon} style={{ size: 48 }} />
                </View>
                <View style={{ padding: 4 }}>
                  <Text category="h6">{i.friendly_name}</Text>
                  <Text category="c1">
                    Expires: {dayjs(i.deployed_at).add(30, "days").format("L LT")}
                  </Text>
                </View>
              </Layout>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}
