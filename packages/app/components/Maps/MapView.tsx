import React from "react";
import * as Location from "expo-location";
import TypeImage, { getRemoteTypeImage, getTypeImage } from "../Common/TypeImage";
import { Button, Icon } from "@ui-kitten/components";
import circle from "@turf/circle";

import MapboxGL from "@react-native-mapbox-gl/maps";
import { PixelRatio, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

MapboxGL.setAccessToken(
  "pk.eyJ1Ijoic29oY2FoIiwiYSI6ImNqeWVqcm8wdTAxc2MzaXFpa282Yzd2aHEifQ.afYbt2sVMZ-kbwdx5_PekQ"
);

export type MapProps = {
  nav?: NavigationProp<any>;
  latitude: number;
  longitude: number;
  zoom?: number;
  cluster?: boolean;
  clusterRadius?: number;
  clusterMaxZoomLevel?: number;
  markers?: MapMarkerProps[];
  circles?: MapCircle[];
  onRegionChange?: (props: {
    latitude: number;
    longitude: number;
    zoom: number;
    bounds: { [key in "lat1" | "lng1" | "lat2" | "lng2"]: number };
  }) => void;
  onMarkerDragEnd?(event: any): void;
  onMarkerPress?(event: any): void;
  hideUserLocation?: boolean;
};

export type MapLocation =
  | {
      lat: number;
      lng: number;
    }
  | { center: true };

export type MapCircle = {
  id: string;
  radius: number;
  fill: string;
  stroke: string;
} & MapLocation;

export type MapMarkerProps = {
  id: string;
  icon: string;
  munzee?: string;
  draggable?: boolean;
} & MapLocation;

function getImages(markers: MapMarkerProps[]) {
  return Array.from(new Set(markers.map(i => i.icon))).reduce(
    (a, b) => ({
      ...a,
      [b]: getTypeImage(b, 64),
    }),
    {}
  );
}

export default function MapView(props: MapProps) {
  const mapRef = React.useRef<MapboxGL.MapView | null>();
  const camRef = React.useRef<MapboxGL.Camera | null>();
  const [center, setCenter] = React.useState([0, 0]);
  const [locError, setLocError] = React.useState(false);
  async function getLocation() {
    var { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setLocError(true);
      return;
    }
    try {
      var loc = await Location.getCurrentPositionAsync({});
      camRef.current?.flyTo([loc.coords.longitude, loc.coords.latitude]);
    } catch (e) {
      setLocError(true);
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        ref={r => (mapRef.current = r)}
        onRegionDidChange={region => {
          setCenter(region.geometry.coordinates);
          props.onRegionChange?.({
            latitude: region.geometry.coordinates[1],
            longitude: region.geometry.coordinates[0],
            bounds: {
              lat1: region.properties.visibleBounds[0][1],
              lng1: region.properties.visibleBounds[0][0],
              lat2: region.properties.visibleBounds[1][1],
              lng2: region.properties.visibleBounds[1][0],
            },
            zoom: region.properties.zoomLevel,
          });
        }}>
        {!props.hideUserLocation && <MapboxGL.UserLocation />}
        <MapboxGL.Camera
          ref={r => (camRef.current = r)}
          zoomLevel={props.zoom}
          centerCoordinate={[props.longitude, props.latitude]}
        />
        <MapboxGL.Images images={getImages(props.markers ?? [])} />
        {props.circles && (
          <MapboxGL.ShapeSource
            id="circles_source"
            shape={{
              type: "FeatureCollection",
              features: props.circles.map(i =>
                circle("center" in i ? center : [i.lng, i.lat], i.radius / 1000, {
                  properties: {
                    ...i,
                    fill: i.fill.slice(0, 7),
                    opacity: parseInt(i.fill.slice(7) || "ff", 16) / 255,
                    stroke: i.stroke.slice(0, 7),
                    strokeOpacity: parseInt(i.stroke.slice(7) || "ff", 16) / 255,
                  },
                })
              ),
            }}>
            <MapboxGL.FillLayer
              id="circles"
              style={{
                fillColor: ["get", "fill"],
                fillOpacity: ["get", "opacity"],
              }}
            />
            <MapboxGL.LineLayer
              id="circlesLine"
              style={{
                lineColor: ["get", "stroke"],
                lineOpacity: ["get", "strokeOpacity"],
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        {props.markers
          ?.filter(i => i.draggable)
          .map(i => (
            <MapboxGL.PointAnnotation
              coordinate={"center" in i ? center : [i.lng, i.lat]}
              id={i.id}
              draggable={true}
              onDragEnd={(event?: any) => {
                props.onMarkerDragEnd?.({ event, id: i.id });
              }}
              anchor={{
                x: 0.5,
                y: 1,
              }}
              onSelected={(event?: any) => {
                props.onMarkerPress?.({ event, id: i.id });
              }}>
              <TypeImage
                icon={i.icon}
                iconSize={128}
                style={{ size: 64 * 0.2 * PixelRatio.get() }}
              />
            </MapboxGL.PointAnnotation>
          ))}
        {props.markers && (
          <MapboxGL.ShapeSource
            onPress={ev => {
              const m = ev.features[0].properties?.munzee;
              if (m)
                props.nav?.navigate("Tools", {
                  screen: "Munzee",
                  params: { a: m },
                });
            }}
            id="markers_source"
            cluster={props.cluster}
            clusterRadius={props.clusterRadius}
            clusterMaxZoomLevel={props.clusterMaxZoomLevel}
            shape={{
              type: "FeatureCollection",
              features: props.markers
                .filter(i => !i.draggable)
                .map(i => ({
                  type: "Feature",
                  id: i.id,
                  properties: {
                    ...i,
                    image: getRemoteTypeImage(i.icon, 128),
                  },
                  geometry: {
                    type: "Point",
                    coordinates: "center" in i ? center : [i.lng, i.lat],
                  },
                })),
            }}>
            <MapboxGL.SymbolLayer
              id="pointCount"
              style={{
                textField: "{point_count}",
                textSize: 12,
                textPitchAlignment: "map",
              }}
            />

            <MapboxGL.CircleLayer
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={["has", "point_count"]}
              style={{
                circlePitchAlignment: "map",

                circleColor: [
                  "step",
                  ["get", "point_count"],
                  "#51bbd6",
                  100,
                  "#f1f075",
                  750,
                  "#f28cb1",
                ],

                circleRadius: ["step", ["get", "point_count"], 20, 100, 30, 750, 40],

                circleOpacity: 0.84,
                circleStrokeWidth: 2,
                circleStrokeColor: "white",
              }}
            />
            <MapboxGL.SymbolLayer
              id="symbols"
              filter={["!", ["has", "point_count"]]}
              style={{
                iconSize: 0.2 * PixelRatio.get(),
                iconAnchor: "bottom",
                iconImage: ["get", "icon"],
                iconAllowOverlap: true,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>
      <Button
        style={{ position: "absolute", top: 8, left: 8 }}
        size="small"
        accessoryLeft={props => <Icon name={true ? "crosshairs-gps" : "crosshairs"} {...props} />}
        onPress={getLocation}
      />
      {/* TODO: Replace Snackbar */}
      {/* <Snackbar
      visible={locError}
      onDismiss={() => setLocError(false)}
      duration={2000}
    >
      {typeof locError == "string" ? locError : "Failed retrieving location"}
    </Snackbar> */}
    </View>
  );
}
