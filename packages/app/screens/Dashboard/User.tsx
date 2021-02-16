import { useNavigation } from "@react-navigation/native";
import { Icon, Layout, Text, DrawerItem } from "@ui-kitten/components";
import dayjs from "dayjs";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import UserActivityOverview from "../../components/Activity/Overview";
import ZeeOpsOverview from "../../components/ZeeOps/Overview";
import useTitle from "../../hooks/useTitle";
import { DashCardProps } from "./Dashboard";

export default function UserDashCard({
  item,
  index,
  touched,
}: DashCardProps<{ username: string; user_id: string }>) {
  const { t } = useTranslation();
  const nav = useNavigation();
  useTitle(`☕ Dashboard`);
  return (
    <Layout level="3" style={[styles.card, { flex: 1 }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 4,
          justifyContent: "center",
        }}>
        <Image
          style={{ height: 32, width: 32, borderRadius: 16, marginRight: 8 }}
          source={{
            uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(
              item.user_id
            ).toString(36)}.png`,
          }}
        />
        <Text category="h5">{item.username}</Text>
      </View>
      {touched.includes(index) ? (
        <>
          <UserActivityOverview
            user_id={Number(item?.user_id)}
            day={dayjs.mhqNow().format("YYYY-MM-DD")}
          />
          <ZeeOpsOverview user_id={Number(item?.user_id)} />
        </>
      ) : null}
      <DrawerItem
        style={{ backgroundColor: "transparent" }}
        selected={false}
        title={() => (
          <Text style={{ flex: 1, marginLeft: 4 }} category="s1">
            {t("pages:user_activity")}
          </Text>
        )}
        accessoryLeft={props => <Icon name="calendar" {...props} />}
        onPress={() =>
          nav.navigate("User", {
            screen: "Activity",
            params: { username: item.username },
          })
        }
      />
      <Text category="c1">More buttons coming here soon :D</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  card: { margin: 4, borderRadius: 4 },
});
