import { RouteProp, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { gameIDToMonth, monthToGameID } from "../../components/Clan/Data";
import ClanRequirementsTable from "../../components/Clan/Requirements";
import ClanStatsTable from "../../components/Clan/Stats";
import { useSyncScrollViewController } from "../../components/Clan/SyncScrollView";
import Select from "../../components/Common/Select";
import Tip from "../../components/Common/Tip";
import { useClanBookmarks } from "../../hooks/useBookmarks";
import useComponentSize from "../../hooks/useComponentSize";
import useSetting, { ClanPersonalisationAtom } from "../../hooks/useSetting";
import useTitle from "../../hooks/useTitle";
import { ClanStackParamList } from "../../types";

export default function ClanBookmarksScreen() {
  const { t } = useTranslation();
  useTitle(`☕ ${t("pages:clan_bookmarks")}`);
  const [size, onLayout] = useComponentSize();
  const scrollViewController = useSyncScrollViewController();
  const route = useRoute<RouteProp<ClanStackParamList, "Bookmarks">>();
  const nav = useNavigation();
  const game_id = monthToGameID(
    route.params?.year ? Number(route.params.year) : undefined,
    route.params?.month ? Number(route.params.month) - 1 : undefined
  );
  const [style] = useSetting(ClanPersonalisationAtom);
  const [clans] = useClanBookmarks();
  const isFocused = useIsFocused();
  if(!isFocused || !size) return <Layout onLayout={onLayout} style={{ flex: 1 }}></Layout>
  return (
    <Layout onLayout={onLayout} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Tip
          wrapperStyle={{ margin: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}
          id="clan_stats_customisation"
          tip="There are a lot of options to make Clan Stats your own in the Personalisation settings"
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <View
            style={{
              width: (size?.width ?? 0) > 800 ? "50%" : "100%",
            }}>
            <ClanRequirementsTable
              key="requirements"
              clan_id={clans?.[0].clan_id}
              game_id={game_id}
              scrollViewController={style.reverse ? undefined : scrollViewController}
            />
          </View>
          {clans?.map(i => (
            <View
              key={i.clan_id}
              style={{
                width: (size?.width ?? 0) > 800 ? "50%" : "100%",
              }}>
              <ClanStatsTable
                clan_id={i.clan_id}
                game_id={game_id}
                scrollViewController={style.reverse ? undefined : scrollViewController}
              />
            </View>
          ))}
          <View
            key="spacer"
            style={{
              width: (size?.width ?? 0) > 800 ? "50%" : "100%",
            }}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Select
            style={{ margin: 4 }}
            value={game_id.toString()}
            onValueChange={value => {
              nav.setParams({
                year: gameIDToMonth(Number(value)).y,
                month: gameIDToMonth(Number(value)).m + 1,
              });
            }}
            options={new Array(monthToGameID() - 78)
              .fill(0)
              .map((_, i) => {
                const { m, y } = gameIDToMonth(i + 79);
                return {
                  label: dayjs().set("month", m).set("year", y).format("MMMM YYYY"),
                  value: (i + 79).toString(),
                };
              })
              .reverse()}
          />
        </View>
      </ScrollView>
    </Layout>
  );
}
