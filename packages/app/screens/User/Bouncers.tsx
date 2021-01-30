import { RouteProp, useRoute } from "@react-navigation/native";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import * as React from "react";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import { UserStackParamList } from "../../types";
import useTitle from "../../hooks/useTitle";
import { ScrollView, View } from "react-native";
import MapView from "../../components/Maps/MapView";
import { UserDeploys } from "@cuppazee/api/user/deploys";
import { MunzeeSpecialBouncer } from "@cuppazee/api/munzee/specials";
import TypeImage from "../../components/Common/TypeImage";
import useDay from "../../hooks/useDay";

type Bouncer = NonNullable<UserDeploys["response"]["data"]>["munzees"][0] & {
  bouncer?: MunzeeSpecialBouncer & { hash: string };
  location?: {
    record?: {
      name: string;
      latitude: number;
      longitude: number;
      countryCode: string;
    };
    distance: number;
  };
  timezone: string[];
}

export default function UserBouncersScreen() {
  const day = useDay();
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "Bouncers">>();
  useTitle(`☕ ${route.params.username} - Bouncers`);
  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );
  const data = useCuppaZeeRequest<{ data: Bouncer[] }>(
    "user/bouncers",
    {
      user_id: user.data?.data?.user_id,
    },
    user.data?.data?.user_id !== undefined
  );

  if (!data.data || !size) {
    return (
      <Layout
        onLayout={onLayout}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Spinner />
      </Layout>
    );
  }
  return (
    <Layout onLayout={onLayout} style={{ flex: 1, flexDirection: "row" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 4 }}>
        <Layout style={{ height: 400, margin: 4, borderRadius: 8 }}>
          <MapView
            region={{ latitude: 0, longitude: 0, latitudeDelta: 8, longitudeDelta: 8 }}
            markers={data.data.data
              .filter(i => i.bouncer)
              .map(i => ({
                lat: Number(i.bouncer?.latitude),
                lng: Number(i.bouncer?.longitude),
                icon: i.pin_icon,
                id: i.munzee_id,
              }))}
          />
        </Layout>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.data.data.map(i => (
            <Layout
              level="2"
              style={{ margin: 4, flexDirection: "row", alignItems: "center", borderRadius: 8, width: 400, maxWidth: "100%", flexGrow: 1 }}>
              <View style={{ padding: 4 }}>
                <TypeImage icon={i.pin_icon} style={{ size: 48 }} />
              </View>
              <View style={{ padding: 4 }}>
                <Text category="h6">{i.friendly_name}</Text>
                {i.bouncer ? (
                  <>
                    <Text category="s1">
                      At {i.bouncer.friendly_name} by {i.bouncer.full_url.split("/")[4]}
                    </Text>
                    {i.location?.record && (
                      <Text category="s2">
                        {i.location?.record?.name}, {i.location?.record?.countryCode} [
                        {i.timezone.map(t => day().tz(t).format("HH:mm")).join(", ")}]
                      </Text>
                    )}
                    <Text category="c1">
                      {i.number_of_captures} Captures - Last Captured {i.last_captured_at ? day(i.last_captured_at).format('L LT') : "Never"}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text category="s1">Having a Rest</Text>
                  </>
                )}
              </View>
            </Layout>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}
