import { RouteProp, useRoute } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { ScrollView } from "react-native";
import { monthToGameID } from "../../components/Clan/Data";
import ClanRequirementsTable from "../../components/Clan/Requirements";
import ClanStatsTable from "../../components/Clan/Stats";
import { useSyncScrollViewController } from "../../components/Clan/SyncScrollView";
import Tip from "../../components/Common/Tip";
import { useSettings } from "../../hooks/useSettings";
import { ClanStackParamList } from "../../types";

export default function ClanStatsScreen2() {
  const [settings] = useSettings();
  const scrollViewController = useSyncScrollViewController();
  const route = useRoute<RouteProp<ClanStackParamList, "Stats">>();
  const game_id = monthToGameID(
    route.params.year ? Number(route.params.year) : undefined,
    route.params.month ? Number(route.params.month) - 1 : undefined
  );
  const clan_id = Number(route.params.clanid);
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Tip
          wrapperStyle={{ margin: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}
          id="clan_stats_customisation"
          tip="There are a lot of options to make Clan Stats your own in the Personalisation settings"
        />
        <ClanStatsTable
          clan_id={clan_id}
          game_id={game_id}
          scrollViewController={settings.clan_reverse ? undefined : scrollViewController}
        />
        <ClanRequirementsTable
          clan_id={clan_id}
          game_id={game_id}
          scrollViewController={settings.clan_reverse ? undefined : scrollViewController}
        />
      </ScrollView>
    </Layout>
  );
}
