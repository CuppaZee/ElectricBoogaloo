import React from "react";
import { Pack, hierarchy } from "@visx/hierarchy";
import useComponentSize from "../../hooks/useComponentSize";
import { Image, Pressable } from "react-native";
import credits from "./credits.json";
import { Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

export type Datum = {
  username: string;
  type: string;
  user_id: number;
  priority: number;
};

const priorities = {
  supporter: 1,
  major_suggestions: 1.2,
  translator: 1.5,
  dev: 1.7,
  db: 1.5,
};

const pack = {
  children: credits
    .filter((a, b, c) => c.findIndex((i) => i.username === a.username) === b)
    .filter((i) => i.username)
    .map((i) => ({
      ...i,
      priority:
        (priorities[i.type as keyof typeof priorities] || 0) +
        (i.large ? 1 : 0),
    })) as Datum[],
  username: "",
  user_id: 0,
  type: "",
  priority: 0,
};

const root = hierarchy<Datum>(pack)
  .sum((d) => d.priority * d.priority)
  .sort((a, b) => Math.random() < 0.5 ? -1 : 1)
  .sort((a, b) => b.data.priority - a.data.priority);
export type PackProps = {
  width: number;
  height: number;
};

function CreditsCircles({ width, height }: PackProps) {
  const navigation = useNavigation();
  return (
    <Pack<Datum> root={root} size={[width, height]}>
      {(packData) => {
        const circles = packData.descendants().slice(1); // skip outer hierarchies
        return circles.map((circle, i) => (
          <Layout
            level="4"
            style={{
              height: circle.r * 1.8,
              width: circle.r * 1.8,
              position: "absolute",
              left: circle.x - circle.r * 0.9,
              top: circle.y - circle.r * 0.9,
              borderRadius: circle.r * 0.9,
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("User", {
                  screen: "Profile",
                  params: { username: circle.data.username },
                })
              }
            >
              <Image
                key={`circle-${i}`}
                source={{
                  uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${circle.data.user_id.toString(
                    36
                  )}.png`,
                }}
                style={{
                  height: circle.r * 1.8,
                  width: circle.r * 1.8,
                  borderRadius: circle.r * 0.9,
                }}
              />
            </Pressable>
          </Layout>
        ));
      }}
    </Pack>
  );
}

export default function CreditsScreen() {
  const [size, onLayout] = useComponentSize();
  return (
    <Layout style={{ flex: 1 }} onLayout={onLayout}>
      {size && <CreditsCircles width={size.width} height={size.height} />}
    </Layout>
  );
}
