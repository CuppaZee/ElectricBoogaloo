import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import * as themes from "../themes";

export type Settings = {
  theme: keyof typeof themes;
  ready: boolean;
  maps: "apple" | "google";
}

export const defaultSettings: Settings = {
  theme: "green_light",
  ready: false,
  maps: "google",
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