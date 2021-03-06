import { I18nConfig, NativeDateService } from "@ui-kitten/components";
import dayjs from "dayjs";

export default function getDateService() {
  const i18n: I18nConfig = {
    dayNames: {
      short: dayjs.weekdaysShort(),
      long: dayjs.weekdays(),
    },
    monthNames: {
      short: dayjs.monthsShort(),
      long: dayjs.months(),
    },
  };
  return new NativeDateService(dayjs.locale(), {
    i18n,
    format: dayjs().localeData().longDateFormat("L"),
    startDayOfWeek: dayjs().localeData().firstDayOfWeek() as any,
  });
}