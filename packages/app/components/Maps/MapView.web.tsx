import React from "react";
import { MapProps } from "./MapView";
import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { getTypeImage } from "../Common/TypeImage";
import { useTheme } from "@ui-kitten/components";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic29oY2FoIiwiYSI6ImNqeWVqcm8wdTAxc2MzaXFpa282Yzd2aHEifQ.afYbt2sVMZ-kbwdx5_PekQ";

function WebMap(props: MapProps) {
  const mapContainerRef = React.useRef<HTMLDivElement | null>();
  const mapRef = React.useRef<mapboxgl.Map>();
  const markers = React.useRef<Map<string, any>>(new Map());

  const [lng, setLng] = React.useState(props.longitude);
  const [lat, setLat] = React.useState(props.latitude);
  React.useEffect(() => {
    setLng(props.longitude);
    setLat(props.latitude);
  }, [props.longitude, props.latitude]);
  const [zoom, setZoom] = React.useState(props.zoom || 0.1);
  const [satellite, setSatellite] = React.useState(false);

  const theme = useTheme();
  React.useEffect(() => {
    mapRef.current?.setStyle(
      `mapbox://styles/mapbox/${
        satellite ? "satellite-streets-v11" : theme.style === "dark" ? "dark-v10" : "streets-v11"
      }`
    );
  }, [theme.style, satellite]);

  function placeMarkers() {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const features = map.querySourceFeatures("markers");
    const keepMarkers: Set<string> = new Set();

    for (let i = 0; i < features.length; i++) {
      const geometry = features[i].geometry;
      if (geometry.type !== "Point") continue;
      const coords = geometry.coordinates;
      const props = features[i].properties;
      const featureID = props?.id;

      if (props?.cluster) {
      } else if (markers.current?.has(featureID?.toString() || "")) {
        //Feature marker is already on screen
        keepMarkers.add(featureID?.toString() || "");
      } else {
        //Feature is not clustered and has not been created, create an icon for it
        const el = new Image();
        const img = getTypeImage(props?.icon);
        el.src = typeof img === "object" && "uri" in img ? img.uri : img;
        el.className = "mapMarker";
        el.style.width = "48px";
        el.style.height = "48px";
        el.style.marginTop = "-24px";
        el.dataset.type = props?.type;
        if(props?.munzee) el.addEventListener("click", function () {
          props.nav?.navigate("Tools", {
            screen: "Munzee",
            params: {a: props.munzee}
          })
        })
        const marker = new mapboxgl.Marker(el).setLngLat([coords[0], coords[1]]);
        marker.addTo(map);
        keepMarkers.add(featureID?.toString() || "");
        markers.current?.set(featureID?.toString() || "", el);
      }
    }

    //Let's clean-up any old markers. Loop through all markers
    markers.current?.forEach((value, key, map) => {
      //If marker exists but is not in the keep array
      if (!keepMarkers.has(key)) {
        //Remove it from the page
        value.remove();
        //Remove it from markers map
        map.delete(key);
      }
    });
  }

  React.useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${
        satellite ? "satellite-streets-v11" : theme.style === "dark" ? "dark-v10" : "streets-v11"
      }`,
      center: [lng, lat],
      zoom: zoom ?? 0,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: map,
      }),
      "top-left"
    );

    map.on("move", () => {
      setLng(Number(map.getCenter().lng.toFixed(4)));
      setLat(Number(map.getCenter().lat.toFixed(4)));
      setZoom(Number(map.getZoom().toFixed(2)));
      const markers = map.getSource("markers");
      if (markers?.type === "geojson") {
        markers.setData({
          type: "FeatureCollection",
          features: (props.markers ?? []).map(i => ({
            type: "Feature",
            id: `${i.id}_${Date.now()}`,
            properties: {
              id: `${i.id}_${Date.now()}`,
              icon: i.icon,
              center: "center" in i,
              munzee: i.munzee,
            },
            geometry: {
              type: "Point",
              coordinates:
                "center" in i ? [map.getCenter().lng, map.getCenter().lat] : [i.lng, i.lat],
            },
          })),
        });
        placeMarkers();
      }
    });

    map.on("moveend", () => {
      props.onRegionChange?.({
        latitude: map.getCenter().lat,
        longitude: map.getCenter().lng
      })
    })

    map.on("load", () => {
      map.addSource("markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: (props.markers ?? []).map(i => ({
            type: "Feature",
            id: i.id,
            properties: {
              id: i.id,
              icon: i.icon,
              center: "center" in i,
            },
            geometry: {
              type: "Point",
              coordinates: "center" in i ? [lng, lat] : [i.lng, i.lat],
            },
          })),
        },
        cluster: props.cluster ? true : false,
        clusterMaxZoom: props.clusterMaxZoomLevel ?? 10,
        clusterRadius: props.clusterRadius ?? 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "markers",
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
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
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "markers",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.on("data", function (e) {
        if (e.sourceId !== "markers" || !e.isSourceLoaded) return;
        map.on("moveend", placeMarkers);
        map.on("boxzoomend", placeMarkers);
        map.on("pitchend", placeMarkers);
        placeMarkers();
      });

      // inspect a cluster on click
      map.on("click", "clusters", function (e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        var clusterId = features[0].properties?.cluster_id;
        (map.getSource("markers") as GeoJSONSource).getClusterExpansionZoom(
          clusterId,
          function (err, zoom) {
            if (err) return;

            map.easeTo({
              center:
                features[0].geometry.type === "Point"
                  ? (features[0].geometry.coordinates as [number, number])
                  : [0, 0],
              zoom: zoom,
            });
          }
        );
      });
    });

    mapRef.current = map;
    return () => void mapRef.current?.stop();
  }, []);

  React.useEffect(() => {
    placeMarkers();
  }, [props.markers]);

  return <div style={{ display: "flex", flex: 1 }} ref={ref => (mapContainerRef.current = ref)} />;
}

export default React.memo(WebMap);
