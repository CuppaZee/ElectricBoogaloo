import { MapBoundingboxV4 } from "@cuppazee/api/map/v4";
import db from "@cuppazee/types";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { Pressable, View } from "react-native";
import TypeImage from "../../components/Common/TypeImage";
import MapView from "../../components/Maps/MapView";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useTitle from "../../hooks/useTitle";
import Clipboard from "expo-clipboard";

export default function BouncersMapScreen() {
  const nav = useNavigation();
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

  const munzees = data.data?.data?.[0]?.munzees.map(i => ({
    ...i,
    icon: db
      .strip(i.original_pin_image ?? "")
      .replace(/[0-9]starmotel/, "motel")
      .replace(/skyland[0-9]/, "skyland")
      .replace(/treehouse[0-9]/, "treehouse"),
  }));

  return (
    <Layout style={{ flex: 1 }}>
      {!location && (
        <Layout
          level="3"
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
      <MapView
        cluster={false}
        latitude={0}
        longitude={0}
        onRegionChange={d => {
          center.current = { lat: d.latitude, lng: d.longitude };
          if (d.zoom > 10) {
            setLocation(d.bounds);
          } else {
            setLocation(undefined);
          }
        }}
        nav={nav}
        onMarkerPress={event => {
          if (markers[event.id]) setSelectedMarker(Number(event.id));
        }}
        onMarkerDragEnd={event => {
          if ("target" in event.event) {
            const lngLat = event.event.target.getLngLat();
            setMarkers(value =>
              value.map((i, n) =>
                n.toString() === event.id
                  ? {
                      ...i,
                      lat: lngLat.lat,
                      lng: lngLat.lng,
                    }
                  : i
              )
            );
          } else if ("geometry" in event.event) {
            const coordinates = event.event.geometry.coordinates;
            setMarkers(value =>
              value.map((i, n) =>
                n.toString() === event.id
                  ? {
                      ...i,
                      lat: coordinates[1],
                      lng: coordinates[0],
                    }
                  : i
              )
            );
          }
        }}
        circles={[
          ...markers.map((i, n) => ({
            ...i,
            radius: getRadiusForType(i.type),
            id: `circle_${n}`,
            fill: "#00ffff11",
            stroke: "#00ffff",
          })),
          ...(munzees
            ?.filter(i => getRadiusForType(i.icon) > 0)
            .map(i => ({
              lat: Number(i.latitude ?? 0),
              lng: Number(i.longitude ?? 0),
              radius: getRadiusForType(i.icon),
              id: `circle_${i.munzee_id}`,
              fill: "#ff000011",
              stroke: "#ff0000",
            })) ?? []),
        ].filter(i => i.radius > 0)}
        markers={[
          ...markers.map((i, n) => ({
            ...i,
            icon: i.type,
            id: n.toString(),
            draggable: true,
          })),
          ...(munzees
            ?.filter(i => !selected || getRadiusForType(i.icon) > 0)
            .map(i => ({
              lat: Number(i.latitude ?? 0),
              lng: Number(i.longitude ?? 0),
              icon: i.icon,
              id: i.munzee_id?.toString() ?? "",
              munzee: i.munzee_id?.toString() ?? "",
            })) ?? []),
        ]}
        hideUserLocation={true}
      />
      {selectedMarker !== undefined && markers[selectedMarker] && (
        <Layout
          level="3"
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
        level="3"
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
                setSelected(i.icon);
              }}>
              <Layout
                level={selected === i.icon ? "4" : "3"}
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
