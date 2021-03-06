import {
  Button,
  Icon,
  Layout,
  Text,
} from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import useTitle from "../../hooks/useTitle";

export default function DonateScreen() {
  const { t } = useTranslation();
  useTitle(`☕ ${t("pages:tools_donate")}`);
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={() => Linking.openURL("https://patreon.com/CuppaZee")}
        appearance="outline"
        style={{ margin: 4 }}
        accessoryLeft={props => <Icon name="patreon" {...props} />}>
        {t("donate:patreon")}
      </Button>
      <Button
        onPress={() => Linking.openURL("https://ko-fi.com/sohcah")}
        appearance="outline"
        style={{ margin: 4 }}
        accessoryLeft={props => <Icon name="coffee" {...props} />}>
        {t("donate:kofi")}
      </Button>
      <Text style={{ textAlign: "center", maxWidth: "80%" }} category="s1">
        {t("donate:paypal_title", { email: "donate@cuppazee.app" })}
      </Text>
      <Text style={{ textAlign: "center", maxWidth: "80%" }} category="c1">
        {t("donate:paypal_description")}
      </Text>
    </Layout>
  );
}
