import { Input, Layout, ListItem, Text } from "@ui-kitten/components";
import * as React from "react";
import { FlatList } from "react-native";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useTitle from "../../hooks/useTitle";
import TypeImage from "../../components/Common/TypeImage";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import useDB from "../../hooks/useDB";

export default function BouncersExpiringScreen() {
  const { t } = useTranslation();
  const db = useDB();
  useTitle(`☕ Bouncing Soon`);
  const bouncers = useCuppaZeeRequest<{
    data: any;
    endpointsDown: { label: string; endpoint: string }[];
  }>("bouncers/expiring", {}, true, undefined, undefined, {
    refetchInterval: 300000,
    keepPreviousData: true,
  });
  const [player, setPlayer] = React.useState("");
  const [type, setType] = React.useState("");
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  });
  const nav = useNavigation();
  const typeS = type.toLowerCase().replace(/\s/g, "");
  const playerS = player.toLowerCase().replace(/\s/g, "");

  return (
    <Layout style={{ padding: 4, flex: 1 }}>
      {bouncers.data?.endpointsDown
        .filter(i => i.endpoint.startsWith("/munzee/specials"))
        .map(endpoint => (
          <Layout style={{ margin: 4, width: "100%" }}>
            <Layout
              level="2"
              style={{
                padding: 4,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Text category="h6" style={{ textAlign: "center", maxWidth: "100%" }}>
                CuppaZee is currently unable to get data for {endpoint.label} from Munzee. These
                bouncers may not show on this page.
              </Text>
            </Layout>
          </Layout>
        ))}
      <Input
        style={{ margin: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}
        label={t("search:player")}
        value={player}
        onChangeText={value => setPlayer(value)}
      />
      <Input
        style={{ margin: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}
        label={t("search:type")}
        value={type}
        onChangeText={value => setType(value)}
      />
      <FlatList
        style={{
          flex: 1,
          width: 400,
          maxWidth: "100%",
          alignSelf: "center",
          margin: 4,
          borderRadius: 8,
        }}
        windowSize={2}
        data={
          bouncers.data?.data
            .filter((i: any) => i[2] * 1000 > Date.now() && i[2] * 1000 < Date.now() + 300000)
            .sort((a: any, b: any) => a[2] - b[2])
            .filter((i: any) => !type || i[1].includes(typeS))
            .filter((i: any) => !player || i[6]?.toLowerCase().includes(playerS)) ?? []
        }
        keyExtractor={i => i[4].toString()}
        renderItem={({ item, index }) => (
          <ListItem
            accessoryLeft={() => <TypeImage style={{ size: 32 }} icon={item[1]} />}
            title={item[5] ? `${item[5]} by ${item[6]}` : db.getType(item[1])?.name ?? item[1]}
            description={`${Math.floor((item[2] - now / 1000) / 60)}:${(
              Math.floor(item[2] - now / 1000) % 60
            )
              .toString()
              .padStart(2, "0")}`}
            onPress={() => {
              nav.navigate("Tools", {
                screen: "Munzee",
                params: {
                  a: item[3],
                },
              });
            }}
          />
        )}
      />
    </Layout>
  );
}
