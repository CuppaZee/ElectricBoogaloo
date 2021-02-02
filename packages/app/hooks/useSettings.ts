import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import * as themes from "../themes";

export type Settings = {
  theme: keyof typeof themes;
  ready: boolean;
  maps: "apple" | "google";
  clan_style: number;
  clan_reverse: boolean;
  clan_single_line: boolean;
  clan_full_background: boolean;
};

export const defaultSettings: Settings = {
  theme: "green_light",
  ready: false,
  maps: "google",
  clan_style: 1,
  clan_reverse: false,
  clan_single_line: false,
  clan_full_background: false
}

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