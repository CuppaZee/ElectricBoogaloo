import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Layout, ViewPager } from "@ui-kitten/components";
import * as React from "react";
import { ScrollView, View } from "react-native";
import UserActivityOverview from "../components/Activity/Overview";
import ZeeOpsOverview from "../components/ZeeOps/Overview";
import { useUserBookmarks } from "../hooks/useBookmarks";
import useTitle from "../hooks/useTitle";
import { DashStackParamList, UserStackParamList } from "../types";

export default function DashboardScreen() {
  const nav = useNavigation<StackNavigationProp<DashStackParamList, "Dash">>();
  const route = useRoute<RouteProp<DashStackParamList, "Dash">>();
  const [users] = useUserBookmarks();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  useTitle(`☕ Dashboard`);
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ViewPager
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex((index % users.length) || users.length)}>
          {[null, ...users, null].map((i, ind) => (
            <Layout level="3" style={{ margin: 4, borderRadius: 4 }}>
              {ind === selectedIndex ? (
                <>
                  <UserActivityOverview user_id={Number(i?.user_id)} day="2020-01-13" />
                  <ZeeOpsOverview user_id={Number(i?.user_id)} />
                </>
              ) : (
                <View style={{ height: 400 }} />
              )}
            </Layout>
          ))}
        </ViewPager>
      </ScrollView>
    </Layout>
  );
}