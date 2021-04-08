const db = require("@cuppazee/types").default;
const fs = require("fs");
const path = require("path");
const lzString = require("lz-string");
const lzwcompress = require("lzwcompress");
// console.log(jsonc);
fs.writeFileSync(path.resolve(__dirname, "types.json"), JSON.stringify(db.types.filter(i=>i.category_raw !== "event").map(i=>i.i)));
fs.writeFileSync(
  path.resolve(__dirname, "types.json.lzstring"),
  lzString.compressToUint8Array(
    JSON.stringify(db.types.filter(i => i.category_raw !== "event").map(i => i.i))
  )
);
fs.writeFileSync(
  path.resolve(__dirname, "types.json.lzwcompress"),
  lzwcompress.pack(db.types.filter(i => i.category_raw !== "event").map(i => i.i))
);
fs.writeFileSync(
  path.resolve(__dirname, "types.json.lzwcompress.lzstring"),
  lzString.compressToUint8Array(
    lzwcompress.pack(db.types.filter(i => i.category_raw !== "event").map(i => i.i))
  )
);