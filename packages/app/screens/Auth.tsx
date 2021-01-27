import * as React from "react";
import { StyleSheet, Platform } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Button, Icon, Layout, Spinner, Text } from "@ui-kitten/components";
import { useAtom } from "jotai";
import { teakensAtom } from "../hooks/useToken";
import { MainDrawerParamList } from "../types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
var config_main = {
  redirect_uri: "https://server.cuppazee.app/auth/auth/v1",
  client_id: "91714935879f433364bff187bda66183",
};
// var config_team = {
//   client_id: "c983d59354542f8d15e11924ed61bae6",
//   redirect_uri: "https://server.cuppazee.app/auth/auth/team/v1"
// }
// var config_universal = {
//   client_id: "64f148f57d1d7c62e44a90e5f3661432",
//   redirect_uri: "https://server.cuppazee.app/auth/auth/universal/v1"
// }
var config = config_main;

WebBrowser.maybeCompleteAuthSession({
  skipRedirectCheck: true,
});

const redirectUri = AuthSession.makeRedirectUri({
  native: "uk.cuppazee.paper://login",
  // useProxy,
  path: "login",
});

export default function AuthScreen() {
  const [teakens, setTeakens] = useAtom(teakensAtom);
  const nav = useNavigation<DrawerNavigationProp<MainDrawerParamList, "Auth">>();

  const [loading, setLoading] = React.useState<any>(false);
  const [redirect, setRedirect] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (Platform.OS !== "web") {
      WebBrowser.warmUpAsync();
      return () => {
        WebBrowser.coolDownAsync();
      };
    }
  });

  async function login() {
    setLoading(true);
    const response = await WebBrowser.openAuthSessionAsync(
      `https://api.munzee.com/oauth?client_id=${encodeURIComponent(
        config.client_id
      )}&redirect_uri=${encodeURIComponent(
        config.redirect_uri
      )}&response_type=code&scope=read&state=${encodeURIComponent(
        JSON.stringify({
          redirect: redirectUri,
          platform: Platform.OS,
        })
      )}`,
      redirectUri
    );
    if (response.type !== "success") {
      setLoading(false);
    } else {
      const params = Object.fromEntries(
        response.url
          .split("?")?.[1]
          .split("&")
          .map(i => i.split("=").map(i => decodeURIComponent(i))) ?? []
      );
      if (!params?.teaken) return setLoading(false);
      setTeakens({
        ...teakens,
        data: {
          ...teakens.data,
          [params.user_id]: {
            username: params.username,
            teaken: params.teaken,
          },
        },
      });
      AsyncStorage.setItem(
        "CUPPAZEE_TEAKENS",
        JSON.stringify({
          ...teakens.data,
          [params.user_id]: {
            username: params.username,
            teaken: params.teaken,
          },
        })
      );
      setRedirect(params.username);
      setLoading(false);
    }
  }
  if (redirect && Object.keys(teakens.data).length > 0) {
    setRedirect("");
    nav.navigate("User", { screen: "Profile", params: { username: redirect } } as any);
  }
  if (loading === true) {
    <Layout style={styles.page}>
      <Spinner />
    </Layout>;
  }
  return (
    <Layout style={styles.page}>
      <Text category="h1">Welcome</Text>
      <Button
        accessoryLeft={props => <Icon {...props} name="map-marker" />}
        appearance="outline"
        onPress={() => login()}>
        Log in with Munzee
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
