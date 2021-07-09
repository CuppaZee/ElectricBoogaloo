import { loadFromCache, loadFromArrayBuffer, loadFromLzwJson, CuppaZeeDB } from "@cuppazee/db";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dbCache: { value: CuppaZeeDB; onLoad: Set<() => void> } = {
  value: new CuppaZeeDB([], [], []),
  onLoad: new Set(),
};

(async function () {
  const cacheData = await AsyncStorage.getItem("@czexpress/dbcache");
  let cacheVersion = 0;
  if (cacheData) {
    const data = JSON.parse(cacheData);
    cacheVersion = data.version;
    dbCache.value = loadFromCache(data);
  }
  try {
    const response = await fetch(`https://db.cuppazee.app/lzwmsgpack/${cacheVersion}`);
    if (!response.ok) throw "e";
    const data = await response.arrayBuffer();
    if (data.byteLength > 0) {
      const { db, cache } = loadFromArrayBuffer(data);
      dbCache.value = db;
      await AsyncStorage.setItem("@czexpress/dbcache", JSON.stringify(cache));
    }
  } catch (e) {
    const response = await fetch(`https://db.cuppazee.app/lzw/${cacheVersion}`);
    if (!response.ok) throw "e";
    const data = await response.text();
    if (data.length > 0) {
      const { db, cache } = loadFromLzwJson(data);
      dbCache.value = db;
      await AsyncStorage.setItem("@czexpress/dbcache", JSON.stringify(cache));
    }
  }
})();

export default function useDB() {
  const [_, setValue] = useState(0);
  useEffect(() => {
    const f = () => {
      setValue(i => i + 1);
    };
    dbCache.onLoad.add(f);
    return () => { dbCache.onLoad.delete(f) };
  }, []);
  return dbCache.value;
}