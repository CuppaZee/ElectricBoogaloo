import mapboxgl, { Expression } from "mapbox-gl";
import { Expression as NativeExpression, Transition } from "@react-native-mapbox-gl/maps";
import type { Position } from "geojson";
import * as React from "react";

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  getBounds?(): Promise<Position[]> | undefined;
  setCamera?(camera: {
    centerCoordinate: [number, number];
    zoomLevel: number;
    animationDuration: number;
  }): void;
  fitBounds?(ne: number[], sw: number[]): void;
}

export interface MapEvent {
  type: string;
  point?: [x: number, y: number];
  lngLat: [longitude: number, latitude: number];
  features?: Array<any>;
}

export interface LocationPickerMapProps {
  icon: string;
  onPositionChange?(viewport: MapViewport): void;
  onPositionFinishChange?(viewport: MapViewport): void;
  defaultViewport?: MapViewport;
  circleRadius?: number;
  circleColor?: string;
}

export interface AutoMapProps {
  onPositionChange?(viewport: MapViewport): void;
  onPositionFinishChange?(viewport: MapViewport): void;
  defaultViewport?: MapViewport;
  children?: any;
  controls?: any;
  onPress?(event: MapEvent): void;
}

export interface MapProps {
  children?: any;
  onPress?(event: MapEvent): void;
  styleURL?: string;
  viewport: MapViewport;
  setViewport(viewport: MapViewport): void;
}

export interface SourceProps {
  id: string;
  type: string;
  url?: string;
  tiles?: string[];
  tileSize?: number;
  bounds?: number[];
  scheme?: "xyz" | "tms";
  minzoom?: number;
  maxzoom?: number;
  attribution?: string;
  encoding?: "terrarium" | "mapbox";
  data?: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string;
  buffer?: number;
  tolerance?: number;
  cluster?: boolean;
  clusterRadius?: number;
  clusterProperties?: object;
  clusterMaxZoom?: number;
  lineMetrics?: boolean;
  generateId?: boolean;
  coordinates?: number[][];
  urls?: string[];
  children?: any;
}

// export type RemoveStyleFunction<O extends { [key: string]: any }> = {
//   [K in keyof O]: (number | Transition | (Expression & NativeExpression)) & O[K];
// };

export type RemoveStyleFunction<O extends { [key: string]: any }> = {
  [K in keyof O]:
    | (Expression extends O[K] ? NativeExpression & Expression : undefined)
    | (Transition extends O[K] ? Transition : undefined)
    | (number extends O[K] ? number : undefined)
    | (string extends O[K] ? string : undefined)
    | (undefined extends O[K] ? undefined : undefined);
};

export interface LayerProps {
  id: string;
  type:
    | "fill"
    | "line"
    | "symbol"
    | "circle"
    | "fill-extrusion"
    | "raster"
    | "background"
    | "heatmap"
    | "hillshade"
    | "sky";
  source?: string;
  "source-layer"?: string;
  beforeId?: string;
  layout?: mapboxgl.AnyLayout;
  paint: RemoveStyleFunction<
    | mapboxgl.BackgroundPaint
    | mapboxgl.FillPaint
    | mapboxgl.FillExtrusionPaint
    | mapboxgl.LinePaint
    | mapboxgl.SymbolPaint
    | mapboxgl.RasterPaint
    | mapboxgl.CirclePaint
    | mapboxgl.HeatmapPaint
    | mapboxgl.HillshadePaint
  >;
  filter?: any[];
  minzoom?: number;
  maxzoom?: number;
  ref?: React.Ref<LayerProps>;
}

export interface IconsProps {
  icons: string[];
}

export interface MarkerProps {
  id: string;
  draggable?: boolean;
  onDrag?(evt: MapEvent): void;
  onDragEnd?(evt: MapEvent): void;
  onDragStart?(evt: MapEvent): void;
  onPress?(): void;
  offsetLeft?: number;
  offsetTop?: number;
  className?: string;
  longitude: number;
  latitude: number;
  children?: any;
}
