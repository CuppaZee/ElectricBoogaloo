import React from 'react'
import { GoogleMap, LoadScript, Marker, MarkerClusterer, StandaloneSearchBox, Circle } from '@react-google-maps/api';
import * as Location from 'expo-location';
import { MapProps } from './MapView';
import { Button, Icon, useTheme } from '@ui-kitten/components';
import { getTypeImage } from '../Common/TypeImage';

const key = "AIzaSyADGInCzWshKaZUKmZxMed5BKJ4qdN2UTE"
const version = "beta&map_ids=1e47783ba0e84c45,f5056005d4606f72";

function MarkerRenderer(props: MapProps) {
  if ((props.markers?.length  || 0) > 60)
    return (
      <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
        {clusterer =>
          props.markers?.map((i, index) => (
            <Marker
              clusterer={clusterer}
              key={index}
              icon={{
                url: getTypeImage(i.icon)?.uri || getTypeImage(i.icon),
                scaledSize: { height: 48, width: 48 },
              }}
              position={{ lat: i.lat, lng: i.lng }}
            />
          ))
        }
      </MarkerClusterer>
    );
  return (
    <>
      {props.markers?.map((i, index) => (
        <Marker
          key={index}
          icon={{
            url: getTypeImage(i.icon)?.uri || getTypeImage(i.icon),
            scaledSize: { height: 48, width: 48 },
          }}
          position={{ lat: i.lat, lng: i.lng }}
        />
      ))}
    </>
  );
}

function WebMap(props: MapProps) {
  var theme = useTheme();
  var [center, setCenter] = React.useState<{ lat: number; lng: number }>();
  var mapRef = React.useRef<any>(null)
  var [locError, setLocError] = React.useState(false);
  async function getLocation() {
    try {
      var loc = await Location.getCurrentPositionAsync({})
      mapRef.current?.panTo({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      });
      mapRef.current?.setZoom(10);
    } catch(e) {
      setLocError(true);
    }
  }
  React.useEffect(() => {
    setCenter({ lat: props.region.latitude, lng: props.region.longitude });
  }, [props.region.latitude, props.region.longitude]);
  return (
    <LoadScript googleMapsApiKey={key} version={version} libraries={["places"]}>
      <GoogleMap
        zoom={props.zoom ?? 1}
        center={center ?? { lat: props.region.latitude, lng: props.region.longitude }}
        options={{
          streetViewControl: false,
          zoomControl: false,
          scaleControl: true,
          rotateControl: false,
          clickableIcons: false,
          mapTypeControl: false,
          fullscreenControl: false,
          controlSize: 32,
          gestureHandling: "greedy",
          mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
          },
          mapId: theme.style === "dark" ? "1e47783ba0e84c45" : "f5056005d4606f72",
        }}
        mapContainerStyle={{ flex: 1 }}
        onLoad={m => (mapRef.current = m)}
        onCenterChanged={() => {
          const map = mapRef.current;
          if (map) {
            if (center?.lat !== map.center.lat() || center?.lng !== map.center.lng())
              setCenter({
                lat: map.center.lat(),
                lng: map.center.lng(),
              });
            props.onRegionChange?.({
              latitude: map.center.lat(),
              longitude: map.center.lng(),
            });
          }
        }}>
        <Button
          style={{ position: "absolute", top: 8, left: 8 }}
          size="small"
          accessoryLeft={props => <Icon name={true ? "crosshairs-gps" : "crosshairs"} {...props} />}
          onPress={getLocation}
        />
        <Button
          style={{
            position: "absolute",
            bottom: 22,
            right: 8,
          }}
          size="small"
          accessoryLeft={props => <Icon name="minus" {...props} />}
          onPress={() => mapRef.current?.setZoom(mapRef.current?.getZoom() - 1)}
        />
        <Button
          style={{
            position: "absolute",
            bottom: 64,
            right: 8,
          }}
          size="small"
          accessoryLeft={props => <Icon name="plus" {...props} />}
          onPress={() => mapRef.current?.setZoom(mapRef.current?.getZoom() + 1)}
        />
        {/* TODO: Replace Snackbar */}
        {/* <Snackbar visible={locError} onDismiss={() => setLocError(false)} duration={2000}>
          Couldn't retrieve location
        </Snackbar> */}
        <MarkerRenderer {...props} />
        {props.circles?.map(i => (
          <Circle
            radius={i.radius}
            center={{ lat: i.lat, lng: i.lng }}
            options={{
              fillColor: i.fill,
              fillOpacity: 1,
              strokeColor: i.stroke,
              strokeOpacity: 1,
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(WebMap)