import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Layout, Button } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import UserActivityOverview from "../../components/Activity/Overview";
import useTitle from "../../hooks/useTitle";
import { UserStackParamList } from "../../types";

export default function TabOneScreen() {
  const nav = useNavigation<
    StackNavigationProp<UserStackParamList, "Profile">
  >();
  const route = useRoute<RouteProp<UserStackParamList, "Profile">>();
  useTitle(`☕ ${route.params.username} - Profile`);
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Layout level="4" style={{ margin: 4, borderRadius: 4 }}>
          <UserActivityOverview user_id={125914} day="2020-12-18" />
        </Layout>
      </ScrollView>
    </Layout>
  );
}