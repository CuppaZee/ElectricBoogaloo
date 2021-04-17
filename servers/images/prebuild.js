const Jimp = require("jimp");
const db = require("@cuppazee/types").default;
const TypeHidden = require("@cuppazee/types/lib/munzee").TypeHidden;
const fs = require("fs");

if (!fs.existsSync("dist")) fs.mkdirSync("dist");
if (!fs.existsSync("dist/types")) fs.mkdirSync("dist/types");
if (!fs.existsSync("dist/types/64")) fs.mkdirSync("dist/types/64");
if (!fs.existsSync("dist/types/128")) fs.mkdirSync("dist/types/128");

(async function () {
  for (let i = 0; i < db.types.length / 10; i++) {
    await Promise.all(
      db.types.slice(i * 10, (i + 1) * 10).map(async (type) => {
        const icon = type.strippedIcon;
        try {
          if (
            (type.hidden(TypeHidden.IconServer) ||
              fs.existsSync(`dist/types/128/${icon}.png`))
          ) {
            return;
          }
          const image = await Jimp.read(
            fs.existsSync(`icons/${icon}.png`) ? `icons/${icon}.png` : `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(type.icon)}.png`
          );
          image.resize(128, 128);
          if (!type.hidden(TypeHidden.IconServer))
            await image.writeAsync(`dist/types/128/${icon}.png`);
          image.resize(64, 64);
          if (!type.hidden(TypeHidden.IconServer))
            await image.writeAsync(`dist/types/64/${icon}.png`);
        } catch (e) {
          console.error(icon, type.icon);
          console.error(e);
        }
      })
    );
  }
})();
