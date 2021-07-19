import { loadFromCache, loadFromArrayBuffer, loadFromLzwJson, CuppaZeeDB } from "@cuppazee/db";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dbCache: { value: CuppaZeeDB; onLoad: Set<() => void>; running: boolean } = {
  value: new CuppaZeeDB([], [], []),
  onLoad: new Set(),
  running: false,
};

export const dbLoadLog: string[] = [];

async function loadDB2(cacheVersion: number) {
  try{
    const response = await Promise.race([
      await fetch(`https://db.cuppazee.app/lzw/${cacheVersion}`),
      new Promise<never>((_, r) => setTimeout(r, 3000)),
    ]);
    if (!response.ok) throw "e";
    dbLoadLog.push("Loaded from lzw, Reading.");
    const data = await Promise.race([
      await response.text(),
      new Promise<never>((_, r) => setTimeout(r, 500)),
    ]);
    if (data.length > 0) {
      dbLoadLog.push("Read from lzw, Parsing.");
      const { db, cache } = loadFromLzwJson(data);
      dbLoadLog.push("Parsed from lzw, Succeeded.");
      dbCache.value = db;
      dbCache.onLoad.forEach(i => i());
      await AsyncStorage.setItem("@czexpress/dbcache", JSON.stringify(cache));
    } else {
      dbLoadLog.push("Nothing to load from lzw, Suspended.");
    }
  } catch (e) {
    dbLoadLog.push("Failed to load from lzw, Failed.");
  }
}

async function loadDB(cacheVersion: number, depth: number = 0) {
  if (depth > 5) {
    dbLoadLog.push("Depth 5 Reached, Suspended.");
    return null;
  }
  try {
    const response = await Promise.race([
      await fetch(`https://db.cuppazee.app/lzwmsgpack/${cacheVersion}`),
      new Promise<never>((_, r) => setTimeout(r, 1000)),
    ]);
    if (!response.ok) throw "e";
    dbLoadLog.push("Loaded from lzwmsgpack, Reading.");
    const data = await Promise.race([
      await response.arrayBuffer(),
      new Promise<never>((_, r) => setTimeout(r, 500)),
    ]);
    if (data.byteLength > 0) {
      dbLoadLog.push("Read from lzwmsgpack, Parsing.");
      const { db, cache } = loadFromArrayBuffer(data);
      dbLoadLog.push("Parsed from lzwmsgpack, Succeeded.");
      dbCache.value = db;
      dbCache.onLoad.forEach(i => i());
      await AsyncStorage.setItem("@czexpress/dbcache", JSON.stringify(cache));
    } else {
      dbLoadLog.push("Nothing to load from lzwmsgpack, Suspended.");
    }
  } catch (e) {
    dbLoadLog.push("Failed to load from lzwmsgpack, Continuing.");
    try {
      const response = await Promise.race([
        await fetch(`https://db.cuppazee.app/lzw/${cacheVersion}`),
        new Promise<never>((_, r) => setTimeout(r, 1000)),
      ]);
        if (!response.ok) throw "e";
        dbLoadLog.push("Loaded from lzw, Reading.");
        const data = await Promise.race([
          await response.text(),
          new Promise<never>((_, r) => setTimeout(r, 500)),
        ]);
        if (data.length > 0) {
          dbLoadLog.push("Read from lzw, Parsing.");
          const { db, cache } = loadFromLzwJson(data);
          dbLoadLog.push("Parsed from lzw, Succeeded.");
          dbCache.value = db;
          dbCache.onLoad.forEach(i => i());
          await AsyncStorage.setItem("@czexpress/dbcache", JSON.stringify(cache));
        } else {
          dbLoadLog.push("Nothing to load from lzw, Suspended.");
        }
      } catch (e) {
        dbLoadLog.push("Failed to load from lzw/lzwmsgpack, Continuing.");
        await new Promise(r => setTimeout(r, 5000));
        await loadDB(cacheVersion, depth + 1);
      }
  };
  dbLoadLog.push("Finished.");
}

async function loadDBBase() {
  dbCache.running = true;
  dbLoadLog.push("Loading...");
  let cacheVersion = 0;
  try {
    const cacheData = await Promise.race([AsyncStorage.getItem("@czexpress/dbcache"), new Promise<string | null>((_, r) => setTimeout(r, 1000))]);
    if (cacheData) {
      dbLoadLog.push("Loaded from cache, Continuing.");
      const data = JSON.parse(cacheData);
      cacheVersion = data.version;
      dbCache.value = loadFromCache(data);
      dbCache.onLoad.forEach(i => i());
    } else {
      dbLoadLog.push("No Cache Data, Continuing.")
    }
  } catch (e) { dbLoadLog.push("Failed to load from cache, Continuing.");}
  await loadDB2(cacheVersion);
};

export default function useDB() {
  const [_, setValue] = useState(0);
  useEffect(() => {
    if (!dbCache.running) {
      loadDBBase();
    }
    const f = () => {
      setValue(i => i + 1);
    };
    if (dbCache.value) {
      f()
    }
    dbCache.onLoad.add(f);
    return () => { dbCache.onLoad.delete(f) };
  }, []);
  return dbCache.value;
}