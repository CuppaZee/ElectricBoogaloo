import { RouteProp, useRoute } from "@react-navigation/native";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { ToolsStackParamList } from "../../../types";

import SharedStorage from './SharedStorage';

export default function BouncersScreen() {
  const [username, setUsername] = React.useState("");
  const [done, setDone] = React.useState(false);
  const route = useRoute<RouteProp<ToolsStackParamList, "WidgetConfigureActivityWidget">>();
  React.useEffect(() => {
    setUsername("");
    setDone(false);
  }, [route.params.id]);
  if (done) {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h5">Widget Saved</Text>
    </Layout>
  );
  }
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Input
        style={{ margin: 8, width: 400, maxWidth: "100%" }}
        label="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button
        style={{ margin: 8, width: 400, maxWidth: "100%" }}
        onPress={async () => {
          const data = await SharedStorage.get("activity_widget_settings", "{}");
          SharedStorage.set(
            "activity_widget_settings",
            JSON.stringify({ ...JSON.parse(data), [route.params.id]: username })
          );
          setDone(true);
        }}>
        Save
      </Button>
    </Layout>
  );
}
