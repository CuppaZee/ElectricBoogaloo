import MapboxGL from "@react-native-mapbox-gl/maps";
import { Button, Layout, Modal, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { View } from "react-native";
import useSetting, { MapStyleAtom } from "../../hooks/useSetting";
import Select from "../Common/Select";
import {
  AutoMapProps,
  LayerProps,
  MapProps,
  SourceProps,
  IconsProps,
  MarkerProps,
  LocationPickerMapProps,
  MapViewport,
} from "./MapTypes";
import type { CamelCase } from "type-fest";
import { MapSearchModal } from "./MapShared";
import Icon from "../Common/Icon";
import * as Location from "expo-location";
import circle from "@turf/circle";

MapboxGL.setAccessToken(
  "pk.eyJ1Ijoic29oY2FoIiwiYSI6ImNqeWVqcm8wdTAxc2MzaXFpa282Yzd2aHEifQ.afYbt2sVMZ-kbwdx5_PekQ"
);

export function LocationPickerMap({
  icon,
  onPositionChange,
  circleRadius,
  circleColor,
}: LocationPickerMapProps) {
  const [viewport, setViewport] = React.useState<MapViewport>();
  return (
    <AutoMap
      onPositionChange={viewport => {
        setViewport(viewport);
        onPositionChange?.(viewport);
      }}>
      <Icons icons={[icon]} />
      {viewport && (
        <Source
          id="locationPicker"
          type="geojson"
          data={{
            type: "Feature",
            geometry: { type: "Point", coordinates: [viewport.longitude, viewport.latitude] },
            properties: {},
          }}>
          <Layer
            id="locationPickerPin"
            type="symbol"
            paint={{}}
            layout={{
              "icon-allow-overlap": true,
              "icon-anchor": "bottom",
              "icon-size": 0.8,
              "icon-image": icon,
            }}
          />
        </Source>
      )}
      {!!viewport && !!circleRadius && !!circleColor && (
        <Source
          id="radius"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: [
              circle([viewport.longitude, viewport.latitude], circleRadius, {
                units: "meters",
                properties: { colour: circleColor },
              }),
            ],
          }}>
          <Layer
            id="radiusFill"
            type="fill"
            paint={{
              "fill-color": ["get", "colour"],
              "fill-opacity": 0.1,
            }}
          />
          <Layer
            id="radiusStroke"
            type="line"
            paint={{
              "line-color": ["get", "colour"],
            }}
          />
        </Source>
      )}
    </AutoMap>
  );
}

export function AutoMap({
  children,
  onPress,
  controls,
  onPositionChange,
  onPositionFinishChange,
  defaultViewport,
}: AutoMapProps) {
  const viewportRef = React.useRef<MapViewport>(
    defaultViewport ?? {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    }
  );
  const [mapStyle, setMapStyle] = useSetting(MapStyleAtom);
  const [searchModal, setSearchModal] = React.useState(false);
  const timeout = React.useRef<any>();
  const theme = useTheme();
  const styleURL =
    mapStyle === "monochrome"
      ? theme.mapboxURL
      : mapStyle === "streets"
      ? "mapbox://styles/mapbox/streets-v11"
      : "mapbox://styles/mapbox/satellite-streets-v9";
  return (
    <View style={{ flex: 1 }}>
      <Map
        key={styleURL}
        styleURL={styleURL}
        viewport={viewportRef.current}
        setViewport={viewport => {
          viewportRef.current = viewport;
          onPositionChange?.(viewport);
          if (timeout.current) clearTimeout(timeout.current);
          timeout.current = setTimeout(() => {
            onPositionFinishChange?.(viewport);
          }, 500);
        }}
        children={children}
        onPress={onPress}
      />
      <Modal
        backdropStyle={{ backgroundColor: "#00000077" }}
        visible={searchModal}
        onBackdropPress={() => setSearchModal(false)}>
        <MapSearchModal
          select={data => {
            if (data.bbox) {
              viewportRef.current?.fitBounds?.(
                [Math.min(data.bbox[0], data.bbox[2]), Math.min(data.bbox[1], data.bbox[3])],
                [Math.max(data.bbox[0], data.bbox[2]), Math.max(data.bbox[1], data.bbox[3])]
              );
            } else {
              viewportRef.current?.setCamera?.({
                centerCoordinate: [data.longitude, data.latitude],
                zoomLevel: 16,
                animationDuration: 300,
              });
            }
            setSearchModal(false);
          }}
        />
      </Modal>
      <Layout
        style={{ position: "absolute", top: 0, right: 0, padding: 4, borderBottomLeftRadius: 8 }}>
        <View style={{ flexDirection: "row" }}>
          <Button
            style={{ margin: 4, flex: 1 }}
            appearance="outline"
            size="small"
            accessoryLeft={({ style, ...props }: any) => (
              <Icon {...props} style={[style, { marginHorizontal: 2 }]} name="magnify" />
            )}
            onPress={() => setSearchModal(true)}>
            Search
          </Button>
          <Button
            style={{ margin: 4, marginLeft: 0 }}
            appearance="outline"
            size="small"
            accessoryLeft={({ style, ...props }: any) => (
              <Icon {...props} style={[style, { marginHorizontal: 2 }]} name="crosshairs-gps" />
            )}
            onPress={async () => {
              var { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== "granted") {
                return;
              }
              try {
                var loc = await Location.getCurrentPositionAsync({});
                viewportRef.current?.setCamera?.({
                  centerCoordinate: [loc.coords.longitude, loc.coords.latitude],
                  zoomLevel: 14,
                  animationDuration: 300,
                });
              } catch (e) {}
            }}
          />
        </View>
        <Select
          style={{ margin: 4, minWidth: 130 }}
          accessoryLeft={({ style, ...props }: any) => (
            <Icon
              {...props}
              style={[style, { transform: [{ scale: 0.8 }], marginHorizontal: 0 }]}
              name="map"
            />
          )}
          accessoryRight={() => null as any}
          size="small"
          value={
            mapStyle === "monochrome" && theme.mapboxURL === "mapbox://styles/mapbox/streets-v11"
              ? "streets"
              : mapStyle
          }
          onValueChange={(value: any) => setMapStyle(value)}
          options={[
            theme.mapboxURL === "mapbox://styles/mapbox/streets-v11"
              ? (null as any)
              : { value: "monochrome", label: "Themed" },
            { value: "streets", label: "Classic" },
            { value: "satellite", label: "Satellite" },
          ].filter(i => i)}
        />
        {controls}
      </Layout>
    </View>
  );
}

