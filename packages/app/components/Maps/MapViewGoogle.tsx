import React from "react";
import MapType, { Marker, Circle, Region } from "react-native-maps";
import MapClusterView from "react-native-map-clustering";
import { View } from "react-native";
import * as Location from "expo-location";
import TypeImage from "../Common/TypeImage";
import { Button, Icon, useTheme } from "@ui-kitten/components";
import { useSettings } from "../../hooks/useSettings";
import MapStyleDark from './MapStyleDark.json';

export type MapProps = {
  region: Region;
  zoom?: number;
  markers?: MapMarkerProps[];
  circles?: MapCircle[];
  circle?: [];
  onRegionChange?: (props: {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  }) => void;
};

export type MapCircle = {
  id: string;
  lat: number;
  lng: number;
  radius: number;
  fill: string;
  stroke: string;
};

export type MapMarkerProps = {
  id: string;
  lat: number;
  lng: number;
  icon: string;
};

const MapMarker = React.memo(function (props: MapMarkerProps) {
  const [tracksViewChanges, setTracksViewChanges] = React.useState(true);
  return <Marker
    tracksViewChanges={tracksViewChanges}
    coordinate={{ latitude: props.lat, longitude: props.lng }}
  >
    <TypeImage
      onLoad={()=>setTracksViewChanges(false)}
      fadeDuration={0}
      icon={props.icon}
      style={{ size: 48 }}/>
  </Marker>
})

export default function MapView(props: MapProps) {
  const theme = useTheme();
  const [{ maps }] = useSettings();
  const center = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 90,
    longitudeDelta: 90
  }
  const mapRef = React.useRef<null | MapType>(null);
  const [locError, setLocError] = React.useState(false);
  async function getLocation() {
    var { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setLocError(true);
      return;
    }
    try {
      var loc = await Location.getCurrentPositionAsync({})
      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    } catch (e) {
      setLocError(true);
    }
  }
  return <View style={{ flex: 1 }}>
    <MapClusterView
      ref={mapRef}
      initialRegion={center}
      region={props.region}
      clusteringEnabled={(props.markers?.length || 0) > 60}
      provider={maps === "apple" ? null : "google"}
      customMapStyle={theme.style === "dark" ? MapStyleDark : undefined}
      style={{ flex: 1 }}
      onRegionChangeComplete={(region)=>{
        props.onRegionChange?.({
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta
        })
      }}
    >
      {props.circles?.map(i => <Circle
        key={i.id}
        center={{ latitude: i.lat, longitude: i.lng }}
        radius={i.radius}
        fillColor={i.fill}
        strokeColor={i.stroke}
      />)}
      {props.markers?.map(i => <MapMarker key={i.id} {...i} />)}
    </MapClusterView>
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
}