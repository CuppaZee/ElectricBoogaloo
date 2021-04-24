import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Datepicker, Layout, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import * as React from "react";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import { UserStackParamList } from "../../types";
import useTitle from "../../hooks/useTitle";
import { ActivityConverter } from "../../components/Activity/Data";
import ChallengesConverter from "../../components/Challenges/Data";
import useActivity from "../../hooks/useActivity";
import Loading from "../../components/Loading";
import { Pressable, ScrollView, View } from "react-native";
import TypeImage from "../../components/Common/TypeImage";
import { useTranslation } from "react-i18next";
import getDateService from "../../components/Common/getDateService";
import Icon from "../../components/Common/Icon";

export default function UserChallengesScreen() {
  const { t } = useTranslation();
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "Challenges">>();
  const nav = useNavigation();
  useTitle(
    `☕ ${route.params.username} - ${t("pages:user_challenges")} - ${dayjs(
      route.params?.date ?? dayjs.mhqNow()
    ).format("L")}`
  );
  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );
  const data = useActivity(user.data?.data?.user_id, route.params?.date);
  const d = React.useMemo(
    () =>
      data.data?.data
        ? ChallengesConverter(ActivityConverter(data.data?.data, null, { username: "sohcah" }))
        : null,
    [data.dataUpdatedAt]
  );

  if (!data.data || !d || !size) {
    return (
      <Layout onLayout={onLayout} style={{ flex: 1 }}>
        <Loading data={[data]} />
      </Layout>
    );
  }
  return (
    <Layout onLayout={onLayout} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center" }}>
        <View style={{ width: 400, maxWidth: "100%", padding: 4 }}>
          <Datepicker
            date={new Date(dayjs.mhqParse(route.params.date).valueOf() ?? dayjs.mhqNow().valueOf())}
            onSelect={nextDate => nav.setParams({ date: dayjs(nextDate).format("YYYY-MM-DD") })}
            accessoryRight={props => <Icon {...props} name="calendar" />}
            dateService={getDateService()}
          />
        </View>
        {d
          .slice()
          .sort(
            (a, b) =>
              b.categories.filter(i => i.completion.length > 0).length / b.categories.length -
              a.categories.filter(i => i.completion.length > 0).length / a.categories.length
          )
          .map(c => (
            <View style={{ width: 400, maxWidth: "100%", padding: 4 }}>
              <Pressable
                onPress={() => nav.navigate("Challenge", { ...route.params, challenge: c.id })}>
                <Layout
                  level="3"
                  style={{ flexDirection: "row", alignItems: "center", borderRadius: 8 }}>
                  <TypeImage
                    style={{ size: 48, margin: 8 }}
                    icon={c.icon ?? c.categories[0].icon}
                  />
                  <View style={{ paddingVertical: 8, flex: 1 }}>
                    <Text category="h6">{c.name}</Text>
                  </View>
                  <Layout
                    level="4"
                    style={{
                      padding: 8,
                      borderBottomRightRadius: 8,
                      borderTopRightRadius: 8,
                      alignSelf: "stretch",
                      justifyContent: "center",
                      width: 80,
                      alignItems: "center",
                    }}>
                    <Text category="h4">
                      {c.categories.filter(i => i.completion.length > 0).length}
                      <Text category="h6">/{c.categories.length}</Text>
                    </Text>
                  </Layout>
                </Layout>
              </Pressable>
            </View>
          ))}
      </ScrollView>
    </Layout>
  );
}
