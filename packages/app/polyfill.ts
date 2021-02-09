// // import { shouldPolyfill } from "@formatjs/intl-datetimeformat/should-polyfill";
// // export default async function polyfill(locale: string) {
// //   if (shouldPolyfill()) {
// //     // Load the polyfill 1st BEFORE loading data
// //     await import("@formatjs/intl-datetimeformat/polyfill");
// //   }

// //   // @ts-ignore
// //   if (Intl.DateTimeFormat.polyfilled) {
// //     // Parallelize CLDR data loading
// //     // @ts-ignore
// //     const dataPolyfills = [import("@formatjs/intl-datetimeformat/add-all-tz")];

// //     switch (locale) {
// //       default:
// //         // @ts-ignore
// //         dataPolyfills.push(import("@formatjs/intl-datetimeformat/locale-data/en"));
// //         break;
// //       case "fr":
// //         // @ts-ignore
// //         dataPolyfills.push(import("@formatjs/intl-datetimeformat/locale-data/fr"));
// //         break;
// //     }
// //     await Promise.all(dataPolyfills);
// //   }
// // }

// // on top of your index.android.js file
// const isAndroid = require('react-native').Platform.OS === 'android';
// // @ts-ignore
// const isHermesEnabled = !!global.HermesInternal;

// // in your index.js file
// if (isHermesEnabled || isAndroid) {


//   require('@formatjs/intl-getcanonicallocales/polyfill');
//   require('@formatjs/intl-locale/polyfill');


//   require('@formatjs/intl-pluralrules/polyfill');
//   require('@formatjs/intl-pluralrules/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

//   require('@formatjs/intl-displaynames/polyfill');
//   require('@formatjs/intl-displaynames/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT
  
//   require('@formatjs/intl-listformat/polyfill');
//   require('@formatjs/intl-listformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT
  
//   require('@formatjs/intl-numberformat/polyfill');
//   require('@formatjs/intl-numberformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT
  
//   require('@formatjs/intl-relativetimeformat/polyfill');
//   require('@formatjs/intl-relativetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

//   require('@formatjs/intl-datetimeformat/polyfill');
//   require('@formatjs/intl-datetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

//   require('@formatjs/intl-datetimeformat/add-all-tz.js');
//   console.log("POLYFILLING", Intl);



//   // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
// //   let RNLocalize = require('react-native-localize');
// //   if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
// //     // @ts-ignore
// //     Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone());
// //   }
// }

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);