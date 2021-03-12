import { useNavigation } from "@react-navigation/native";
import { Button, Layout, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import Icon from "../components/Common/Icon";
import useTitle from "../hooks/useTitle";

export default function SomewhereWithoutCoffeeScreen() {
  const { t } = useTranslation();
  useTitle(`❌ Coffee Not Found`);
  const theme = useTheme();
  const nav = useNavigation();
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={
          theme.style === "dark"
            ? require("../assets/images/404.png")
            : require("../assets/images/404-light.png")
        }
        style={{ width: 300, height: 100 }}
      />
      <Text category="h1">{t("404:title")}</Text>
      <Text category="h4">{t("404:subtitle")}</Text>
      <Button
        onPress={() => nav.navigate("Root", { screen: "Dashboard" })}
        appearance="outline"
        size="large"
        accessoryLeft={props => <Icon {...props} name="home" />}>
        {t("404:home")}
      </Button>
    </Layout>
  );
}
