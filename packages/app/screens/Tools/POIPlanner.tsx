import {
  Button,
  Icon,
  Layout,
  Text,
} from "@ui-kitten/components";
import * as React from "react";
import { Linking } from "react-native";
import useTitle from "../../hooks/useTitle";

export default function DonateScreen() {
  useTitle(`☕ POI Planner`);
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ textAlign: "center", maxWidth: "80%" }} category="s1">
        CuppaZee hasn't got a POI Planner yet. Whilst you're waiting for me to develop one, you
        should check out nzseries1's awesome POI Planner!
      </Text>
      <Button
        onPress={() => Linking.openURL("https://munzee.g2.co.nz/poiplanner/")}
        appearance="outline"
        style={{ margin: 4 }}
        accessoryLeft={props => <Icon name="map-marker" {...props} />}>
        nzseries1's POI Planner
      </Button>
    </Layout>
  );
}
