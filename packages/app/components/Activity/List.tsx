import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Datepicker,
} from "@ui-kitten/components";
import dayjs from "dayjs";
import * as React from "react";
import { FlatList } from "react-native";
import UserActivityListItem from "./ListItem";
import UserActivityOverview from "./Overview";
import { UserStackParamList } from "../../types";
import getDateService from "../Common/getDateService";
import { useTranslation } from "react-i18next";
import Icon from "../Common/Icon";
import { UserActivityData } from "@cuppazee/utils/lib";
import { Box, Button } from "native-base";

export default function UserActivityList({
  d,
  user_id,
  toggleFilterModal,
}: {
  d: UserActivityData;
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
        <Box
          bg="coolGray.200"
          _dark={{ bg: "coolGray.800" }}
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
              size="sm"
              startIcon={<Icon style={{ height: 24 }} name="filter" />}>
              {t("user_activity:filter_edit")}
            </Button>
          )}
          <UserActivityOverview
            user_id={user_id}
            day={route.params.date ?? dayjs.mhqNow().format("YYYY-MM-DD")}
            activityData={d}
          />
        </Box>
      )}
      data={d?.list}
      keyExtractor={i => i.key}
      renderItem={data => <UserActivityListItem {...data.item} />}
    />
  );
}