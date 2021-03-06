import "@formatjs/intl-getcanonicallocales/polyfill";

import "@formatjs/intl-locale/polyfill";

import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-numberformat/locale-data/en"; // locale-data for en

import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";

import "@formatjs/intl-datetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/locale-data/en"; // locale-data for en
import "@formatjs/intl-datetimeformat/add-all-tz"; // Add ALL tz data

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import mhq from "./components/dayjsmhq";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";

import "dayjs/locale/en";
import "dayjs/locale/en-gb";
import "dayjs/locale/x-pseudo";
dayjs.extend(utc);
dayjs.extend(mhq);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);

// @ts-ignore
Date.prototype._toLocaleString = Date.prototype.toLocaleString;
// @ts-ignore
Date.prototype.toLocaleString = function (a, b) {
  if (b && Object.keys(b).length === 1 && "timeZone" in b && a === "en-US") {
    return Intl.DateTimeFormat("en-us", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: b.timeZone,
    })
      .format(this)
      .replace(/(\d{2})\/(\d{2})\/(\d{4}),/g, "$3-$1-$2");
  }
  // @ts-ignore
  return this._toLocaleString(a, b);
};