import * as React from "react";
import { Pressable, StyleSheet, View, Image, Linking, Platform } from "react-native";
import { Button, Layout, Spinner, Text } from "@ui-kitten/components";
import useLogin from "../hooks/useLogin";
import { ScrollView } from "react-native-gesture-handler";
import useTitle from "../hooks/useTitle";
import * as themes from "../themes";
import { useTeakens } from "../hooks/useToken";
import { useNavigation } from "@react-navigation/native";
import useSetting, { ReadyAtom, ThemeAtom } from "../hooks/useSetting";
import { Trans, useTranslation } from "react-i18next";
import Select from "../components/Common/Select";
import { LANGS } from "../lang/i18n";
import Icon from "../components/Common/Icon";
import * as Updates from "expo-updates";

export default function WelcomeScreen() {
  const { t, i18n } = useTranslation();
  const fb =
    window?.navigator?.userAgent &&
    (window.navigator.userAgent.match(/FBAN/) || window.navigator.userAgent.match(/FBAV/));
  const messenger = fb && window.navigator.userAgent.match(/Messenger/);
  const messengeriOS = messenger && window.navigator.userAgent.match(/iOS/);
  useTitle(`☕ ${t("welcome:title")}`);
  const [readySetting, setReadySetting] = useSetting(ReadyAtom);
  const [theme, setTheme] = useSetting(ThemeAtom);
  const [loading, setLoading] = React.useState(false);
  const [, login, ready] = useLogin("");
  const updatesStatusRef = React.useRef<Promise<boolean>>();
  const { data: teakens } = useTeakens();
  
  React.useEffect(() => {
    updatesStatusRef.current = (async function () {
      if(__DEV__ || Platform.OS === "web") return false;
      const hasUpdates = await Updates.checkForUpdateAsync();
      if (hasUpdates.isAvailable) {
        const downloaded = await Updates.fetchUpdateAsync();
        return downloaded.isNew;
      }
      return false;
    })();
  }, []);

  if (readySetting === "2020-03-20") {
    return null;
  }

  if (loading) {
    return <Layout style={[styles.page, { justifyContent: "center", alignItems: "center" }]}>
      <Spinner />
    </Layout>
  }

  return (
    <Layout style={styles.page}>
      <ScrollView
        style={{ flex: 1, alignSelf: "stretch" }}
        contentContainerStyle={{
          alignSelf: "center",
          width: 400,
          maxWidth: "100%",
          padding: 4,
          justifyContent: "center",
          flexGrow: 1,
        }}>
        {fb ? (
          <Layout level="3" style={{ margin: 4, padding: 4, borderRadius: 8 }}>
            <Text category="h6">
              {messenger ? t("welcome:messenger_title") : t("welcome:facebook_title")}
            </Text>
            {messengeriOS ? (
              <Text category="p1">
                <Trans i18nKey="welcome:messenger_ios_description">
                  <Icon name="open-in-new" style={{ height: 24, width: 24 }} />
                </Trans>
              </Text>
            ) : (
              <Text category="p1">
                <Trans i18nKey="welcome:facebook_description">
                  <Icon name="dots-horizontal" style={{ height: 24, width: 24 }} />
                </Trans>
              </Text>
            )}
          </Layout>
        ) : (
          <>
            <Text category="h2" style={{ textAlign: "center" }}>
              {t("welcome:title")}
            </Text>
            <Text category="p1" style={{ textAlign: "center" }}>
              {t("welcome:continuing_policy")}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", alignSelf: "stretch" }}>
              <Button
                style={{ margin: 4, flex: 1 }}
                accessoryLeft={props => <Icon {...props} name="file-document-outline" />}
                appearance="ghost"
                onPress={() => Linking.openURL("https://server.cuppazee.app/terms")}>
                {t("welcome:terms")}
              </Button>
              <Button
                style={{ margin: 4, flex: 1 }}
                accessoryLeft={props => <Icon {...props} name="shield-key-outline" />}
                appearance="ghost"
                onPress={() => Linking.openURL("https://server.cuppazee.app/privacy")}>
                {t("welcome:privacy")}
              </Button>
            </View>
            <Text category="h6" style={{ textAlign: "center", marginTop: 16 }}>
              {t("welcome:theme")}
            </Text>
            <View
              style={{ width: 280, flexDirection: "row", flexWrap: "wrap", alignSelf: "center" }}>
              {Object.entries(themes)
                .filter(i => i[0] !== "generate")
                .map(i => (
                  <Pressable
                    onPress={() => setTheme(i[0] as typeof theme)}
                    style={{ padding: theme === i[0] ? 0 : 4 }}>
                    <View
                      style={{
                        borderRadius: 32,
                        height: theme === i[0] ? 56 : 48,
                        width: theme === i[0] ? 56 : 48,
                        borderWidth: 2,
                        backgroundColor: (i[1] as any)[
                          (i[1] as any).style === "dark" ? "color-basic-800" : "color-basic-200"
                        ],
                      }}
                    />
                  </Pressable>
                ))}
            </View>
            <Text category="h6" style={{ textAlign: "center", marginTop: 16 }}>
              {t("welcome:language")}
            </Text>
            <Select
              style={{ margin: 4 }}
              value={i18n.language}
              onValueChange={value => {
                i18n.changeLanguage(value);
              }}
              options={LANGS.map(i => ({
                value: i[0],
                label: i[1],
              }))}
            />
            <Text category="h6" style={{ textAlign: "center", marginTop: 16 }}>
              {t("welcome:accounts")}
            </Text>
            {Object.entries(teakens).map(i => (
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
              </Layout>
            ))}
            <Button
              style={{ margin: 4 }}
              accessoryLeft={props => <Icon {...props} name="account-plus" />}
              appearance="outline"
              disabled={!ready}
              onPress={login}>
              {Object.keys(teakens).length > 0
                ? t("welcome:add_extra_account")
                : t("welcome:add_account")}
            </Button>
            {Object.keys(teakens).length > -0 && (
              <Button
                style={{ margin: 4 }}
                accessoryLeft={props => <Icon {...props} name="home" />}
                appearance="outline"
                onPress={async () => {
                  setLoading(true);
                  const shouldRestart = await updatesStatusRef.current;
                  await setReadySetting("2020-03-20");
                  if (!__DEV__ && shouldRestart) {
                    await Updates.reloadAsync();
                  }
                  setLoading(false);
                }}>
                {t("welcome:continue")}
              </Button>
            )}
          </>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
  },
});
