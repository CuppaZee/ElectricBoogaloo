const data = require('./base.json');
const fs = require('fs');
const path = require('path');

function edit(data, orig, b, path) {
  const output = {};
  for (const [key, val] of Object.entries(data)) {
    if (typeof val === "object") {
      output[key] = edit(val, orig, b, path + `${key}.`);
    } else if (val.startsWith("$")) {
      let x = orig;
      for (const v of val.slice(1).split('.')) {
        x = x[v];
        if (!x && b) { console.log(`\x1b[31mInvalid Reference at ${path}${key}: ${val}\x1b[0m`); process.exit() };
      }
      output[key] = x;
    } else {
      output[key] = b ? val : "";
    }
  }
  return output;
}


for (const lang of ["cs", "da", "de", "en-gb", "en-us", "fi", "fr", "hu", "lt", "nl", "pt", "sv"]) {
  const orig = require(`./original/${lang}.json`);
  fs.writeFileSync(path.resolve(__dirname, `files/${lang}.json`), JSON.stringify(edit(data, orig, lang === "en-gb", ""), null, 2)); 
}