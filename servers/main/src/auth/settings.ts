import config from '../config';
import { Route } from "../types";
import mongo from '../util/mongo';
import { AuthApplication, validateTeaken } from "../util/retrieve";

export interface UserSettingsUser {
  user_id: number;
  username: string;
}
export interface UserSettingsClan {
  clan_id: number;
  name: string;
  tagline: string;
}

export interface UserSettings {
  users: UserSettingsUser[];
  clans: UserSettingsClan[];
  rootCategories: string[];
  colours: { [name: string]: string };
}

const route: Route = {
  path: "auth/settings",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { teaken: teake, user_id }
      }: any) {
        let teaken: string | boolean = teake;
        if (typeof teaken !== "string") {
          return {
            status: "error",
            data: null,
          };
        }
        if (config.bypass_teakens.includes(teaken)) {
          teaken = false;
        }
        var { valid } = await validateTeaken(Number(user_id), teaken, AuthApplication.Main);
        if (valid) {
          const settings = await mongo.collection<Partial<UserSettings> & { _id: unknown, user_id: unknown }>("user_settings").findOne({ user_id: Number(user_id) });
          const { _id: _1, user_id: _2, ...s } = (settings ?? {}) as Partial<UserSettings> & { _id: unknown, user_id: unknown };
          const validSettings: UserSettings = {
            users: [],
            clans: [],
            rootCategories: [],
            ...s,
            colours: {
              "clan-level-6": "#0cf4af",
              "clan-level-5": "#55f40b",
              "clan-level-4": "#bfe913",
              "clan-level-3": "#fcd302",
              "clan-level-2": "#fa9102",
              "clan-level-1": "#ef6500",
              "clan-level-0": "#eb0000",
              ...s.colours ?? {},
            }
          };
          return {
            status: "success",
            data: validSettings
          };
        }
        return {
          status: "error",
          data: null,
        }
      },
    },
  ],
};
export default route;