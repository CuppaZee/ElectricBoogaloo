import { RouteProp, useRoute } from "@react-navigation/native";
import { Button, Layout, Spinner, Text } from "@ui-kitten/components";
import * as React from "react";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import { UserStackParamList } from "../../types";
import useTitle from "../../hooks/useTitle";
import { ScrollView, View } from "react-native";
import MapView from "../../components/Maps/MapView";
import Loading from "../../components/Loading";
import { BlastIcon } from "../../components/Blast/Icon";

export interface BlastPointsData {
  min: number;
  max: number;
  avg: number;
}

interface BlastData {
  total: number;
  points: BlastPointsData;
  types: {
    [type: string]: {
      total: number;
      points: BlastPointsData;
    };
  };
}

interface BlastInfo {
  lat: number;
  lng: number;
  amount: number;
}

export default function UserBouncersScreen() {
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "Blast">>();
  const [blastInfo, setBlastInfo] = React.useState<BlastInfo>();
  const pos = React.useRef<Omit<BlastInfo, "amount">>();
  useTitle(`☕ ${route.params.username} - Blast Checker`);
  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );
  const data = useCuppaZeeRequest<{ data: BlastData[] }>(
    "map/blast",
    {
      user_id: user.data?.data?.user_id,
      ...blastInfo,
    },
    user.data?.data?.user_id !== undefined && blastInfo !== undefined
  );

  if (!size) {
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
          <MapView
            latitude={0}
            longitude={9}
            onRegionChange={({ latitude, longitude }) => {
              pos.current = {
                lat: latitude,
                lng: longitude,
              };
            }}
            markers={[
              {
                center: true,
                icon: "munzee",
                id: "center",
              },
            ]}
          />
        </Layout>
        <View style={{ flexDirection: "row" }}>
          {([
            [50, "Mini"],
            [100, "Normal"],
            [500, "MEGA"],
          ] as const).map(([n, l]) => (
            <Button
              appearance="outline"
              onPress={() => {
                setBlastInfo({ ...(pos.current ?? { lat: 0, lng: 0 }), amount: n });
              }}
              style={{ flex: 1, margin: 4 }}>
              {`${l} (${n.toString()})`}
            </Button>
          ))}
        </View>
        {data.data ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {data.data.data.map((i, n) => (
              <Layout
                level="3"
                style={{
                  margin: 4,
                  alignItems: "center",
                  borderRadius: 8,
                  width: 400,
                  maxWidth: "100%",
                  flexGrow: 1,
                  padding: 4,
                }}>
                <Text category="h6">
                  Blast {n + 1} - {i.total} Munzees
                </Text>
                <Text category="s1">
                  {i.points.min} - {i.points.max} Pts (Avg. {i.points.avg})
                </Text>
                <View style={{ alignSelf: "stretch", flexDirection: "row", flexWrap: "wrap" }}>
                  {Object.entries(i.types).map(i => (
                    <View style={{ margin: 4, flexGrow: 1, width: 40, alignItems: "center" }}>
                      <BlastIcon icon={i[0]} {...i[1]} />
                    </View>
                  ))}
                </View>
              </Layout>
            ))}
          </View>
        ) : blastInfo ? (
          <Layout style={{ flex: 1 }}>
            <Loading data={[user, data]} />
          </Layout>
        ) : null}
      </ScrollView>
    </Layout>
  );
}
