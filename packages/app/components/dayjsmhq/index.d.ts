import { PluginFunc, ConfigType } from "dayjs";

declare const plugin: PluginFunc;
export = plugin;

declare module "dayjs" {
  interface Dayjs {
    mhq(keepLocalTime?: boolean): Dayjs;
  }

  const mhqNow: () => Dayjs;
  const mhqParse: (config?: ConfigType) => Dayjs;
}
