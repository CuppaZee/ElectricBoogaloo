import { RouteProp, useRoute } from "@react-navigation/native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
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
import { PixelRatio, ScrollView, View } from "react-native";
import TypeImage from "../../components/Common/TypeImage";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Common/Icon";

export default function UserChallengesScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "Challenge">>();
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

  const challenge = d.find(i => i.id === route.params.challenge);
  if (!challenge) return null;

  if (challenge.size === "small")
    return (
      <Layout onLayout={onLayout} style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}>
          {challenge.categories
            .slice()
            .sort((a, b) => b.completion.length - a.completion.length)
            .map(c => (
              <View style={{ width: 80, maxWidth: "100%", flexGrow: 1, padding: 4 }}>
                <Layout
                  level={c.completion.length > 0 ? "3" : "2"}
                  style={{ alignItems: "center", borderRadius: 8 }}>
                  <TypeImage style={{ size: 32, margin: 8 }} icon={c.icon} />
                  <Text numberOfLines={1} style={{ textAlign: "center" }} category="c1">
                    {c.name.includes(":") ? t(c.name as any) : c.name}
                  </Text>
                  <Layout
                    level={c.completion.length > 0 ? "4" : "2"}
                    style={{
                      padding: 2,
                      borderBottomRightRadius: 8,
                      borderBottomLeftRadius: 8,
                      alignSelf: "stretch",
                      justifyContent: "center",
                      height: 32 * PixelRatio.getFontScale() + 2,
                      alignItems: "center",
                    }}>
                    {c.completion.length ? (
                      <Text category="h4">{c.completion.length}</Text>
                    ) : (
                      <Icon
                        style={{ height: 24, width: 24, color: theme["text-basic-color"] }}
                        name="close"
                      />
                    )}
                  </Layout>
                </Layout>
              </View>
            ))}
        </ScrollView>
      </Layout>
    );

  return (
    <Layout onLayout={onLayout} style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>
        {challenge.categories
          .slice()
          .sort((a, b) => b.completion.length - a.completion.length)
          .map(c => (
            <View style={{ width: 300, maxWidth: "100%", flexGrow: 1, padding: 4 }}>
              <Layout
                level={c.completion.length > 0 ? "3" : "2"}
                style={{ flexDirection: "row", alignItems: "center", borderRadius: 8 }}>
                <TypeImage style={{ size: 48, margin: 8 }} icon={c.icon} />
                <View style={{ paddingVertical: 8, flex: 1 }}>
                  <Text category="h6">{c.name.includes(":") ? t(c.name as any) : c.name}</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {c.completion.map(i => (
                      <TypeImage icon={i.pin} style={{ size: 24 }} />
                    ))}
                  </View>
                </View>
                <Layout
                  level={c.completion.length > 0 ? "4" : "2"}
                  style={{
                    padding: 8,
                    borderBottomRightRadius: 8,
                    borderTopRightRadius: 8,
                    alignSelf: "stretch",
                    justifyContent: "center",
                    width: 60,
                    alignItems: "center",
                  }}>
                  <Text category="h4">
                    {c.completion.length || (
                      <Icon
                        style={{ height: 24, width: 24, color: theme["text-basic-color"] }}
                        name="close"
                      />
                    )}
                  </Text>
                </Layout>
              </Layout>
            </View>
          ))}
      </ScrollView>
    </Layout>
  );
}
