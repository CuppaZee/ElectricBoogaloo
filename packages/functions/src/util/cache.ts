import { MunzeeSpecial, MunzeeSpecialBouncer } from "@cuppazee/api/munzee/specials";
import request from "./request";
import retrieve from "./retrieve";

import pr from "power-radix";
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
  bouncers: ((MunzeeSpecial | MunzeeSpecialBouncer) & {
    hash: string;
    endpoint: "regular" | "mythological" | "pouchcreatures" | "flat" | "bouncers" | "retired";
  })[];
  bouncers_updated: number;
} = {
  bouncers: [],
  bouncers_updated: 0,
};

export const bouncerEndpointTypes = [
  "regular",
  "mythological",
  "pouchcreatures",
  "flat",
  "bouncers",
  "retired",
] as const;

export async function getBouncers(force?: boolean) {
  if (force || cache.bouncers_updated < Date.now() - 300000) {
    const token = await retrieve({ user_id: 125914, teaken: false }, 60);
    const data = await Promise.all([
      request("munzee/specials", {}, token.access_token),
      request("munzee/specials/mythological", {}, token.access_token),
      request("munzee/specials/pouchcreatures", {}, token.access_token),
      request("munzee/specials/flat", {}, token.access_token),
      request("munzee/specials/bouncers", {}, token.access_token),
      request("munzee/specials/retired", {}, token.access_token),
    ]);
    let body: ((MunzeeSpecial | MunzeeSpecialBouncer) & {
      hash: string;
      endpoint: "regular" | "mythological" | "pouchcreatures" | "flat" | "bouncers" | "retired";
    })[] = [];
    let n = 0;
    for (let endpointData of data) {
      body = body.concat(
        ((endpointData?.data ?? []) as (MunzeeSpecial | MunzeeSpecialBouncer)[]).map(i => ({
          ...i,
          hash: generateBouncerHash(
            Number("mythological_munzee" in i ? i.mythological_munzee.munzee_id : i.munzee_id),
            i.special_good_until
          ),
          endpoint: bouncerEndpointTypes[n],
        }))
      );
      n++;
    }
    cache.bouncers = body;
    cache.bouncers_updated = Date.now();
  }
  return cache.bouncers;
}
