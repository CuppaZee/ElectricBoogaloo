import { RouteProp, useRoute } from "@react-navigation/native";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import * as React from "react";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import { UserStackParamList } from "../../types";
import useTitle from "../../hooks/useTitle";
import ZeeOpsOverview from "../../components/ZeeOps/Overview";
import Loading from "../../components/Loading";
import { ScrollView, View } from "react-native";

export default function UserActivityScreen() {
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "ZeeOps">>();
  useTitle(`☕ ${route.params.username} - ZeeOps`);
  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );
  const data = useMunzeeRequest(
    "ops/zeeops/status",
    { user_id: user.data?.data?.user_id || 0 },
    user.data?.data?.user_id !== undefined
  );

  if (!user.data?.data || !data.data?.data || !size) {
    return (
      <Layout
        onLayout={onLayout}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loading data={[user, data]} />
      </Layout>
    );
  }
  return (
    <Layout onLayout={onLayout} style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          width: 800,
          maxWidth: "100%",
          alignSelf: "center",
          padding: 4,
          flexDirection: "row",
          alignItems: "flex-start",
        }}>
        <View style={{ width: "100%", padding: 4 }}>
          <Layout level="3" style={{ borderRadius: 8 }}>
            <ZeeOpsOverview user_id={user.data?.data?.user_id} />
          </Layout>
        </View>
      </ScrollView>
    </Layout>
  );
}
