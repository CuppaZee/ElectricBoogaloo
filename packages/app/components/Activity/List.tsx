import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Button,
  Datepicker,
  Layout,
} from "@ui-kitten/components";
import dayjs from "dayjs";
import * as React from "react";
import { FlatList } from "react-native";
import {
  UserActivityConverterOutput,
} from "./Data";
import UserActivityListItem from "./ListItem";
import UserActivityOverview from "./Overview";
import { UserStackParamList } from "../../types";
import getDateService from "../Common/getDateService";
import { useTranslation } from "react-i18next";
import Icon from "../Common/Icon";

export default function UserActivityList({
  d,
  user_id,
  toggleFilterModal,
}: {
  d: UserActivityConverterOutput;
  user_id: number;
  toggleFilterModal?: () => void;
}) {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<UserStackParamList, "Activity">>();
  const nav = useNavigation<
    StackNavigationProp<UserStackParamList, "Activity">
  >();
  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 8, alignItems: "stretch" }}
      ListHeaderComponent={() => (
        <Layout
          level="3"
          style={{
            margin: 4,
            borderRadius: 4,
            alignSelf: "center",
            width: 1000,
            maxWidth: "100%",
          }}>
          <Datepicker
            date={new Date(route.params.date ? dayjs.mhqParse(route.params.date).valueOf() : dayjs.mhqNow().valueOf())}
            onSelect={nextDate => nav.setParams({ date: dayjs(nextDate.valueOf()).format("YYYY-MM-DD") })}
            accessoryRight={props => <Icon {...props} name="calendar" />}
            dateService={getDateService()}
          />
          {toggleFilterModal && (
            <Button
              onPress={() => toggleFilterModal()}
              size="small"
              appearance="ghost"
              accessoryLeft={props => <Icon {...props} name="filter" />}>
              {t("user_activity:filter_edit")}
            </Button>
          )}
          <UserActivityOverview
            user_id={user_id}
            day={route.params.date ?? dayjs.mhqNow().format("YYYY-MM-DD")}
            activityData={d}
          />
        </Layout>
      )}
      data={d?.list}
      keyExtractor={i => i.key}
      renderItem={data => <UserActivityListItem {...data.item} />}
    />
  );
}