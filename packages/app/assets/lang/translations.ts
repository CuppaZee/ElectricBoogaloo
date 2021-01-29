import cs from "./files/cs.json";
import da from "./files/da.json";
import de from "./files/de.json";
import en_gb from "./files/en-gb.json";
import en_us from "./files/en-us.json";
import fi from "./files/fi.json";
import fr from "./files/fr.json";
import hu from "./files/hu.json";
import lt from "./files/lt.json";
import nl from "./files/nl.json";
import pt from "./files/pt.json";
import sv from "./files/sv.json";

type Obj = { [key: string]: Obj | string };

var plural_list = ["", "_plural"];

function s(a: string) {
  return a.replace(/\w/g, () => Math.floor(Math.random() * 36).toString(36));
}

function x(obj: Obj, key: string, scramble?: any) {
  var a: Obj = {};
  if (obj.other !== undefined) {
    for (var i = 0; i < Object.keys(obj).length; i++) {
      if (Object.keys(obj).length == 2) {
        if (Object.values(obj)[i])
          a[`${key}${plural_list[i]}`] = scramble
            ? s(Object.values(obj)[i] as string)
            : (Object.values(obj)[i] as string).replace(/{([a-z0-9_]+)}/g, "{{$1}}");
      } else {
        if (Object.values(obj)[i])
          a[`${key}_${i}`] = scramble
            ? s(Object.values(obj)[i] as string)
            : (Object.values(obj)[i] as string).replace(/{([a-z0-9_]+)}/g, "{{$1}}");
      }
    }
  } else {
    a[key] = {};
    if (typeof a[key] === "string") throw Error("");
    for (var i = 0; i < Object.keys(obj).length; i++) {
      let k = Object.keys(obj)[i];
      if (typeof obj[k] == "string") {
        if (obj[k]) (a[key] as Obj)[k] = scramble ? s(obj[k] as string) : (obj[k] as string).replace(/{([a-z0-9_]+)}/g, "{{$1}}");
      } else {
        Object.assign(a[key], x(obj[k] as Obj, k, scramble));
      }
    }
  }
  return a;
}
// Converts to i18next plural format

export default {
  cs: x(cs, "a").a,
  da: x(da, "a").a,
  de: x(de, "a").a,
  "en-GB": x(en_gb as Obj, "a").a,
  en: x(en_us, "a").a,
  fi: x(fi, "a").a,
  fr: x(fr, "a").a,
  hu: x(hu, "a").a,
  lt: x(lt, "a").a,
  nl: x(nl, "a").a,
  pt: x(pt, "a").a,
  sv: x(sv, "a").a,
};