import { loadFromArrayBuffer, loadFromLzwJson, CuppaZeeDB } from "@cuppazee/db";
import fetch from "node-fetch";

const dbCache: { value: CuppaZeeDB } = {
  value: new CuppaZeeDB([], [], []),
};

(async function () {
  try {
    const response = await fetch(`https://db.cuppazee.app/lzwmsgpack/`);
    if (!response.ok) throw "e";
    const data = await response.arrayBuffer();
    if (data.byteLength > 0) {
      const { db } = loadFromArrayBuffer(data);
      dbCache.value = db;
    }
  } catch (e) {
    const response = await fetch(`https://db.cuppazee.app/lzw/`);
    if (!response.ok) throw "e";
    const data = await response.text();
    if (data.length > 0) {
      const { db } = loadFromLzwJson(data);
      dbCache.value = db;
    }
  }
})();

export default dbCache;