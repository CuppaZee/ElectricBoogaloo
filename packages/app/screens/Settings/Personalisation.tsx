import { Button, CheckBox, Icon, Layout, Radio, RadioGroup, Text } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import { CommonCell, pickTextColor } from "../../components/Clan/Cell";
import { requirementMeta } from "../../components/Clan/Data";
import ColourPicker from "../../components/Common/ColourPicker";
import useSetting, { ClanPersonalisationAtom, ThemeAtom } from "../../hooks/useSetting";
import useTitle from "../../hooks/useTitle";

import * as themes from "../../themes";
import { UpdateWrapper } from "./Notifications";

type ClanStyle = typeof ClanPersonalisationAtom["init"]["data"];
function MockTitle({ settings }: { settings: ClanStyle }) {
  return (
    <CommonCell
      clanStyle={settings}
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

function MockUser({ settings, n }: { settings: ClanStyle; n: number }) {
  const { t } = useTranslation();
  return (
    <CommonCell
      clanStyle={settings}
      type={settings.reverse ? "header_stack" : "header"}
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

function MockGroupTotal({ settings }: { settings: ClanStyle }) {
  const { t } = useTranslation();
  return (
    <CommonCell
      clanStyle={settings}
      type={settings.reverse ? "header_stack" : "header"}
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

function MockData({ settings, n }: { settings: ClanStyle; n: number }) {
  const { t } = useTranslation();

  const m = mockData[n];

  if (settings.style === 0) {
    return (
      <CommonCell
        clanStyle={settings}
        type="data"
        color={m[5]}
        icon={settings.reverse || m[2] ? undefined : "shield-half-full"}
        image={
          settings.reverse || m[2]
            ? {
                uri: !settings.reverse
                  ? `https://munzee.global.ssl.fastly.net/images/avatars/ua${m[2].toString(36)}.png`
                  : `https://server.cuppazee.app/requirements/${m[0]}.png`,
              }
            : undefined
        }
        title={
          settings.reverse
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
      clanStyle={settings}
      type="data"
      color={m[5]}
      title={m[4].toLocaleString() ?? "🚫"}
    />
  );
}

function MockRequirement({ settings, n }: { settings: ClanStyle; n: number }) {
  return (
    <CommonCell
      clanStyle={settings}
      type={settings.reverse ? "header" : "header_stack"}
      color={n === 1 ? 11 : n === 31 ? 12 : 13}
      image={{ uri: `https://server.cuppazee.app/requirements/${n}.png` }}
      title={requirementMeta[n]?.top}
      subtitle={requirementMeta[n]?.bottom}
    />
  );
}

function MockTable({ settings }: { settings: ClanStyle }) {
  const { t } = useTranslation();
  if (settings.reverse) {
    return (
      <View style={{ flexDirection: "row" }}>
        {settings.style !== 0 && (
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
      {settings.style !== 0 && (
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
  const [storedClanSettings, setStoredClanSettings] = useSetting(ClanPersonalisationAtom);
  const [clanSettings, setClanSettings] = React.useState<ClanStyle>();
  const [theme, setTheme] = useSetting(ThemeAtom);
  const [saved, setSaved] = React.useState(false);
  const [clanColourSelect, setClanColourSelect] = React.useState<number>();
  React.useEffect(() => {
    setClanSettings({ ...storedClanSettings });
  }, [storedClanSettings]);
  if (!clanSettings) return null;
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
          </Layout>
        </View>

        <View style={{ width: 400, flexGrow: 1, maxWidth: "100%", padding: 4 }}>
          <Layout level="2" style={{ margin: 4, padding: 4, flex: 1, borderRadius: 8 }}>
            <Text style={{ margin: 4 }} category="h6">
              Clan Stats
            </Text>
            <CheckBox
              style={{ margin: 8 }}
              checked={clanSettings.reverse}
              onChange={checked => setClanSettings({ ...clanSettings, reverse: checked })}>
              Reverse Columns/Rows
            </CheckBox>
            <CheckBox
              disabled={clanSettings.style === 0}
              style={{ margin: 8 }}
              checked={clanSettings.single_line}
              onChange={checked => setClanSettings({ ...clanSettings, single_line: checked })}>
              Single Line Cells
            </CheckBox>
            <CheckBox
              style={{ margin: 8 }}
              checked={clanSettings.full_background}
              onChange={checked => setClanSettings({ ...clanSettings, full_background: checked })}>
              Full Colour Background
            </CheckBox>
            <Text category="s1">Style</Text>
            <RadioGroup
              style={{ margin: 8 }}
              selectedIndex={clanSettings.style}
              onChange={index => setClanSettings({ ...clanSettings, style: index })}>
              <Radio disabled={clanSettings.single_line}>Large</Radio>
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
                              backgroundColor: clanSettings.colours[n],
                              justifyContent: "center",
                              alignItems: "center",
                            }}>
                            <Text
                              style={{
                                textAlignVertical: "center",
                                textAlign: "center",
                                color: pickTextColor(clanSettings.colours[n]),
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
                        colour={clanSettings.colours[clanColourSelect]}
                        setColour={colour => {
                          clanSettings.colours[clanColourSelect] = colour;
                          update();
                        }}
                      />
                    </View>
                  )}
                </>
              )}
            </UpdateWrapper>
            <Text category="s1">Preview</Text>
            <MockTable settings={clanSettings} />
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
            if (clanSettings) setStoredClanSettings(clanSettings);
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
