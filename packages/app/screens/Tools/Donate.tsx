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
  useTitle(`☕ Donate`);
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={() => Linking.openURL("https://patreon.com/CuppaZee")}
        appearance="outline"
        style={{ margin: 4 }}
        accessoryLeft={props => <Icon name="patreon" {...props} />}>
        Become a Patron
      </Button>
      <Button
        onPress={() => Linking.openURL("https://ko-fi.com/sohcah")}
        appearance="outline"
        style={{ margin: 4 }}
        accessoryLeft={props => <Icon name="coffee" {...props} />}>
        Buy me a Coffee
      </Button>
      <Text style={{ textAlign: "center", maxWidth: "80%" }} category="s1">
        Donations can also be sent via PayPal to donate@cuppazee.app
      </Text>
      <Text style={{ textAlign: "center", maxWidth: "80%" }} category="c1">
        Please ensure this email address is typed correctly, noting that CuppaZee uses .app, not .com.
      </Text>
    </Layout>
  );
}
