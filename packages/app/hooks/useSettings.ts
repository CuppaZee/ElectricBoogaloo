import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import * as themes from "../themes";
import builds from "../builds";
import { CuppaZeeDB } from "@cuppazee/db/lib";

export type Settings = {
  version: number;
  build: number;
  theme: keyof typeof themes;
  ready: string | false;
  maps: "apple" | "google";
  clan_style: number;
  clan_reverse: boolean;
  clan_single_line: boolean;
  clan_full_background: boolean;
  clan_colours: string[];
  clan_options: {
    [clan_id: string]: {
      level: number;
      share: boolean;
      subtract: boolean;
      shadow: boolean;
    };
  };
  tips_viewed: {
    [id: string]: {
      time: number;
      count: number;
    };
  };
};

export const defaultSettings: Settings = {
  version: 1,
  build: builds(new CuppaZeeDB([], [], []))[builds.length - 1].build,
  theme: "green_light",
  ready: false,
  maps: "google",
  clan_style: 2,
  clan_reverse: false,
  clan_single_line: false,
  clan_full_background: false,
  clan_colours: [
    "#eb0000",
    "#ef6500",
    "#fa9102",
    "#fcd302",
    "#bfe913",
    "#55f40b",
    "#0cf4af",
    "",
    "",
    "",
    "",
    "#FFE97F",
    "#DFF77E",
    "#B0FC8D",
  ],
  clan_options: {},
  tips_viewed: {},
};

export const settingsAtom = atom<{
  data: Settings;
  loaded: boolean;
}>({
  data: defaultSettings,
  loaded: false,
});

export function useSettings() {
  const [settings, setSettings] = useAtom(settingsAtom);
  useEffect(() => {
    if (!settings.loaded) {
      AsyncStorage.getItem("SETTINGS").then(data => {
        setSettings({
          data: { ...defaultSettings, ...JSON.parse(data || "{}") },
          loaded: true,
        });
      });
    }
  }, [settings.loaded]);
  return [settings.data, (data: Settings) => {
    setSettings({ data, loaded: true });
    AsyncStorage.setItem("SETTINGS", JSON.stringify(data));
  }, settings.loaded] as const;
}