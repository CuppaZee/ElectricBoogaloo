import { RouteProp, useRoute } from "@react-navigation/native";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import * as React from "react";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import { UserStackParamList } from "../../types";
import useTitle from "../../hooks/useTitle";

export default function UserActivityScreen() {
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "Activity">>();  
  useTitle(`☕ ${route.params.username} - Activity - ${dayjs(route.params?.date).format("DD/MM/YYYY")}`);
  const user = useMunzeeRequest("user", { username: route.params?.username }, route.params?.username !== undefined);
  const data = useMunzeeRequest(
    "ops/secret/zeeops/list",
    { user_id: user.data?.data?.user_id },
    user.data?.data?.user_id !== undefined
  );
  
  if (!data.data || !size) {
    return (
      <Layout
        onLayout={onLayout}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Spinner />
      </Layout>
    );
  }
  return (
    <Layout onLayout={onLayout} style={{ flex: 1, flexDirection: "row" }}>
      <Text>{JSON.stringify(data.data, null, 2)}</Text>
    </Layout>
  );
}
