import { MunzeeSpecial, MunzeeSpecialBouncer } from "@cuppazee/api/munzee/specials";
import request from "./request";
import retrieve from "./retrieve";

import pr from "power-radix";
import { rtdb } from "./db";
const b64e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");

function generateBouncerHash(id: number, timestamp: number) {
  return `${new pr(id, 10).toString(b64e).padStart(5, "A").slice(0, 5)}${new pr(
    timestamp % 172800,
    10
  )
    .toString(b64e)
    .padStart(3, "A")
    .slice(0, 3)}`;
}

const cache: {
  bouncers: {
    [key: string]: (MunzeeSpecial | MunzeeSpecialBouncer) & {
      hash: string;
      hashClean: string;
      endpoint: "regular" | "mythological" | "pouchcreatures" | "flat" | "bouncers" | "retired";
    };
  };
  bouncers_updated: number;
  bouncers_loaded: boolean;
} = {
  bouncers: {},
  bouncers_updated: 0,
  bouncers_loaded: false,
};

export const bouncerEndpointTypes = [
  "regular",
  "mythological",
  "pouchcreatures",
  "flat",
  "bouncers",
  "retired",
] as const;

let signedUp = false;

export async function getBouncers(force?: boolean) {
  if (!signedUp) {
    await rtdb.ref("bouncers_cache/list").on("value", function (snapshot) {
      cache.bouncers = snapshot.val();
      cache.bouncers_loaded = true;
    });

    rtdb.ref("bouncers_cache/updated").on("value", function (snapshot) {
      cache.bouncers_updated = snapshot.val();
    });
    signedUp = true;
  }
  if (force || !cache.bouncers_loaded || cache.bouncers_updated < Date.now() - 300000) {
    const token = await retrieve({ user_id: 125914, teaken: false }, 60);
    let data = await Promise.all([
      request("munzee/specials", {}, token.access_token),
      request("munzee/specials/mythological", {}, token.access_token),
      request("munzee/specials/pouchcreatures", {}, token.access_token),
      request("munzee/specials/flat", {}, token.access_token),
      request("munzee/specials/bouncers", {}, token.access_token),
      request("munzee/specials/retired", {}, token.access_token),
    ]);
    let n = 0;
    cache.bouncers = {};
    cache.bouncers_updated = Date.now();
    console.log("/bouncers/nearby PROCESSING");
    for (let endpointData of data) {
      for (const bouncer of (endpointData?.data ?? []) as (
        | MunzeeSpecial
        | MunzeeSpecialBouncer
      )[]) {
        const hash = generateBouncerHash(
          Number(
            "mythological_munzee" in bouncer
              ? bouncer.mythological_munzee.munzee_id
              : bouncer.munzee_id
          ),
          bouncer.special_good_until
        );
        const hashClean = hash.replace(/\//g, "_").replace(/\+/g, "-");
        cache.bouncers[hashClean] = {
          ...bouncer,
          hash,
          hashClean,
          endpoint: bouncerEndpointTypes[n],
        };
      }
      n++;
    }
    data = [null,null,null,null,null,null];
    console.log("/bouncers/nearby SAVING");
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `/bouncers/nearby The script uses approximately ${Math.round(used * 100) / 100} MB`
    );
    await rtdb.ref(`bouncers_cache/updated`).set({
      list: cache.bouncers,
      updated: cache.bouncers_updated
    });
    console.log("/bouncers/nearby SAVED");
  }
  return cache.bouncers;
}
