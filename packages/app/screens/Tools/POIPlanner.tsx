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
  useTitle(`☕ ${t("pages:tools_poiplanner")}`);
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ textAlign: "center", maxWidth: "80%" }} category="s1">
        {t("poi_planner:missing")}
      </Text>
      <Button
        onPress={() => Linking.openURL("https://munzee.g2.co.nz/poiplanner/")}
        appearance="outline"
        style={{ margin: 4 }}
        accessoryLeft={props => <Icon name="map-marker" {...props} />}>
        {t("poi_planner:nzseries1")}
      </Button>
    </Layout>
  );
}
