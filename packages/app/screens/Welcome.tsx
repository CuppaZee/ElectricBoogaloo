import * as React from "react";
import { Pressable, StyleSheet, View, Image, Linking } from "react-native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import useLogin from "../hooks/useLogin";
import { ScrollView } from "react-native-gesture-handler";
import useTitle from "../hooks/useTitle";
import * as themes from "../themes";
import { useTeakens } from "../hooks/useToken";
import { useNavigation } from "@react-navigation/native";
import useSetting, { ReadyAtom, ThemeAtom } from "../hooks/useSetting";

export default function WelcomeScreen() {
  const fb =
    window?.navigator?.userAgent &&
    (window.navigator.userAgent.match(/FBAN/) || window.navigator.userAgent.match(/FBAV/));
  const messenger = fb && window.navigator.userAgent.match(/Messenger/);
  const messengeriOS = messenger && window.navigator.userAgent.match(/iOS/);
  useTitle("☕ Welcome");
  const [readySetting, setReadySetting] = useSetting(ReadyAtom);
  const [theme, setTheme] = useSetting(ThemeAtom);
  const [, login, ready] = useLogin("");
  const nav = useNavigation();
  const { data: teakens } = useTeakens();

  if (readySetting === "2020-02-12") {
    nav.navigate("Dashboard");
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
              CuppaZee isn't supported in the {messenger ? "Messenger" : "Facebook"} Browser
            </Text>
            {messengeriOS ? (
              <Text category="p1">
                You can press the <Icon name="open-in-new" style={{ height: 24, width: 24 }} /> Menu
                icon in the bottom right corner and press "Open in Safari" button to view CuppaZee
                in a supported browser.
              </Text>
            ) : (
              <Text category="p1">
                You can press the <Icon name="dots-horizontal" style={{ height: 24, width: 24 }} />{" "}
                Menu icon in the top right corner and press "Open in Browser" button to view
                CuppaZee in a supported browser.
              </Text>
            )}
          </Layout>
        ) : (
          <>
            <Text category="h2" style={{ textAlign: "center" }}>
              Welcome to CuppaZee
            </Text>
            <Text category="p1" style={{ textAlign: "center" }}>
              By continuing to use this application, you agree to our Terms & Service and Privacy Policy as linked below.
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", alignSelf: "stretch" }}>
              <Button
                style={{ margin: 4, flex: 1 }}
                accessoryLeft={props => <Icon {...props} name="file-document-outline" />}
                appearance="ghost"
                onPress={() => Linking.openURL("https://server.cuppazee.app/terms")}>
                Terms & Conditions
              </Button>
              <Button
                style={{ margin: 4, flex: 1 }}
                accessoryLeft={props => <Icon {...props} name="shield-key-outline" />}
                appearance="ghost"
                onPress={() => Linking.openURL("https://server.cuppazee.app/privacy")}>
                Privacy Policy
              </Button>
            </View>
            <Text category="h6" style={{ textAlign: "center", marginTop: 16 }}>
              Pick a Theme
            </Text>
            <View
              style={{ width: 280, flexDirection: "row", flexWrap: "wrap", alignSelf: "center" }}>
              {Object.entries(themes).map(i => (
                <Pressable
                  onPress={() => setTheme(i[0] as typeof theme)}
                  style={{ padding: theme === i[0] ? 0 : 4 }}>
                  <View
                    style={{
                      borderRadius: 32,
                      height: theme === i[0] ? 56 : 48,
                      width: theme === i[0] ? 56 : 48,
                      borderWidth: 2,
                      backgroundColor:
                        i[1][i[1].style === "dark" ? "color-basic-800" : "color-basic-200"],
                    }}
                  />
                </Pressable>
              ))}
            </View>
            <Text category="h6" style={{ textAlign: "center", marginTop: 16 }}>
              Select your Language
            </Text>
            <Text category="c1" style={{ textAlign: "center" }}>
              Language Selector coming soon
            </Text>
            <Text category="h6" style={{ textAlign: "center", marginTop: 16 }}>
              Add Accounts
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
              {`Add${Object.keys(teakens).length > 0 ? " Another" : ""} Account`}
            </Button>
            {Object.keys(teakens).length > -0 && (
              <Button
                style={{ margin: 4 }}
                accessoryLeft={props => <Icon {...props} name="home" />}
                appearance="outline"
                onPress={() => {
                  setReadySetting("2020-02-12");
                }}>
                Continue to Dashboard
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
