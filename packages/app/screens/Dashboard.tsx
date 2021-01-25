import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Layout } from "@ui-kitten/components";
import * as React from "react";
import { ScrollView } from "react-native";
import UserActivityOverview from "../components/Activity/Overview";
import ZeeOpsOverview from "../components/ZeeOps/Overview";
import useTitle from "../hooks/useTitle";
import { UserStackParamList } from "../types";

export default function DashboardScreen() {
  const nav = useNavigation<
    StackNavigationProp<UserStackParamList, "Profile">
  >();
  const route = useRoute<RouteProp<UserStackParamList, "Profile">>();
  useTitle(`☕ Dashboard`);
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Layout level="3" style={{ margin: 4, borderRadius: 4 }}>
          <UserActivityOverview user_id={125914} day="2020-01-13" />
        </Layout>
        <Layout level="3" style={{ margin: 4, borderRadius: 4 }}>
          <ZeeOpsOverview user_id={125914} />
        </Layout>
      </ScrollView>
    </Layout>
  );
}