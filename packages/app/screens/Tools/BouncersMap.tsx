import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import * as React from "react";
import Loading from "../../components/Loading";
import MapView from "../../components/Maps/MapView";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useTitle from "../../hooks/useTitle";
import { ToolsStackParamList } from "../../types";

interface BouncerListData {
  list: string[];
  keys: [
    "latitude",
    "longitude",
    "logo",
    "munzee_id"
  ];
  data: [number, number, number, number][];
}

export default function BouncersMapScreen() {
  const route = useRoute<RouteProp<ToolsStackParamList, "BouncersMap">>();
  const nav = useNavigation();
  useTitle(`☕ Bouncers Map`);
  const data = useCuppaZeeRequest<{ data: BouncerListData }>("bouncers/list", {
    list: route.params.type
  });
  

  if (!data.data) {
    return (
      <Layout style={{ flex: 1 }}>
        <Loading data={[data]} />
      </Layout>
    );
  }
  return (
    <Layout style={{ flex: 1 }}>
      <MapView
        cluster={true}
        clusterMaxZoomLevel={10}
        clusterRadius={80}
        latitude={0}
        longitude={0}
        nav={nav}
        markers={data.data?.data.data.map(i => ({
          lat: i[0],
          lng: i[1],
          icon: data.data.data.list[i[2]],
          id: i[3].toString(),
          munzee: i[3].toString()
        }))}
      />
    </Layout>
  );
}
