import { RouteProp, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import { UserStackParamList } from "../../types";
import useTitle from "../../hooks/useTitle";
import Loading from "../../components/Loading";
import { Image, ScrollView, View } from "react-native";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import Requirements from "../../components/Clan/Requirements";
import { pickTextColor } from "../../components/Clan/Cell";
import useSetting, { ClanPersonalisationAtom } from "../../hooks/useSetting";
import { useTranslation } from "react-i18next";
import baseURL from "../../baseURL";
import { generateClanRequirements, GameID } from "@cuppazee/utils/lib";
import useDB from "../../hooks/useDB";

export default function UserClanScreen() {
  const { t } = useTranslation();
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "ClanProgress">>();
  const [style] = useSetting(ClanPersonalisationAtom);
  const game_id = new GameID().game_id;
  const nav = useNavigation();
  useTitle(`☕ ${route.params.username} - ${t("pages:user_clan_progress")}`);
  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );
  const data = useCuppaZeeRequest<{ data: { [task_id: number]: number } }>(
    "user/clanprogress",
    {
      user_id: user.data?.data?.user_id,
    },
    user.data?.data?.user_id !== undefined && !user.data?.data?.clan
  );
  const requirements_data = useMunzeeRequest("clan/v2/requirements", {
    clan_id: 1349,
    game_id,
  });

  const db = useDB();

  const requirements = React.useMemo(
    () => generateClanRequirements(db, requirements_data.data?.data),
    [requirements_data.dataUpdatedAt, db]
  );
  
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (user.data?.data?.clan && isFocused) {
      nav.navigate("Clan", {
        screen: "Stats",
        params: { clanid: user.data.data.clan.id },
      });
    }
  }, [user.dataUpdatedAt, isFocused]);

  if (!data.data || !requirements || !size) {
    return (
      <Layout onLayout={onLayout} style={{ flex: 1 }}>
        <Loading data={[data]} />
      </Layout>
    );
  }

  function calculateRequirement(requirement: number) {
    if (!requirements || !data.data) return;
    return (
      [...requirements.tasks.individual[requirement] ?? [], Infinity].findIndex(
        i => i > data.data.data[requirement]
      ) - 1
    );
  }
  const levels: { [key: number]: number | undefined } = {};
  for (const requirement of requirements.all) {
    levels[requirement] = calculateRequirement(requirement);
  }
  return (
    <Layout onLayout={onLayout} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center" }}>
        <View style={{ width: 800, maxWidth: "100%", flexDirection: "row", flexWrap: "wrap" }}>
          {requirements.all.map(requirement => {
            const l = levels[requirement] || -1;
            return (
              <View style={{ width: 300, flexGrow: 1, maxWidth: "100%", padding: 4 }}>
                <Layout
                  level="3"
                  style={{ flexDirection: "row", alignItems: "center", borderRadius: 8 }}>
                  <Image
                    style={{ width: 32, height: 32, margin: 8 }}
                    source={{
                      uri: `${baseURL}/requirements/${requirement}.png`,
                    }}
                  />
                  <View style={{ paddingVertical: 8, flex: 1 }}>
                    <Text category="h6">
                      {db.getClanRequirement(requirement).top} {db.getClanRequirement(requirement).bottom}
                    </Text>
                    <Text category="s1">{data.data.data[requirement].toLocaleString()}</Text>
                  </View>
                  {!!requirements.tasks.individual[requirement] && (
                    <Layout
                      level="4"
                      style={{
                        padding: 8,
                        borderBottomRightRadius: 8,
                        borderTopRightRadius: 8,
                        alignSelf: "stretch",
                        justifyContent: "center",
                        width: 60,
                        borderLeftWidth: style.full_background ? 0 : 4,
                        borderColor: style.colours[l] ?? "#aaaaaa",
                        backgroundColor:
                          (style.colours[l] ?? "#aaaaaa") + (style.full_background ? "" : "22"),
                        alignItems: "center",
                      }}>
                      <Text
                        style={
                          style.full_background
                            ? {
                                color: pickTextColor(style.colours[l] ?? "#aaaaaa"),
                              }
                            : undefined
                        }
                        category="h4">
                        {l === -2 ? "?" : l}
                      </Text>
                    </Layout>
                  )}
                </Layout>
              </View>
            );
          })}
        </View>
        <View style={{ alignSelf: "stretch", padding: 4 }}>
          <Requirements clan_id={1349} game_id={game_id} />
        </View>
      </ScrollView>
    </Layout>
  );
}
