import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Common/Icon";
import Select from "../../components/Common/Select";
import Loading from "../../components/Loading";
import { AutoMap, Icons, Layer, Source } from "../../components/Map/Map";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useTitle from "../../hooks/useTitle";
import { ToolsStackParamList } from "../../types";

interface BouncerListData {
  list: string[];
  keys: ["latitude", "longitude", "logo", "munzee_id"];
  data: [number, number, number, number][];
}

export default function BouncersMapScreen() {
  const [view, setView] = React.useState<"clustered" | "all" | "heatmap">("clustered");
  const route = useRoute<RouteProp<ToolsStackParamList, "BouncersMap">>();
  const nav = useNavigation();
  const { t } = useTranslation();
  useTitle(`☕ ${t("pages:tools_bouncers")} - ${route.params.type.split(",").join(", ")}`);
  const data = useCuppaZeeRequest<{ data: BouncerListData }>("bouncers/list", {
    list: route.params.type,
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
      <AutoMap
        onPress={point => {
          const munzee = point.features?.find(i => i.source?.startsWith("bouncers"));
          if (munzee) {
            nav.navigate("Tools", {
              screen: "Munzee",
              params: { a: munzee.id },
            });
          }
        }}
        controls={
          <Select
            style={{ margin: 4 }}
            accessoryLeft={({ style, ...props }: any) => (
              <Icon
                {...props}
                style={[style, { transform: [{ scale: 0.8 }], marginHorizontal: 0 }]}
                name="map-marker"
              />
            )}
            accessoryRight={() => null as any}
            size="small"
            value={view}
            onValueChange={(value: any) => setView(value)}
            options={[
              { value: "clustered", label: "Clustered" },
              { value: "all", label: "All Pins" },
              { value: "heatmap", label: "Heatmap" },
            ]}
          />
        }>
        <Icons icons={data.data.data.list} />
        <Source
          key={"bouncers_" + view}
          id={"bouncers_" + view}
          type="geojson"
          cluster={view === "clustered"}
          clusterMaxZoom={view === "clustered" ? 10 : 0}
          clusterRadius={view === "clustered" ? 80 : 0}
          data={{
            type: "FeatureCollection",
            features: data.data.data.data.map(i => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [i[1], i[0]],
              },
              id: i[3].toString(),
              properties: {
                icon: data.data.data.list[i[2]],
                munzee_id: i[3].toString(),
              },
            })),
          }}>
          {view === "heatmap" && (
            <Layer
              key={"bouncerHeatmap_" + view}
              id="bouncerHeatmap"
              type="heatmap"
              maxzoom={9}
              paint={{
                "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
                "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
                "heatmap-color": [
                  "interpolate",
                  ["linear"],
                  ["heatmap-density"],
                  0,
                  "rgba(33,102,172,0)",
                  0.2,
                  "rgb(103,169,207)",
                  0.4,
                  "rgb(209,229,240)",
                  0.6,
                  "rgb(253,219,199)",
                  0.8,
                  "rgb(239,138,98)",
                  0.9,
                  "rgb(255,201,101)",
                ],
                "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
                "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
              }}
            />
          )}
          {view === "clustered" && (
            <Layer
              key="bouncerClusterCircles"
              id="bouncerClusterCircles"
              type="circle"
              paint={{
                "circle-color": [
                  "step",
                  ["get", "point_count"],
                  "#51bbd6",
                  100,
                  "#f1f075",
                  750,
                  "#f28cb1",
                ],
                "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
              }}
              filter={["has", "point_count"]}
            />
          )}
          {view === "clustered" && (
            <Layer
              key="bouncerClusterLabels"
              id="bouncerClusterLabels"
              type="symbol"
              paint={{}}
              layout={{
                "text-field": "{point_count_abbreviated}",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12,
              }}
              filter={["has", "point_count"]}
            />
          )}
          <Layer
            minzoom={view === "heatmap" ? 9 : 0}
            key={"bouncerIcons_" + view}
            id={"bouncerIcons"}
            type="symbol"
            paint={{}}
            filter={["!", ["has", "point_count"]]}
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
  );
}
