import { RouteProp, useRoute } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { CubimalsIcon } from "../../components/Cubimals/Icon";
import Loading from "../../components/Loading";
import useComponentSize from "../../hooks/useComponentSize";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useTitle from "../../hooks/useTitle";
import { UserStackParamList } from "../../types";

export default function UserCubimalsScreen() {
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "Cubimals">>();
  useTitle(`☕ ${route.params.username} - Cubimals`);
  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );
  const data = useMunzeeRequest(
    "user/cubimals",
    {
      method: "get"
    },
    user.data?.data?.user_id !== undefined,
    user.data?.data?.user_id
  );

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
        <View style={{ flexGrow: 1, width: 400, maxWidth: "100%", padding: 4 }}>
          <Layout level="3" style={{ borderRadius: 8, padding: 4 }}>
            <Text category="h5" style={{ textAlign: "center" }}>
              Cubimals
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}>
              {data.data?.data
                ?.map(t => (
                  <CubimalsIcon name={t.name} count={t.collected} icon={t.logo.slice(53, -4)} />
                ))}
            </View>
          </Layout>
        </View>
      </ScrollView>
    </Layout>
  );
}
