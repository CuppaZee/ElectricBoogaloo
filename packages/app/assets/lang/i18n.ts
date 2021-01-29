import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';

// the translations
// (tip move them in a JSON file and import them)
import resources from "./translations";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources as any,
    lng: "en-GB",
    fallbackLng: "en-GB",

    // keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

AsyncStorage.getItem("LANG", (e, r) => {
  if (r === "en-US") {
    i18n.changeLanguage("en");
    AsyncStorage.setItem("LANG", "en");
  } else if (r) {
    i18n.changeLanguage(r);
  }
});

export default i18n;
