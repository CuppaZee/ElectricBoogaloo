import { MapBoundingboxV4 } from "@cuppazee/api/map/v4";
import db from "@cuppazee/types";
import { useNavigation } from "@react-navigation/native";
import { Button, Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { Pressable, View } from "react-native";
import TypeImage from "../../components/Common/TypeImage";
import MapView from "../../components/Maps/MapView";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useTitle from "../../hooks/useTitle";
import Clipboard from "expo-clipboard";
import Icon from "../../components/Common/Icon";

export default function BouncersMapScreen() {
  const nav = useNavigation();
  const [selected, setSelected] = React.useState<string>();
  const [markers, setMarkers] = React.useState<{ lat: number; lng: number; type: string }[]>([]);
  const [selectedMarker, setSelectedMarker] = React.useState<number>();
  const center = React.useRef<{ lat: number; lng: number }>();
  useTitle(`☕ POI Planner`);
  const [location, setLocation] = React.useState<
    MapBoundingboxV4["request"]["params"]["points"]["main"]
  >();
  const types = useMunzeeRequest<any>("map/filters/v4", {});
  const pois: { id: string; image: string; name: string }[] | undefined | null = (types.data as any)
    ?.data[2].subcategories.Places.filters;

  const data = useMunzeeRequest(
    "map/boundingbox/v4",
    {
      filters: "13,14," + pois?.map(i => i.id).join(","),
      points: location
        ? {
            main: location,
          }
        : {},
      fields: "latitude,longitude,munzee_id,friendly_name,original_pin_image",
    },
    !!pois && !!location,
    undefined,
    undefined,
    { keepPreviousData: true }
  );

  const munzees = data.data?.data?.[0]?.munzees;

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
            radius: i.type === "poivirtualgarden" ? 1609.344 / 2 : 1609.344,
            id: `circle_${n}`,
            fill: "#00ffff11",
            stroke: "#00ffff",
          })),
          ...markers.map((i, n) => ({
            ...i,
            radius: 304.8,
            id: `circle_${n}_capture`,
            fill: "#00ff0011",
            stroke: "#00ff00",
          })),
          ...(munzees
            ?.filter(i => !selected || selected === db.strip(i.original_pin_image ?? ""))
            .map(i => ({
              lat: Number(i.latitude ?? 0),
              lng: Number(i.longitude ?? 0),
              radius:
                db.strip(i.original_pin_image ?? "") === "poivirtualgarden"
                  ? 1609.344 / 2
                  : 1609.344,
              id: `circle_${i.munzee_id}`,
              fill: "#ff000011",
              stroke: "#ff0000",
            })) ?? []),
        ]}
        markers={[
          ...markers.map((i, n) => ({
            ...i,
            icon: i.type,
            id: n.toString(),
            draggable: true,
          })),
          ...(munzees?.map(i => ({
            lat: Number(i.latitude ?? 0),
            lng: Number(i.longitude ?? 0),
            icon: db.strip(i.original_pin_image ?? ""),
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
          {pois?.map(i => (
            <Pressable
              onPress={() => {
                setSelected(db.strip(i.image.replace("v4pins", "pins")));
              }}>
              <Layout
                level={selected === db.strip(i.image.replace("v4pins", "pins")) ? "4" : "3"}
                style={{ borderRadius: 8, paddingVertical: 4 }}>
                <TypeImage
                  icon={i.image.replace("v4pins", "pins")}
                  style={{
                    size: 36,
                    opacity: munzees?.some(
                      m =>
                        db.strip(m.original_pin_image ?? "") ===
                        db.strip(i.image.replace("v4pins", "pins"))
                    )
                      ? 1
                      : 0.4,
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
