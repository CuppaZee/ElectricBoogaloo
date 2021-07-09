import { MapBoundingboxV4 } from "@cuppazee/api/map/v4";
import { Button, Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { Pressable, View } from "react-native";
import TypeImage from "../../components/Common/TypeImage";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useTitle from "../../hooks/useTitle";
import Clipboard from "expo-clipboard";
import Icon from "../../components/Common/Icon";
import { AutoMap, Icons, Layer, Marker, Source } from "../../components/Map/Map";
import WebMercatorViewport from "viewport-mercator-project";
import circle from "@turf/circle";
import { point } from "@turf/helpers";
import { getCoord } from "@turf/invariant";
import destination from "@turf/destination";
import useDB from "../../hooks/useDB";

export function getExpandedBounds(bounds: number[][], expansion: number) {
  const topLeft = getCoord(
    destination(
      destination(
        point([Math.min(...bounds.map(i => i[0])), Math.max(...bounds.map(i => i[1]))]),
        expansion,
        -90,
        { units: "kilometers" }
      ),
      expansion,
      0,
      { units: "kilometers" }
    )
  );
  const bottomRight = getCoord(
    destination(
      destination(
        point([Math.max(...bounds.map(i => i[0])), Math.min(...bounds.map(i => i[1]))]),
        expansion,
        90,
        { units: "kilometers" }
      ),
      expansion,
      180,
      { units: "kilometers" }
    )
  );
  return {
    lat1: topLeft[1],
    lng1: bottomRight[0],
    lat2: bottomRight[1],
    lng2: topLeft[0],
  };
}

export default function BouncersMapScreen() {
  const db = useDB();
  const [selected, setSelected] = React.useState<string>();
  const [markers, setMarkers] = React.useState<{ lat: number; lng: number; type: string }[]>([]);
  const [selectedMarker, setSelectedMarker] = React.useState<number>();
  const center = React.useRef<{ lat: number; lng: number }>();
  useTitle(`☕ Destination Planner`);
  const [location, setLocation] = React.useState<
    MapBoundingboxV4["request"]["params"]["points"]["main"]
  >();
  const destinations = [
    {
      filterID: "36",
      name: "Motel",
      icon: "motel",
      distance: [
        {
          type: "motel",
          distance: 228.6,
        },
      ],
    },
    {
      filterID: "35",
      name: "Hotel",
      icon: "hotel",
      distance: [
        {
          type: "hotel",
          distance: 609.6,
        },
      ],
    },
    {
      filterID: "97",
      name: "Time Share",
      icon: "timeshare",
      distance: [
        {
          type: "timeshare",
          distance: 609.6,
        },
        {
          type: "motel",
          distance: 152.4,
        },
        {
          type: "hotel",
          distance: 152.4,
        },
        {
          type: "treehouse",
          distance: 152.4,
        },
      ],
    },
    {
      filterID: "137",
      name: "Treehouse",
      icon: "treehouse",
      distance: [
        {
          type: "treehouse",
          distance: 304.8,
        },
      ],
    },
    {
      capture: 152.4,
      filterID: "59",
      name: "Virtual Resort",
      icon: "virtualresort",
      distance: [
        {
          type: "virtualresort",
          distance: 1065,
        },
      ],
    },
    {
      capture: 152.4,
      filterID: "138",
      name: "Vacation Condo",
      icon: "vacationcondo",
      distance: [
        {
          type: "vacationcondo",
          distance: 762,
        },
        {
          type: "virtualresort",
          distance: 152.4,
        },
      ],
    },
    {
      capture: 304.8,
      filterID: "144",
      name: "Skyland",
      icon: "skyland",
      distance: [
        {
          type: "skyland",
          distance: 1219.2,
        },
        {
          type: "virtualresort",
          distance: 152.4,
        },
        {
          type: "vacationcondo",
          distance: 152.4,
        },
      ],
    },
  ];

  function getRadiusForType(type: string) {
    return Math.max(
      0,
      destinations.find(i => i.icon === selected)?.distance.find(i => i.type === type)?.distance ??
        0,
      destinations.find(i => i.icon === type)?.distance.find(i => i.type === selected)?.distance ??
        0
    );
  }

  const data = useMunzeeRequest(
    "map/boundingbox/v4",
    {
      filters: "13,14," + destinations?.map(i => i.filterID).join(","),
      points: location
        ? {
            main: location,
          }
        : {},
      fields: "latitude,longitude,munzee_id,friendly_name,original_pin_image",
    },
    !!location,
    undefined,
    undefined,
    { keepPreviousData: true }
  );

  const munzees = data.data?.data?.[0]?.munzees?.map(i => ({
    ...i,
    icon: db
      .strip(i.original_pin_image ?? "")
      .replace(/[0-9]starmotel/, "motel")
      .replace(/[0-9]starresort/, "virtualresort")
      .replace(/skyland[0-9]/, "skyland")
      .replace(/treehouse[0-9]/, "treehouse"),
  }));

  return (
    <Layout style={{ flex: 1 }}>
      {!location && (
        <Layout
          style={{
            padding: 4,
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
          }}>
          <Text category="h5">Zoom in to load Munzees</Text>
        </Layout>
      )}

      <AutoMap
        onPositionChange={viewport => {
          center.current = {
            lat: viewport.latitude,
            lng: viewport.longitude,
          };
        }}
        onPositionFinishChange={async viewport => {
          if (viewport.zoom > 10) {
            const bounds =
              (await viewport.getBounds?.()) ??
              new WebMercatorViewport(viewport as any).getBoundingRegion();
            setLocation(getExpandedBounds(bounds, 1.4));
            // setLocation({
            //   lat1: Math.min(...bounds.map(i => i[1])),
            //   lng1: Math.min(...bounds.map(i => i[0])),
            //   lat2: Math.max(...bounds.map(i => i[1])),
            //   lng2: Math.max(...bounds.map(i => i[0])),
            // });
          } else {
            setLocation(undefined);
          }
        }}>
        <Icons icons={destinations?.map(i => db.strip(i.icon.replace("v4pins", "pins"))) ?? []} />
        {!!munzees && (
          <Source
            id="existingDeploy"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: [
                ...munzees
                  .filter(i => getRadiusForType(i.icon) > 0)
                  .map(i =>
                    circle([Number(i.longitude), Number(i.latitude)], getRadiusForType(i.icon), {
                      units: "meters",
                      properties: { colour: "#ff0000" },
                    })
                  ),
                ...markers
                  .filter(i => getRadiusForType(i.type) > 0)
                  .map(i =>
                    circle([i.lng, i.lat], getRadiusForType(i.type), {
                      units: "meters",
                      properties: { colour: "#ffaa00" },
                    })
                  ),
              ],
            }}>
            <Layer
              id="existingDeployFill"
              type="fill"
              paint={{
                "fill-color": ["get", "colour"],
                "fill-opacity": 0.1,
              }}
            />
            <Layer
              id="existingDeployStroke"
              type="line"
              paint={{
                "line-color": ["get", "colour"],
              }}
            />
          </Source>
        )}
        {!!munzees && (
          <Source
            id="existingCapture"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: [
                ...munzees
                  .filter(i => !selected || getRadiusForType(i.icon) > 0)
                  .filter(i => destinations.find(x => i.icon === x.icon)?.capture)
                  .map(i =>
                    circle(
                      [Number(i.longitude), Number(i.latitude)],
                      destinations.find(x => i.icon === x.icon)?.capture || 0,
                      {
                        units: "meters",
                        properties: { colour: "#00ff00" },
                      }
                    )
                  ),
                ...markers
                  .filter(i => !selected || getRadiusForType(i.type) > 0)
                  .filter(i => destinations.find(x => i.type === x.icon)?.capture)
                  .map(i =>
                    circle(
                      [i.lng, i.lat],
                      destinations.find(x => i.type === x.icon)?.capture || 0,
                      {
                        units: "meters",
                        properties: { colour: "#00ffaa" },
                      }
                    )
                  ),
              ],
            }}>
            <Layer
              id="existingCaptureFill"
              type="fill"
              paint={{
                "fill-color": ["get", "colour"],
                "fill-opacity": 0.1,
              }}
            />
            <Layer
              id="existingCaptureStroke"
              type="line"
              paint={{
                "line-color": ["get", "colour"],
              }}
            />
          </Source>
        )}
        {!!munzees && (
          <Source
            id="existingPins"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: munzees
                .filter(i => !selected || getRadiusForType(i.icon) > 0)
                .map(i => ({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [Number(i.longitude), Number(i.latitude)],
                  },
                  id: i.munzee_id?.toString(),
                  properties: {
                    icon: i.icon,
                    munzee_id: i.munzee_id?.toString(),
                  },
                })),
            }}>
            <Layer
              id="existingPinsIcons"
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
        )}
        {markers.map((i, n) => (
          <Marker
            id={`marker_${n}`}
            latitude={i.lat}
            longitude={i.lng}
            offsetLeft={-25.6}
            offsetTop={-51.2}
            draggable={true}
            onDragEnd={ev => {
              setMarkers(value =>
                value.map((i2, n2) =>
                  n2 === n
                    ? {
                        ...i2,
                        lat: ev.lngLat[1],
                        lng: ev.lngLat[0],
                      }
                    : i2
                )
              );
            }}
            onPress={() => {
              setSelectedMarker(n);
            }}>
            <Pressable
              onPress={() => {
                setSelectedMarker(n);
              }}>
              <TypeImage icon={i.type} style={{ size: 51.2 }} />
            </Pressable>
          </Marker>
        ))}
      </AutoMap>
      {selectedMarker !== undefined && markers[selectedMarker] && (
        <Layout
          style={{
            padding: 4,
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
          }}>
          <Button
            appearance="ghost"
            accessoryLeft={props => <Icon name="close" {...props} />}
            status="danger"
            onPress={() => setMarkers(value => value.filter((_, n) => n !== selectedMarker))}
          />
          <Text category="s1" style={{ flex: 1 }}>
            {markers[selectedMarker].lat} {markers[selectedMarker].lng}
          </Text>
          <Button
            appearance="ghost"
            accessoryLeft={props => <Icon name="content-copy" {...props} />}
            onPress={() =>
              Clipboard.setString(`${markers[selectedMarker].lat} ${markers[selectedMarker].lng}`)
            }
          />
        </Layout>
      )}
      <Layout
        style={{
          padding: 4,
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            width: 400,
            flexGrow: 100,
            maxWidth: "100%",
          }}>
          {destinations?.map(i => (
            <Pressable
              onPress={() => {
                if (selected === i.icon) {
                  setSelected(undefined);
                } else {
                  setSelected(i.icon);
                }
              }}>
              <Layout
                level={selected === i.icon ? "3" : "1"}
                style={{ borderRadius: 8, padding: 4 }}>
                <TypeImage
                  icon={i.icon}
                  style={{
                    size: 36,
                    opacity: munzees?.some(m => m.icon === i.icon) ? 1 : 0.4,
                  }}
                />
              </Layout>
            </Pressable>
          ))}
        </View>
        <Button
          style={{ flexGrow: 1 }}
          disabled={!selected}
          onPress={() => {
            if (!selected) return;
            setMarkers([
              ...markers,
              {
                lat: center.current?.lat ?? 0,
                lng: center.current?.lng ?? 0,
                type: selected,
              },
            ]);
          }}
          appearance="outline">
          Add Marker
        </Button>
      </Layout>
    </Layout>
  );
}