export function Map({ viewport, setViewport, children, onPress, styleURL }: MapProps) {
  const mapRef = React.useRef<MapboxGL.MapView | null>(null);
  const cameraRef = React.useRef<MapboxGL.Camera | null>(null);
  return (
    <MapboxGL.MapView
      {...viewport}
      ref={mapRef}
      compassEnabled={true}
      compassViewPosition={0}
      style={{ flex: 1 }}
      onPress={e => {
        console.log(e);
      }}
      onRegionIsChanging={region => {
        setViewport({
          latitude: region.geometry.coordinates[1],
          longitude: region.geometry.coordinates[0],
          zoom: region.properties.zoomLevel,
          getBounds: () => mapRef.current?.getVisibleBounds(),
          setCamera: camera => cameraRef.current?.setCamera(camera),
          fitBounds: (ne, sw) => cameraRef.current?.fitBounds(ne, sw, undefined, 300),
        });
      }}
      onRegionDidChange={region => {
        setViewport({
          latitude: region.geometry.coordinates[1],
          longitude: region.geometry.coordinates[0],
          zoom: region.properties.zoomLevel,
          getBounds: () => mapRef.current?.getVisibleBounds(),
          setCamera: camera => cameraRef.current?.setCamera(camera),
          fitBounds: (ne, sw) => cameraRef.current?.fitBounds(ne, sw, undefined, 300),
        });
      }}
      styleURL={styleURL}>
      <MapboxGL.Camera
        ref={cameraRef}
        animationMode="moveTo"
        defaultSettings={{
          centerCoordinate: [viewport.longitude, viewport.latitude],
          zoomLevel: viewport.zoom,
        }}
      />
      {children}
    </MapboxGL.MapView>
  );
}

