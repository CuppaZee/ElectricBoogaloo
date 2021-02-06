import { RouteProp, useRoute } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { ScrollView, View } from "react-native";
import { monthToGameID } from "../../components/Clan/Data";
import ClanRequirementsTable from "../../components/Clan/Requirements";
import ClanStatsTable from "../../components/Clan/Stats";
import { useSyncScrollViewController } from "../../components/Clan/SyncScrollView";
import Tip from "../../components/Common/Tip";
import { useClanBookmarks } from "../../hooks/useBookmarks";
import useComponentSize from "../../hooks/useComponentSize";
import { useSettings } from "../../hooks/useSettings";
import useTitle from "../../hooks/useTitle";
import { ClanStackParamList } from "../../types";

export default function ClanBookmarksScreen() {
  useTitle("☕ Bookmarked Clans");
  const [size, onLayout] = useComponentSize();
  const scrollViewController = useSyncScrollViewController();
  const route = useRoute<RouteProp<ClanStackParamList, "Bookmarks">>();
  const game_id = monthToGameID(
    route.params?.year ? Number(route.params.year) : undefined,
    route.params?.month ? Number(route.params.month) - 1 : undefined
  );
  const [settings] = useSettings();
  const [clans] = useClanBookmarks();
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
              scrollViewController={settings.clan_reverse ? undefined : scrollViewController}
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
                scrollViewController={settings.clan_reverse ? undefined : scrollViewController}
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
      </ScrollView>
    </Layout>
  );
}
