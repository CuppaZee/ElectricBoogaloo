import { RouteProp, useRoute } from "@react-navigation/native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { ScrollView, View } from "react-native";
import TypeImage from "../../components/Common/TypeImage";
import Loading from "../../components/Loading";
import useComponentSize from "../../hooks/useComponentSize";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useTitle from "../../hooks/useTitle";
import { UserStackParamList } from "../../types";

export default function UserCubimalsScreen() {
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "QRates">>();
  useTitle(`☕ ${route.params.username} - QRates`);
  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );
  const data = useMunzeeRequest(
    "qrates",
    {
      method: "get"
    },
    user.data?.data?.user_id !== undefined,
    user.data?.data?.user_id
  );
  const theme = useTheme();

  if (!data.isFetched || !size) {
    return (
      <Layout onLayout={onLayout} style={{ flex: 1 }}>
        <Loading data={[data]} />
      </Layout>
    );
  }
  return (
    <Layout onLayout={onLayout} style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>
        {data.data?.data?.qrates.map(q => (
          <View style={{ flexGrow: 1, width: 300, maxWidth: "100%", padding: 4 }}>
            <Layout level="3" style={{ borderRadius: 8, padding: 4, alignItems: "center" }}>
              <TypeImage icon={q.logo.slice(51, -4)} style={{ size: 128 }} iconSize={128} />
              <Text category="h5" style={{ textAlign: "center" }}>
                {q.name}
              </Text>
              <Text category="s1" style={{ textAlign: "center" }}>
                {q.description}
              </Text>
              <Text category="s2" style={{ textAlign: "center" }}>
                Found: {dayjs.mhqParse(q.time_found).local().format("L LTS")} (Local)
              </Text>
              <Text category="s2" style={{ textAlign: "center" }}>
                QRowbars Used: {q.qrowbars_used}/3
              </Text>

              <Layout level="4" style={{ borderRadius: 8, alignSelf: "stretch", marginTop: 4 }}>
                <LinearGradient
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                  locations={[0, q.progress / q.goal, q.progress / q.goal + 0.0001, 2]}
                  colors={[
                    theme["text-success-color"] + "66",
                    theme["text-success-color"] + "66",
                    "transparent",
                    "transparent",
                  ]}
                  style={{
                    padding: 4,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme["border-basic-color-1"],
                  }}>
                  <Text category="s1" style={{ textAlign: "center" }}>
                    {q.progress}/{q.goal}
                  </Text>
                </LinearGradient>
              </Layout>
            </Layout>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
}
