import React from "react";
import TypeImage from "./TypeImage";
import { Button, Layout, Text } from "@ui-kitten/components";
import { View, ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";
import useSetting, { TipsAtom } from "../../hooks/useSetting";
import Icon from "./Icon";

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

export interface TipProps {
  id: string;
  tip: string;
  small?: boolean;
  wrapperStyle?: ViewStyle;
}

export default function Tip({ id, tip, wrapperStyle, small }: TipProps) {
  const { t } = useTranslation();
  const animal = React.useMemo(
    () => babyAnimals[Math.floor(Math.random() * babyAnimals.length)],
    []
  );
  const [tipsViewed, setTipsViewed] = useSetting(TipsAtom);

  if (
    tipsViewed[id]?.count >= 2 ||
    tipsViewed[id]?.time > Date.now() - 432000000
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
              {t("tips:title")}
            </Text>
            <Button
              style={{ height: 24, width: 24 }}
              accessoryLeft={props => <Icon name="close" {...props} />}
              appearance="ghost"
              size="tiny"
              onPress={() =>
                setTipsViewed({
                    ...tipsViewed,
                    [id]: {
                      count: (tipsViewed[id]?.count ?? 0) + 1,
                      time: Date.now()
                    }
                })
              }
            />
          </View>
          <Text category="p1">{t(`tips:${id}` as any)}</Text>
        </View>
      </Layout>
    </View>
  );
}
