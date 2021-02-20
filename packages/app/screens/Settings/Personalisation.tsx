import { Button, CheckBox, Icon, Layout, Radio, RadioGroup, Text } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import { CommonCell, pickTextColor } from "../../components/Clan/Cell";
import { requirementMeta } from "../../components/Clan/Data";
import ColourPicker from "../../components/Common/ColourPicker";
import { Settings, useSettings } from "../../hooks/useSettings";
import useTitle from "../../hooks/useTitle";

import * as themes from "../../themes";
import { UpdateWrapper } from "./Notifications";

function MockTitle({ settings }: { settings: Settings }) {
  return (
    <CommonCell
      settings={settings}
      type="title"
      image={{
        uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${(1349).toString(36)}.png`,
      }}
      title="The Cup of Coffee Clan"
      subtitle="#28"
    />
  );
}

const mockUsers: [string, number, number][] = [
  ["boompa", 75621, 3],
  ["sohcah", 125914, 2],
];

function MockUser({ settings, n }: { settings: Settings; n: number }) {
  const { t } = useTranslation();
  return (
    <CommonCell
      settings={settings}
      type={settings.clan_reverse ? "header_stack" : "header"}
      color={mockUsers[n][2]}
      image={{
        uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${mockUsers[n][1].toString(
          36
        )}.png`,
      }}
      title={mockUsers[n][0]}
      subtitle={t("clan:level", { level: mockUsers[n][2] })}
    />
  );
}

function MockGroupTotal({ settings }: { settings: Settings }) {
  const { t } = useTranslation();
  return (
    <CommonCell
      settings={settings}
      type={settings.clan_reverse ? "header_stack" : "header"}
      color={1}
      icon="shield-half-full"
      title={t("clan:group_total")}
      subtitle={t("clan:level", { level: 1 })}
    />
  );
}

const mockData: [number, string, number, number, number, number][] = [
  [3, "boompa", 75621, 3, 18, 4],
  [3, "sohcah", 125914, 2, 17, 3],
  [3, "Clan Total", 0, 1, 17, -1],
  [31, "boompa", 75621, 3, 251, 3],
  [31, "sohcah", 125914, 2, 130, 2],
  [31, "Clan Total", 0, 1, 381, 4],
  [28, "boompa", 75621, 3, 530, -1],
  [28, "sohcah", 125914, 2, 250, -1],
  [28, "Clan Total", 0, 1, 780, 1],
];

function MockData({ settings, n }: { settings: Settings; n: number }) {
  const { t } = useTranslation();

  const m = mockData[n];

  if (settings.clan_style === 0) {
    return (
      <CommonCell
        settings={settings}
        type="data"
        color={m[5]}
        icon={settings.clan_reverse || m[2] ? undefined : "shield-half-full"}
        image={
          settings.clan_reverse || m[2]
            ? {
                uri: !settings.clan_reverse
                  ? `https://munzee.global.ssl.fastly.net/images/avatars/ua${m[2].toString(36)}.png`
                  : requirementMeta[m[0]]?.icon,
              }
            : undefined
        }
        title={
          settings.clan_reverse
            ? `${requirementMeta[m[0]]?.top} ${requirementMeta[m[0]]?.bottom}`
            : m[2]
            ? m[1]
            : t("clan:group_total")
        }
        subtitle={m[4].toLocaleString() ?? "🚫"}
      />
    );
  }

  return (
    <CommonCell
      settings={settings}
      type="data"
      color={m[5]}
      title={m[4].toLocaleString() ?? "🚫"}
    />
  );
}

function MockRequirement({ settings, n }: { settings: Settings; n: number }) {
  return (
    <CommonCell
      settings={settings}
      type={settings.clan_reverse ? "header" : "header_stack"}
      color={n === 1 ? 11 : n === 31 ? 12 : 13}
      image={{ uri: requirementMeta[n]?.icon }}
      title={requirementMeta[n]?.top}
      subtitle={requirementMeta[n]?.bottom}
    />
  );
}

