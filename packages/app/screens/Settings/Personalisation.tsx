import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Settings, useSettings } from "../../hooks/useSettings";
import useTitle from "../../hooks/useTitle";

import * as themes from "../../themes";

export default function PersonalisationScreen() {
  useTitle("☕ Settings - Personalisation");
  const [storedSettings, setStoredSettings] = useSettings();
  const [settings, setSettings] = React.useState<Settings>();
  const [saved, setSaved] = React.useState(false);
  React.useEffect(() => {
    setSettings({ ...storedSettings });
  }, [storedSettings]);
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignSelf: "center", width: 600, maxWidth: "100%", padding: 4 }}>
        <View style={{ width: 280, flexDirection: "row", flexWrap: "wrap", alignSelf: "center" }}>
          {Object.entries(themes).map(i => (
            <Pressable
              onPress={() => setSettings({ ...settings, theme: i[0] as typeof storedSettings.theme })}
              style={{ padding: settings?.theme === i[0] ? 0 : 4 }}>
              <View
                style={{
                  borderRadius: 32,
                  height: settings?.theme === i[0] ? 56 : 48,
                  width: settings?.theme === i[0] ? 56 : 48,
                  borderWidth: 2,
                  backgroundColor:
                    i[1][i[1].style === "dark" ? "color-basic-800" : "color-basic-200"],
                }}
              />
            </Pressable>
          ))}
        </View>
        {/* <Input
          style={{ margin: 8, width: 400, maxWidth: "100%" }}
          label="Username"
          value={settings}
          onChangeText={setUsername}
        /> */}
      </ScrollView>
      <View style={{ width: 600, maxWidth: "100%", padding: 4, alignSelf: "center" }}>
        {saved && (
          <Layout
            level="3"
            style={{ margin: 4, borderRadius: 8, padding: 4 }}>
            <Text category="h6"><Icon name="check" style={{ height: 24, width: 24 }} /> Settings Saved</Text>
          </Layout>
        )}
        <Button
          style={{ margin: 4 }}
          onPress={async () => {
            if (settings) setStoredSettings(settings);
            setSaved(true);
            setTimeout(() => {
              setSaved(false);
            }, 5000);
          }}
          accessoryLeft={props => <Icon {...props} name="content-save" />}>
          Save
        </Button>
      </View>
    </Layout>
  );
}
