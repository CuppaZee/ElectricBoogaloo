import enGB from "./en-gb.json";
import fi from "./fi.json";
import nl from "./nl.json";

const langs: any = {
  "en-GB": enGB,
  nl: nl,
  fi: fi,
  // de: require("./translations/de.json"),
  // cs: require("./translations/cs.json"),
  // da: require("./translations/da.json"),
  // fr: require("./translations/fr.json"),
  // hu: require("./translations/hu.json"),
};

const obj: any = {};
const params: any = {};

for (let item of langs["en-GB"]) {
  obj[`${item.context.replace(/"/g, "")}:${item.term}`] = "%%";
  params[`${item.context.replace(/"/g, "")}:${item.term}`] =
    (typeof item.definition === "string" ? item.definition : item.definition.one).match(/{[^}]+}/g) || [];
}

for (let lang in langs) {
  for (let item of langs[lang]) {
    if (!item.definition) {
      console.error(
        `Missing definition for ${lang}:${item.context.replace(/"/g, "")}:${item.term}`
      );
      continue;
    }
    const itemParams =
      (typeof item.definition === "string"
        ? item.definition
        : item.definition[Object.keys(item.definition)[Object.keys(item.definition).length - 1]]
      ).match(/{[^}]+}/g) || [];
    const expectedItemParams = params[`${item.context.replace(/"/g, "")}:${item.term}`];
    for (let param of itemParams) {
      if (!expectedItemParams.includes(param)) {
        console.error(
          `\x1b[91mInvalid parameter ${param} in ${lang}:${item.context.replace(/"/g, "")}:${item.term}\x1b[39m`
        );
      }
    }
    for (let param of expectedItemParams ?? []) {
      if (!itemParams.includes(param)) {
        console.error(
          `\x1b[91mMissing parameter ${param} in ${lang}:${item.context.replace(/"/g, "")}:${item.term}\x1b[39m`
        );
      }
    }
  }
}

function convert(n: any, s: any) {
  // console.log(n, s);
  const obj: any = {};

  for (let item of n) {
    const v = `${item.context.replace(/"/g, "")}:${item.term}`;
    // console.log(v, item.definition);
    if (typeof item.definition === "string") {
      obj[v] = s
        ? s(item.definition.replace(/{[^}]+}/g, (a: string) => `{{${a.slice(1, -1)}}}`))
        : item.definition.replace(/{[^}]+}/g, (a: string) => `{{${a.slice(1, -1)}}}`);
    } else {
      let z = 0;
      for (const key in item.definition) {
        const x =
          Object.keys(item.definition).length === 2
            ? `${v}${z === 0 ? "" : "_plural"}`
            : `${v}_${z}`;
        obj[x] = s
          ? s(item.definition[key].replace(/{[^}]+}/g, (a: string) => `{{${a.slice(1, -1)}}}`))
          : item.definition[key].replace(/{[^}]+}/g, (a: string) => `{{${a.slice(1, -1)}}}`);
        z++;
      }
    }
  }
  return obj;
}

const letterEmojis = "🐜 🐻 🐱 🐬 🐘 🐟 🦒 🐴 🧊 🕹 🦘 🦙 🐵 🥷 🐙 🐼 ❓ 🐇 🦥 🐢 🦄 🧛 🐋 ❌ 🧶 🦓".split(
  " "
)

const emojify = (word: string) => {
  return word.split("").map(char => letterEmojis[char.toUpperCase().charCodeAt(0) - 65]).join("");
}

export default {
  ...Object.fromEntries(Object.entries(langs).map(
    i => [i[0], { main: convert(i[1], (b: string) => b.trim()) }]
  )),
  test: {
    main: convert(langs["en-GB"], (a: string) =>
      a.replace(/(?!{{)\b[a-zA-Z]+\b(?!}})/g, b => emojify(b))
    ),
  }
} as any