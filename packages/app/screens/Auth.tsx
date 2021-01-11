import * as React from "react";
import { StyleSheet, Platform } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Button, Icon, Layout, Spinner, Text } from "@ui-kitten/components";
import { useAtom } from "jotai";
import { teakensAtom } from "../hooks/useToken";
import { MainDrawerParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
var config_main = {
  redirect_uri: 'https://server.cuppazee.app/auth/auth/v1',
  client_id: '91714935879f433364bff187bda66183'
}
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

const useProxy = Platform.OS === "ios";

const redirectUri = AuthSession.makeRedirectUri({
  native: "cuppazee://login",
  useProxy,
  path: "login",
});

export default function AuthScreen() {
  const [teakens, setTeakens] = useAtom(teakensAtom);
  const nav = useNavigation<
    DrawerNavigationProp<MainDrawerParamList, "Auth">
  >();

  const discovery = {
    authorizationEndpoint: 'https://api.munzee.com/oauth',
    tokenEndpoint: 'https://api.munzee.com/oauth/login',
  };

  const [loading, setLoading] = React.useState<any>(false);
  const [redirect, setRedirect] = React.useState<string | null>(null);

  // Create and load an auth request
  const [request, result, promptAsyncc] = AuthSession.useAuthRequest(
    {
      clientId: config.client_id,
      scopes: ['read'],
      redirectUri: config.redirect_uri,
      state: JSON.stringify({
        redirect: redirectUri,
        platform: Platform.OS
      })
    },
    discovery
  );
  function promptAsync(options: { useProxy: boolean; returnUrl?: string }) {
    setLoading(true);
    promptAsyncc(options);
  }

  React.useEffect(() => {
    if (result) {
      const response: {
        params?: any;
      } & AuthSession.AuthSessionResult = result;
      (async function () {
        if(!response.params || !response.params.teaken) return setLoading(false);
        setTeakens({
          ...teakens,
          data: {
            ...teakens.data,
            [response.params.user_id]: {
              username: response.params.username,
              teaken: response.params.teaken
            }
          }
        })
        AsyncStorage.setItem('CUPPAZEE_TEAKENS', JSON.stringify({
          ...teakens.data,
          [response.params.user_id]: {
            username: response.params.username,
            teaken: response.params.teaken
          }
        }));
        setRedirect(response.params.username);
        setLoading(false);
      })();
    }
  }, [result]);
  if(redirect && Object.keys(teakens.data).length > 0) {
    setRedirect("");
    nav.navigate('User', {screen: "Profile", params: {username: redirect}} as any);
  }
  if (loading === true) {
    <Layout style={styles.page}>
      <Spinner />
    </Layout>
  }
  return (
    <Layout style={styles.page}>
      <Text category="h1">Welcome</Text>
      <Button
        accessoryLeft={(props) => (
          <Icon {...props} name="map-marker" />
        )}
        appearance="outline"
        disabled={!request}
        onPress={() => promptAsync({
          useProxy,
          returnUrl: redirectUri
        })}
      >
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
