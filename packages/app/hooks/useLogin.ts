import * as React from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useAtom } from "jotai";
import { teakensAtom, useTeakens } from "../hooks/useToken";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserBookmarks } from "./useBookmarks";
const configs = {
  main: {
    redirect_uri: "https://server.cuppazee.app/auth/auth/v1",
    client_id: "91714935879f433364bff187bda66183",
  },
  dev: {
    redirect_uri: "http://nextserver.cuppazee.app/auth/auth/v1",
    client_id: "628ed7ab83b0a6f59674f1bf04e4afa2",
  },
  team: {
    client_id: "c983d59354542f8d15e11924ed61bae6",
    redirect_uri: "https://server.cuppazee.app/auth/auth/team/v1",
  },
  universal: {
    client_id: "64f148f57d1d7c62e44a90e5f3661432",
    redirect_uri: "https://server.cuppazee.app/auth/auth/universal/v1",
  },
};

WebBrowser.maybeCompleteAuthSession({
  skipRedirectCheck: true,
});

export default function useLogin(
  path: string,
  shouldRedirect?: boolean,
  application: keyof typeof configs = "main"
) {
  const redirectUri =
    Platform.OS === "web"
      ? [window.location.origin, path].filter(Boolean).join("/")
      : `uk.cuppazee.paper://${path}`;

  var config = configs[application];
  const { loaded } = useTeakens();
  const [teakens, setTeakens] = useAtom(teakensAtom);
  const nav = useNavigation();
  const [users, setUsers] = useUserBookmarks();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [redirect, setRedirect] = React.useState<string | null>(null);

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

      if (!users.some(i => i.user_id === params.user_id)) {
        setUsers([...users, { user_id: params.user_id, username: params.username }]);
        AsyncStorage.setItem(
          "USER_BOOKMARKS",
          JSON.stringify([...users, { user_id: params.user_id, username: params.username }])
        );
      }

      setRedirect(params.username);
      setLoading(false);
    }
  }
  if (shouldRedirect && redirect && Object.keys(teakens.data).length > 0) {
    setRedirect("");
    nav.navigate("User", { screen: "Profile", params: { username: redirect } } as any);
  }

  return [loading, login, loaded && !loading] as const;
}
