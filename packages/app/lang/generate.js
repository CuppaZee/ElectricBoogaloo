const langs = {
  "en-GB": require("./translations/en-gb.json"),
  "nl": require("./translations/nl.json"),
};
const path = require('path');
const fs = require('fs');

const obj = {};

for (let item of langs["en-GB"]) {
  const v = `${item.context.replace(/"/g, '')}.${item.term}`.split('.');
  let q = obj;
  for (let i = 0; i < v.length;i++) {
    if (i === v.length - 1) {
      q[v[i]] = "%%";
    } else {
      q = q[v[i]] = q[v[i]] || {};
    }
  }
}

function convert(n, s) {
  const obj = {};

  for (let item of n) {
    const v = `${item.context.replace(/"/g, "")}.${item.term}`.split(".");
    let q = obj;
    for (let i = 0; i < v.length; i++) {
      if (i === v.length - 1) {
        if (typeof item.definition === "string") {
          q[v[i]] = s
            ? s(item.definition.replace(/{[^}]+}/g, a => `{{${a.slice(1, -1)}}}`))
            : item.definition.replace(/{[^}]+}/g, a => `{{${a.slice(1, -1)}}}`);
        } else {
          let z = 0;
          for (const key in item.definition) {
            const x = Object.keys(item.definition).length === 2 ? `${v[i]}${z === 0 ? "" : "_plural"}` : `${v[i]}_${z}`;
            q[x] = s
              ? s(item.definition[key].replace(/{[^}]+}/g, a => `{{${a.slice(1, -1)}}}`))
              : item.definition[key].replace(/{[^}]+}/g, a => `{{${a.slice(1, -1)}}}`);
            z++;
          }
        }
      } else {
        q = q[v[i]] = q[v[i]] || {};
      }
    }
  }
  return obj;
}

const random = (length = 8) => {
    // Declare all characters
    let chars =
      "🙈 🙉 🙊 🐵 🐒 🦍 🦧 🐶 🐕 🦮 🐕‍🦺 🐩 🐺 🦊 🦝 🐱 🐈 🦁 🐯 🐅 🐆 🐴 🐎 🦄 🦓 🦌 🐮 🐂 🐃 🐄 🐷 🐖 🐗 🐽 🐏 🐑 🐐 🐪 🐫 🦙 🦒 🐘 🦏 🦛 🐭 🐁 🐀 🐹 🐰 🐇 🐿️ 🦔 🦇 🐻 🐨 🐼 🦥 🦦 🦨 🦘 🦡 🐾 🦃 🐔 🐓 🐣 🐤 🐥 🐦 🐧 🕊️ 🦅 🦆 🦢 🦉 🦩 🦚 🦜 🐸 🐊 🐢 🦎 🐍 🐲 🐉 🦕 🦖 🐳 🐋 🐬 🐟 🐠 🐡 🦈 🐙 🐌 🦋 🐛 🐜 🐝 🐞 🦗 🕷️ 🦂 🦟 🦀 🦞 🦐 🦑".split(' ');

    // Pick characters randomly
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }

    return str;

};

fs.writeFileSync(
  path.resolve(__dirname, "data.ts"),
  `export type TranslationFormat = ${JSON.stringify(obj, null, 2)
    .replace(/"%%",/g, "string;")
    .replace(/"%%"/g, "string;")};
  export const langs = {
    ${Object.entries(langs).map(i => `"${i[0]}": ${JSON.stringify(convert(i[1]))}`)},
    "test": ${JSON.stringify(convert(langs["en-GB"], a => a.replace(/(?!{{)\b[a-zA-Z]+\b(?!}})/g, (b) => random(b.length))))}
  }`
);