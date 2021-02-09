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
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

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

// console.log(
//   new Date().toLocaleString("en-US", {
//     hour12: false,
//     timeZone: "America/Toronto",
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     timeZoneName: "short",
//   })
// );
console.log(
  new Intl.DateTimeFormat("en-US", {
    hour12: false,
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format()
);
console.log(dayjs());
console.log(dayjs.tz(dayjs().format(), "America/Chicago"));
console.log(dayjs().tz("America/Chicago").format());
console.log(dayjs("2013-11-18 11:55").tz("America/Toronto"));
