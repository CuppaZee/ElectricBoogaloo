import { Button, CheckBox, Layout, Modal, Radio, RadioGroup, Text } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import { CommonCell, pickTextColor } from "../../components/Clan/Cell";
import ColourPicker from "../../components/Common/ColourPicker";
import Icon from "../../components/Common/Icon";
import Select from "../../components/Common/Select";
import useDB from "../../hooks/useDB";
import useModalSafeArea from "../../hooks/useModalSafeArea";
import useSetting, { ClanPersonalisationAtom, ThemeAtom } from "../../hooks/useSetting";
import useTitle from "../../hooks/useTitle";
import { LANGS } from "../../lang/i18n";

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

  const db = useDB();

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
            ? `${db.getClanRequirement(m[0]).top} ${db.getClanRequirement(m[0]).bottom}`
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
  const db = useDB();
  return (
    <CommonCell
      clanStyle={settings}
      type={settings.reverse ? "header" : "header_stack"}
      color={n === 1 ? 11 : n === 31 ? 12 : 13}
      image={{ uri: `https://server.cuppazee.app/requirements/${n}.png` }}
      title={db.getClanRequirement(n).top}
      subtitle={db.getClanRequirement(n).bottom}
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

const clan_colours = ["0", "1", "2", "3", "4", "5", "6", null, null, null, null, "I", "B", "G"];

function ClanPersonalisation({
  clanSettings,
  setClanSettings,
  title,
}: {
  title?: string;
  clanSettings: ClanStyle;
  setClanSettings: (value: ClanStyle) => void;
}) {
  const { t } = useTranslation();
  const [clanColourSelect, setClanColourSelect] = React.useState<number>();
  return (
    <>
      <Text style={{ margin: 4 }} category="h6">
        {title || t("dashboard:clans")}
      </Text>
      <CheckBox
        style={{ margin: 8 }}
        checked={clanSettings.reverse}
        onChange={checked => setClanSettings({ ...clanSettings, reverse: checked })}>
        {t("settings_personalisation:clan_reverse")}
      </CheckBox>
      <CheckBox
        disabled={clanSettings.style === 0}
        style={{ margin: 8 }}
        checked={clanSettings.single_line}
        onChange={checked => setClanSettings({ ...clanSettings, single_line: checked })}>
        {t("settings_personalisation:clan_single_line")}
      </CheckBox>
      <CheckBox
        style={{ margin: 8 }}
        checked={clanSettings.full_background}
        onChange={checked => setClanSettings({ ...clanSettings, full_background: checked })}>
        {t("settings_personalisation:clan_full_background")}
      </CheckBox>
      <Text category="s1">{t("settings_personalisation:clan_style")}</Text>
      <RadioGroup
        style={{ margin: 8 }}
        selectedIndex={clanSettings.style}
        onChange={index => setClanSettings({ ...clanSettings, style: index })}>
        <Radio disabled={clanSettings.single_line}>
          {t("settings_personalisation:clan_style_0")}
        </Radio>
        <Radio>{t("settings_personalisation:clan_style_1")}</Radio>
        <Radio>{t("settings_personalisation:clan_style_2")}</Radio>
      </RadioGroup>
      <Text category="s1">{t("settings_personalisation:clan_colours")}</Text>

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
      <Text category="s1">{t("settings_personalisation:clan_preview")}</Text>
      <MockTable settings={clanSettings} />
    </>
  );
}

export function ClanPersonalisationModal() {
  const [clanSettings, setClanSettings] = useSetting(ClanPersonalisationAtom);
  const modalSafeArea = useModalSafeArea();
  if (clanSettings.edited) return null;
  return (
    <Modal visible={true} backdropStyle={{ backgroundColor: "#0007" }}>
      <Layout level="3" style={[modalSafeArea, { width: 350, borderRadius: 8 }]}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={{ margin: 4 }} category="h4">
            Welcome to Clan Stats
          </Text>
          <Text style={{ margin: 4 }} category="s1">
            If you want a more classic look, check "Single Line Cells" and "Full Colour Background".
          </Text>
          <ClanPersonalisation
            title="Personalisation"
            clanSettings={clanSettings}
            setClanSettings={setClanSettings}
          />
          <Text style={{ margin: 4 }} category="s1">
            You can change this at any time in the Personalisation Settings
          </Text>
          <Button
            style={{ margin: 4 }}
            onPress={() => setClanSettings({ ...clanSettings, edited: true })}
            appearance="outline">
            Done
          </Button>
        </ScrollView>
      </Layout>
    </Modal>
  );
}

export default function PersonalisationScreen() {
  const { t, i18n } = useTranslation();
  useTitle(`☕ ${t("pages:settings")} - ${t("pages:settings_personalisation")}`);
  const [storedClanSettings, setStoredClanSettings] = useSetting(ClanPersonalisationAtom);
  const [clanSettings, setClanSettings] = React.useState<ClanStyle>();
  const [theme, setTheme] = useSetting(ThemeAtom);
  const [saved, setSaved] = React.useState(false);
  const themeRef = React.useRef("");
  React.useEffect(() => {
    setClanSettings({ ...storedClanSettings });
  }, [storedClanSettings]);
  React.useEffect(() => {
    themeRef.current = theme;
  }, [theme]);
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
          <Layout level="3" style={{ margin: 4, padding: 4, flex: 1, borderRadius: 8 }}>
            <Text style={{ margin: 4 }} category="h6">
              {t("settings_personalisation:theme")}
            </Text>

            <UpdateWrapper>
              {update => (
                <>
                  <View
                    style={{
                      width: 280,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignSelf: "center",
                    }}>
                    {Object.entries(themes)
                      .filter(i => i[0] !== "generate")
                      .map(i => (
                        <Pressable
                          onPress={() => { themeRef.current = i[0] as typeof theme; setTheme(i[0] as typeof theme) }}
                          style={{ padding: theme === i[0] ? 0 : 4 }}>
                          <View
                            style={{
                              borderRadius: 32,
                              height: theme === i[0] ? 56 : 48,
                              width: theme === i[0] ? 56 : 48,
                              borderWidth: 2,
                              backgroundColor: (i[1] as any)[
                                (i[1] as any).style === "dark"
                                  ? "color-basic-800"
                                  : "color-basic-200"
                              ],
                            }}
                          />
                        </Pressable>
                      ))}
                    <Button
                      appearance="outline"
                      onPress={() => {
                        if (theme in themes) {
                          themeRef.current = "#ABF2BE";
                        } else {
                          themeRef.current = themeRef.current.startsWith("$")
                            ? themeRef.current.slice(1)
                            : themeRef.current;
                        }
                        setTheme(themeRef.current);
                      }}
                      style={{ margin: 4, width: 132 }}>
                      Custom Light
                    </Button>
                    <Button
                      appearance="outline"
                      onPress={() => {
                        if (theme in themes) {
                          themeRef.current = "$#063824";
                        } else {
                          themeRef.current = themeRef.current.startsWith("$")
                            ? themeRef.current
                            : "$" + themeRef.current;
                        }
                        setTheme(themeRef.current);
                      }}
                      style={{ margin: 4, width: 132 }}>
                      Custom Dark
                    </Button>
                  </View>
                  {themeRef.current.includes("#") && (
                    <View style={{ alignSelf: "center" }}>
                      <ColourPicker
                        colour={
                          themeRef.current.startsWith("$")
                            ? themeRef.current.slice(1)
                            : themeRef.current
                        }
                        setColour={colour => {
                          update();
                          themeRef.current = themeRef.current.startsWith("$")
                            ? `$${colour}`
                            : colour;
                        }}
                      />
                      <Button
                        style={{ margin: 4 }}
                        onPress={async () => {
                          setTheme(themeRef.current);
                        }}
                        appearance="outline"
                        accessoryLeft={props => <Icon {...props} name="brush" />}>
                        Apply Theme
                      </Button>
                    </View>
                  )}
                </>
              )}
            </UpdateWrapper>

            <Text style={{ margin: 4 }} category="h6">
              {t("settings_personalisation:language")}
            </Text>
            <Select
              style={{ margin: 4 }}
              value={i18n.language}
              onValueChange={value => {
                i18n.changeLanguage(value);
              }}
              options={LANGS.map(i => ({
                value: i[0],
                label: i[1],
              }))}
            />
          </Layout>
        </View>

        <View style={{ width: 400, flexGrow: 1, maxWidth: "100%", padding: 4 }}>
          <Layout level="3" style={{ margin: 4, padding: 4, flex: 1, borderRadius: 8 }}>
            <ClanPersonalisation clanSettings={clanSettings} setClanSettings={setClanSettings} />
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
              <Icon name="check" style={{ height: 24, width: 24 }} /> {t("settings_common:saved")}
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
          appearance="outline"
          accessoryLeft={props => <Icon {...props} name="content-save" />}>
          {t("settings_common:save")}
        </Button>
      </View>
    </Layout>
  );
}
