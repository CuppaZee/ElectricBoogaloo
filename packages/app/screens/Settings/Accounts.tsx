import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { useAtom } from "jotai";
import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import useLogin from "../../hooks/useLogin";
import { useSettings } from "../../hooks/useSettings";
import useTitle from "../../hooks/useTitle";
import { teakensAtom, useTeakens } from "../../hooks/useToken";

export default function AccountsScreen() {
  useTitle("☕ Settings - Accounts");
  const [loading, login, ready] = useLogin();
  const { loaded } = useTeakens();
  const [teakens, setTeakens] = useAtom(teakensAtom);
  const [settings, setSettings] = useSettings();
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignSelf: "center", width: 400, maxWidth: "100%", padding: 4 }}>
        {Object.entries(teakens.data).map(i => (
          <Layout
            level="3"
            style={{
              margin: 4,
              borderRadius: 8,
            }}>
            <View
              style={{
                padding: 8,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Image
                style={{ height: 32, width: 32, borderRadius: 16, marginRight: 8 }}
                source={{
                  uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(
                    i[0]
                  ).toString(36)}.png`,
                }}
              />
              <Text category="h6">{i[1].username}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button
                style={{ margin: 4, flex: 1 }}
                size="small"
                appearance="ghost"
                onPress={login}
                disabled={!ready}
                accessoryLeft={props => <Icon {...props} name="refresh" />}>
                Reauthenticate
              </Button>
              <Button
                style={{ margin: 4, flex: 1 }}
                size="small"
                status="danger"
                appearance="ghost"
                onPress={() => {
                  setTeakens({
                    ...teakens,
                    data: Object.fromEntries(
                      Object.entries(teakens.data).filter(t => t[0] !== i[0])
                    ),
                  });
                  AsyncStorage.setItem(
                    "CUPPAZEE_TEAKENS",
                    JSON.stringify(
                      Object.fromEntries(Object.entries(teakens.data).filter(t => t[0] !== i[0]))
                    )
                  );
                  if (Object.entries(teakens.data).filter(t => t[0] !== i[0]).length === 0) {
                    setSettings({ ...settings, ready: false });
                  }
                }}
                accessoryLeft={props => <Icon {...props} name="logout" />}>
                Logout
              </Button>
            </View>
          </Layout>
        ))}
      </ScrollView>
      <View style={{ width: 400, maxWidth: "100%", padding: 4, alignSelf: "center" }}>
        <Button
          style={{ margin: 4 }}
          onPress={login}
          disabled={!ready}
          accessoryLeft={props => <Icon {...props} name="account-plus" />}>
          Add Account
        </Button>
      </View>
    </Layout>
  );
}