function MockTable({ settings }: { settings: Settings }) {
  const { t } = useTranslation();
  if (settings.clan_reverse) {
    return (
      <View style={{ flexDirection: "row" }}>
        {settings.clan_style !== 0 && (
          <View style={{ flex: 1 }}>
            <MockTitle settings={settings} />
            <MockRequirement settings={settings} n={1} />
            <MockRequirement settings={settings} n={31} />
            <MockRequirement settings={settings} n={28} />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <MockUser settings={settings} n={0} />
          {[0, 3, 6].map(n => (
            <MockData settings={settings} n={n} />
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <MockUser settings={settings} n={1} />
          {[1, 4, 7].map(n => (
            <MockData settings={settings} n={n} />
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <MockGroupTotal settings={settings} />
          {[2, 5, 8].map(n => (
            <MockData settings={settings} n={n} />
          ))}
        </View>
      </View>
    );
  }
  return (
    <View style={{ flexDirection: "row" }}>
      {settings.clan_style !== 0 && (
        <View style={{ flex: 1 }}>
          <MockTitle settings={settings} />
          {[0, 1].map(i => (
            <MockUser settings={settings} n={i} />
          ))}
          <MockGroupTotal settings={settings} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <MockRequirement settings={settings} n={1} />
        {[0, 1, 2].map(n => (
          <MockData settings={settings} n={n} />
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <MockRequirement settings={settings} n={31} />
        {[3, 4, 5].map(n => (
          <MockData settings={settings} n={n} />
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <MockRequirement settings={settings} n={28} />
        {[6, 7, 8].map(n => (
          <MockData settings={settings} n={n} />
        ))}
      </View>
    </View>
  );
}

const clan_colours = ["0", "1", "2", "3", "4", "5", null, null, null, null, null, "I", "B", "G"];

export default function PersonalisationScreen() {
  useTitle("☕ Settings - Personalisation");
  const [storedSettings, setStoredSettings] = useSettings();
  const [settings, setSettings] = React.useState<Settings>();
  const [saved, setSaved] = React.useState(false);
  const [clanColourSelect, setClanColourSelect] = React.useState<number>();
  React.useEffect(() => {
    setSettings({ ...storedSettings });
  }, [storedSettings]);
  if (!settings) return null;
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignSelf: "center",
          width: 1000,
          maxWidth: "100%",
          padding: 4,
          flexDirection: "row",
          flexWrap: "wrap",
        }}>
        <View style={{ width: 400, flexGrow: 1, maxWidth: "100%", padding: 4 }}>
          <Layout level="2" style={{ margin: 4, padding: 4, flex: 1, borderRadius: 8 }}>
            <Text style={{ margin: 4 }} category="h6">
              Theme
            </Text>
            <View
              style={{ width: 280, flexDirection: "row", flexWrap: "wrap", alignSelf: "center" }}>
              {Object.entries(themes).map(i => (
                <Pressable
                  onPress={() =>
                    setStoredSettings({
                      ...storedSettings,
                      theme: i[0] as typeof storedSettings.theme,
                    })
                  }
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
          </Layout>
        </View>

        <View style={{ width: 400, flexGrow: 1, maxWidth: "100%", padding: 4 }}>
          <Layout level="2" style={{ margin: 4, padding: 4, flex: 1, borderRadius: 8 }}>
            <Text style={{ margin: 4 }} category="h6">
              Clan Stats
            </Text>
            <CheckBox
              style={{ margin: 8 }}
              checked={settings.clan_reverse}
              onChange={checked => setSettings({ ...settings, clan_reverse: checked })}>
              Reverse Columns/Rows
            </CheckBox>
            <CheckBox
              disabled={settings.clan_style === 0}
              style={{ margin: 8 }}
              checked={settings.clan_single_line}
              onChange={checked => setSettings({ ...settings, clan_single_line: checked })}>
              Single Line Cells
            </CheckBox>
            <CheckBox
              style={{ margin: 8 }}
              checked={settings.clan_full_background}
              onChange={checked => setSettings({ ...settings, clan_full_background: checked })}>
              Full Colour Background
            </CheckBox>
            <Text category="s1">Style</Text>
            <RadioGroup
              style={{ margin: 8 }}
              selectedIndex={settings.clan_style}
              onChange={index => setSettings({ ...settings, clan_style: index })}>
              <Radio disabled={settings.clan_single_line}>Large</Radio>
              <Radio>Comfortable</Radio>
              <Radio>Compact</Radio>
            </RadioGroup>
            <Text category="s1">Colours</Text>

            <UpdateWrapper>
              {update => (
                <>
                  <View
                    style={{
                      width: 340,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignSelf: "center",
                    }}>
                    {clan_colours.map((i, n) =>
                      i ? (
                        <Pressable onPress={() => setClanColourSelect(n)} style={{ padding: 4 }}>
                          <View
                            style={{
                              borderRadius: 32,
                              height: 48,
                              width: 48,
                              borderWidth: 2,
                              backgroundColor: settings.clan_colours[n],
                              justifyContent: "center",
                              alignItems: "center",
                            }}>
                            <Text
                              style={{
                                textAlignVertical: "center",
                                textAlign: "center",
                                color: pickTextColor(settings.clan_colours[n]),
                              }}
                              category="h2">
                              {i}
                            </Text>
                          </View>
                        </Pressable>
                      ) : null
                    )}
                  </View>
                  {clanColourSelect !== undefined && (
                    <View style={{ alignSelf: "center" }}>
                      <ColourPicker
                        colour={settings.clan_colours[clanColourSelect]}
                        setColour={colour => {
                          settings.clan_colours[clanColourSelect] = colour;
                          update();
                        }}
                      />
                    </View>
                  )}
                </>
              )}
            </UpdateWrapper>
            <Text category="s1">Preview</Text>
            <MockTable settings={settings} />
          </Layout>
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
          <Layout level="3" style={{ margin: 4, borderRadius: 8, padding: 4 }}>
            <Text category="h6">
              <Icon name="check" style={{ height: 24, width: 24 }} /> Settings Saved
            </Text>
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
