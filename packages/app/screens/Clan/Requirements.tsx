import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import dayjs from "dayjs";
import React from "react";
import { ScrollView } from "react-native";
import { gameIDToMonth, monthToGameID } from "../../components/Clan/Data";
import ClanRequirementsTable from "../../components/Clan/Requirements";
import ClanRequirementsList from "../../components/Clan/RequirementsList";
import ClanRewardsTable from "../../components/Clan/Rewards";
import Select from "../../components/Common/Select";
import Tip from "../../components/Common/Tip";
import { ClanStackParamList } from "../../types";

export default function ClanStatsScreen2() {
  const route = useRoute<RouteProp<ClanStackParamList, "Requirements">>();
  const nav = useNavigation();
  const game_id = monthToGameID(
    route.params?.year ? Number(route.params.year) : undefined,
    route.params?.month ? Number(route.params.month) - 1 : undefined
  );
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Tip
          wrapperStyle={{ margin: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}
          id="clan_stats_customisation"
          tip="There are a lot of options to make Clan Stats your own in the Personalisation settings"
        />
        <Select
          style={{ margin: 4 }}
          value={game_id.toString()}
          onValueChange={value => {
            nav.setParams({
              year: gameIDToMonth(Number(value)).y,
              month: gameIDToMonth(Number(value)).m + 1,
            });
          }}
          options={new Array(monthToGameID() - 77).fill(0).map((_, i) => {
            const { m, y } = gameIDToMonth(i + 79);
            return {
              label: dayjs().set("month", m).set("year", y).format("MMMM YYYY"),
              value: (i + 79).toString(),
            };
          }).reverse()}
        />
        <ClanRequirementsTable
          game_id={game_id}
        />
        <ClanRewardsTable game_id={game_id} />
        <ClanRequirementsList
          game_id={game_id}
        />
      </ScrollView>
    </Layout>
  );
}