export function Source({ children, data, id, ...rest }: SourceProps) {
  if (typeof data !== "string") {
    return (
      <MapboxGL.ShapeSource
        maxZoomLevel={rest.maxzoom}
        cluster={rest.cluster}
        clusterMaxZoomLevel={rest.clusterMaxZoom}
        clusterRadius={rest.clusterRadius}
        shape={data}
        id={id}>
        {React.Children.map(
          children,
          (i?: { props?: { id: string; type: string; minzoom?: number; maxzoom?: number } }) => {
            if (!i) return null;
            if (i.props?.type === "circle") {
              return [
                <MapboxGL.CircleLayer
                  minZoomLevel={i.props.minzoom}
                  maxZoomLevel={i.props.maxzoom}
                  id={i.props.id}
                />,
                <Layer {...(i.props as any)} />,
              ];
            } else if (i.props?.type === "symbol") {
              return [
                <MapboxGL.SymbolLayer
                  minZoomLevel={i.props.minzoom}
                  maxZoomLevel={i.props.maxzoom}
                  id={i.props.id}
                />,
                <Layer {...(i.props as any)} />,
              ];
            } else if (i.props?.type === "heatmap") {
              return [
                <MapboxGL.HeatmapLayer
                  minZoomLevel={i.props.minzoom}
                  maxZoomLevel={i.props.maxzoom}
                  id={i.props.id}
                />,
                <Layer {...(i.props as any)} />,
              ];
            } else if (i.props?.type === "line") {
              return [
                <MapboxGL.LineLayer
                  minZoomLevel={i.props.minzoom}
                  maxZoomLevel={i.props.maxzoom}
                  id={i.props.id}
                />,
                <Layer {...(i.props as any)} />,
              ];
            } else if (i.props?.type === "fill") {
              return [
                <MapboxGL.FillLayer
                  minZoomLevel={i.props.minzoom}
                  maxZoomLevel={i.props.maxzoom}
                  id={i.props.id}
                />,
                <Layer {...(i.props as any)} />,
              ];
            } else if (i.props?.type) {
              console.error("Invalid Layer Type:", i.props?.type);
            }
            return i;
          }
        )?.flat()}
      </MapboxGL.ShapeSource>
    );
  }
  console.error("Invalid Source");
  return null;
}

// type CamelKeys<T> = { [K in keyof T as K extends string ? CamelCase<K> : K]: T[K] };
function kebabToCamel<K extends string>(value: K): any { //CamelCase<K>
  return (value.replace(/-[a-z]/g, a => a[1].toUpperCase()) as any);// as CamelCase<K>;
}
function objectKebabToCamel<T extends { [key: string]: any }>(obj: T): any { //CamelKeys<T>
  return (Object.fromEntries(
    Object.entries(obj).map(i => [kebabToCamel(i[0]), i[1]])
  ) as any);// as CamelKeys<T>;
}

export function Layer(props: LayerProps) {
  if (props.type === "symbol") {
    return (
      <MapboxGL.SymbolLayer
        minZoomLevel={props.minzoom}
        maxZoomLevel={props.maxzoom}
        filter={props.filter as any}
        id={props.id}
        style={objectKebabToCamel(props.layout || {}) as any}
      />
    );
  } else if (props.type === "circle" && "circle-radius" in props.paint) {
    return (
      <MapboxGL.CircleLayer
        minZoomLevel={props.minzoom}
        maxZoomLevel={props.maxzoom}
        filter={props.filter as any}
        id={props.id}
        style={objectKebabToCamel(props.paint)}
      />
    );
  } else if (props.type === "heatmap") {
    return (
      <MapboxGL.HeatmapLayer
        minZoomLevel={props.minzoom}
        maxZoomLevel={props.maxzoom}
        filter={props.filter as any}
        id={props.id}
        style={objectKebabToCamel((props.paint || {}) as any)}
      />
    );
  } else if (props.type === "line") {
    return (
      <MapboxGL.LineLayer
        minZoomLevel={props.minzoom}
        maxZoomLevel={props.maxzoom}
        filter={props.filter as any}
        id={props.id}
        style={objectKebabToCamel(props.paint || {}) as any}
      />
    );
  } else if (props.type === "fill") {
    return (
      <MapboxGL.FillLayer
        minZoomLevel={props.minzoom}
        maxZoomLevel={props.maxzoom}
        filter={props.filter as any}
        id={props.id}
        style={objectKebabToCamel(props.paint || {}) as any}
      />
    );
  }
  return null;
}

export function Icons(props: IconsProps) {
  return (
    <MapboxGL.Images
      images={props.icons.reduce(
        (a, b) => ({
          ...a,
          [b]: { uri: `https://icons.cuppazee.app/64/${b}.png` },
        }),
        {}
      )}
    />
  );
}

export function Marker(props: MarkerProps) {
  return (
    <MapboxGL.PointAnnotation
      id={props.id}
      coordinate={[props.longitude, props.latitude]}
      draggable={props.draggable}
      onDragEnd={(event?: any) => {
        props.onDragEnd?.({
          type: "dragend",
          lngLat: event.geometry.coordinates,
        });
      }}
      anchor={{
        x: 0.5,
        y: 1,
      }}
      onSelected={() => {
        props.onPress?.();
      }}>
      {props.children}
    </MapboxGL.PointAnnotation>
  );
}
