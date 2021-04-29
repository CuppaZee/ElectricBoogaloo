const langs = {
  "en-GB": require("./translations/en-gb.json"),
  nl: require("./translations/nl.json"),
  fi: require("./translations/fi.json"),
  de: require("./translations/de.json"),
  cs: require("./translations/cs.json"),
  da: require("./translations/da.json"),
  fr: require("./translations/fr.json"),
  hu: require("./translations/hu.json"),
};
const path = require("path");
const fs = require("fs");

const obj = {};
const params = {};

for (let item of langs["en-GB"]) {
  obj[`${item.context.replace(/"/g, "")}:${item.term}`] = "%%";
  params[`${item.context.replace(/"/g, "")}:${item.term}`] =
    (item.definition.one || item.definition).match(/{[^}]+}/g) || [];
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
    for (let param of expectedItemParams) {
      if (!itemParams.includes(param)) {
        console.error(
          `\x1b[91mMissing parameter ${param} in ${lang}:${item.context.replace(/"/g, "")}:${item.term}\x1b[39m`
        );
      }
    }
  }
}

function convert(n, s) {
  const obj = {};

  for (let item of n) {
    const v = `${item.context.replace(/"/g, "")}:${item.term}`;
    if (typeof item.definition === "string") {
      obj[v] = s
        ? s(item.definition.replace(/{[^}]+}/g, a => `{{${a.slice(1, -1)}}}`))
        : item.definition.replace(/{[^}]+}/g, a => `{{${a.slice(1, -1)}}}`);
    } else {
      let z = 0;
      for (const key in item.definition) {
        const x =
          Object.keys(item.definition).length === 2
            ? `${v}${z === 0 ? "" : "_plural"}`
            : `${v}_${z}`;
        obj[x] = s
          ? s(item.definition[key].replace(/{[^}]+}/g, a => `{{${a.slice(1, -1)}}}`))
          : item.definition[key].replace(/{[^}]+}/g, a => `{{${a.slice(1, -1)}}}`);
        z++;
      }
    }
  }
  return obj;
}

const random = (length = 8) => {
  // Declare all characters
  let chars = "🙈 🙉 🙊 🐵 🐒 🦍 🦧 🐶 🐕 🦮 🐕‍🦺 🐩 🐺 🦊 🦝 🐱 🐈 🦁 🐯 🐅 🐆 🐴 🐎 🦄 🦓 🦌 🐮 🐂 🐃 🐄 🐷 🐖 🐗 🐽 🐏 🐑 🐐 🐪 🐫 🦙 🦒 🐘 🦏 🦛 🐭 🐁 🐀 🐹 🐰 🐇 🐿️ 🦔 🦇 🐻 🐨 🐼 🦥 🦦 🦨 🦘 🦡 🐾 🦃 🐔 🐓 🐣 🐤 🐥 🐦 🐧 🕊️ 🦅 🦆 🦢 🦉 🦩 🦚 🦜 🐸 🐊 🐢 🦎 🐍 🐲 🐉 🦕 🦖 🐳 🐋 🐬 🐟 🐠 🐡 🦈 🐙 🐌 🦋 🐛 🐜 🐝 🐞 🦗 🕷️ 🦂 🦟 🦀 🦞 🦐 🦑".split(
    " "
  );

  // Pick characters randomly
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }

  return str;
};

fs.writeFileSync(
  path.resolve(__dirname, "data.ts"),
  `export type TranslationFormat = ${JSON.stringify({ main: obj }, null, 2)
    .replace(/"%%",/g, "string;")
    .replace(/"%%"/g, "string;")};
export const langs = {
  ${Object.entries(langs).map(
    i => `"${i[0]}": ${JSON.stringify({ main: convert(i[1], b => b.trim()) })}`
  )},
  "test": ${JSON.stringify({
    main: convert(langs["en-GB"], a =>
      a.replace(/(?!{{)\b[a-zA-Z]+\b(?!}})/g, b => random(b.length))
    ),
  })}
}`
);
