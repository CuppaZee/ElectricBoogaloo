import i18n from "i18next";
import { initReactI18next, Resources } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';

// the translations
// (tip move them in a JSON file and import them)
import {langs} from "./data";
import dayjs from "dayjs";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: langs,
    lng: "en-GB",
    fallbackLng: "en-GB",
    defaultNS: "main",
    nsSeparator: "__",

    // keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

i18n.on("languageChanged", (lang) => {
  AsyncStorage.setItem("LANG", lang);
  dayjs.locale(lang === "test" ? "x-pseudo" : lang.toLowerCase());
})

AsyncStorage.getItem("LANG", (e, r) => {
  if (r === "en-US") {
    i18n.changeLanguage("en");
    AsyncStorage.setItem("LANG", "en");
  } else if (r) {
    i18n.changeLanguage(r);
  } else {
    dayjs.locale("en-gb");
  }
});

export const LANGS = [
  ["de", "Deutsch"],
  ["en-GB", "English (UK)"],
  ["en", "English (US)"],
  ["fi", "Suomi"],
  ["nl", "Nederlands"],
  ["test", "Emojis"],
];

export default i18n;
