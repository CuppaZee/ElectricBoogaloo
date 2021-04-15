import React from "react";
import { Input, Layout, List, ListItem, Text } from "@ui-kitten/components";
import { Image } from "react-native";
import { useQuery } from "react-query";
import useSearch from "../../hooks/useSearch";

interface MapSearchModalProps {
  select: (location: { latitude: number; longitude: number; bbox?: [number, number, number, number] }) => void;
}

export function MapSearchModal({ select }: MapSearchModalProps) {
  const [value, search, onValue] = useSearch(500);
  const query = useQuery(["mapSearch", search], async () => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        search
      )}.json?access_token=pk.eyJ1Ijoic29oY2FoIiwiYSI6ImNqeWVqcm8wdTAxc2MzaXFpa282Yzd2aHEifQ.afYbt2sVMZ-kbwdx5_PekQ`
    );
    return await response.json();
  })
  return (
    <Layout level="4" style={{ borderRadius: 8, padding: 4 }}>
      <Input style={{ margin: 4 }} label="Search" value={value} onChangeText={onValue} />

      <List
        style={{
          height: 400,
          width: 300,
          margin: 4,
          borderRadius: 8,
          maxWidth: "100%",
          flexShrink: 1,
        }}
        data={query.data?.features ?? []}
        renderItem={({ item}) => (
          <ListItem
            style={{ paddingVertical: 4 }}
            title={item.text}
            description={item.context?.map((i: any)=>i.text).join(", ")}
            onPress={() =>
              select({
                latitude: item.center[1],
                longitude: item.center[0],
                bbox: item.bbox,
              })
            }
          />
        )}
      />
    </Layout>
  );
}
