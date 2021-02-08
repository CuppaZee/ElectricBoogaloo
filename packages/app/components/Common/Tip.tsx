import React, { PropsWithChildren } from "react";
import TypeImage from "./TypeImage";
import types from "@cuppazee/types";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { View, ViewStyle } from "react-native";
import { useSettings } from "../../hooks/useSettings";

// const babyAnimals = types.types.filter(i => i.name.startsWith("Baby "));
const babyAnimals: [string, string][] = [
  ["babyhippo", "Baby Hippo"],
  ["babyalpaca", "Baby Alpaca"],
  ["babyreindeer", "Baby Reindeer"],
  ["babyfox", "Baby Fox"],
  ["babymoose", "Baby Moose"],
  ["babysquirrel", "Baby Squirrel"],
  ["babynarwhal", "Baby Narwhal"],
  ["babypenguin", "Baby Penguin"],
  ["babycrab", "Baby Crab"],
  ["babyshark", "Baby Shark"],
  ["babyfawn", "Baby Fawn"],
  ["babytiger", "Baby Tiger"],
  ["babylamb", "Baby Lamb"],
  ["babychick", "Baby Chick"],
  ["babybunny", "Baby Bunny"],
];

const messages = [
  // "Heads up!",
  "Here's a quick tip!"
]

export interface TipProps {
  id: string;
  tip: string;
  small?: boolean;
  wrapperStyle?: ViewStyle;
}

export default function Tip({ id, tip, wrapperStyle, small }: TipProps) {
  const animal = React.useMemo(
    () => babyAnimals[Math.floor(Math.random() * babyAnimals.length)],
    []
  );
  const message = React.useMemo(() => messages[Math.floor(Math.random() * messages.length)], []);
  const [settings, setSettings] = useSettings();

  if (
    settings.tips_viewed[id]?.count >= 2 ||
    settings.tips_viewed[id]?.time > Date.now() - 432000000
  )
    return null;
  return (
    <View style={wrapperStyle}>
      <Layout
        level="4"
        style={{
          borderRadius: 8,
          padding: 4,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <TypeImage style={{ size: small ? 32 : 48, marginRight: 8 }} icon={animal[0]} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }} category="s1">
              {message}
            </Text>
            <Button
              style={{ height: 24, width: 24 }}
              accessoryLeft={props => <Icon name="close" {...props} />}
              appearance="ghost"
              size="tiny"
              onPress={() =>
                setSettings({
                  ...settings,
                  tips_viewed: {
                    ...settings.tips_viewed,
                    [id]: {
                      count: (settings.tips_viewed[id]?.count ?? 0) + 1,
                      time: Date.now()
                    }
                  },
                })
              }
            />
          </View>
          <Text category="p1">{tip}</Text>
        </View>
      </Layout>
    </View>
  );
}
