import { MunzeeSpecial, MunzeeSpecialBouncer } from "@cuppazee/api/munzee/specials";
import request from "./request";
import retrieve, { AuthApplication } from "./retrieve";

import pr from "power-radix";
import { Endpoints, EndpointsDown } from "./endpointStatus";
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

export const cache: {
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
  console.log("loading bouncers")
  if (force || cache.bouncers_updated < Date.now() - 300000) {
    const token = await retrieve({ user_id: 455935, teaken: false }, 60, AuthApplication.Universal);
    const data = await Promise.all([
      request("munzee/specials", {}, token.access_token).then(i => {
        EndpointsDown.delete(Endpoints.MunzeeSpecials)
        return i;
      }).catch(() => {
        EndpointsDown.add(Endpoints.MunzeeSpecials)
        return null;
      }),
      request("munzee/specials/mythological", {}, token.access_token).then(i => {
        EndpointsDown.delete(Endpoints.MunzeeSpecialsMythological)
        return i;
      }).catch(() => {
        EndpointsDown.add(Endpoints.MunzeeSpecialsMythological)
        return null;
      }),
      request("munzee/specials/pouchcreatures", {}, token.access_token).then(i => {
        EndpointsDown.delete(Endpoints.MunzeeSpecialsPouchcreatures)
        return i;
      }).catch(() => {
        EndpointsDown.add(Endpoints.MunzeeSpecialsPouchcreatures)
        return null;
      }),
      request("munzee/specials/flat", {}, token.access_token).then(i => {
        EndpointsDown.delete(Endpoints.MunzeeSpecialsFlat)
        return i;
      }).catch(() => {
        EndpointsDown.add(Endpoints.MunzeeSpecialsFlat)
        return null;
      }),
      request("munzee/specials/bouncers", {}, token.access_token).then(i => {
        EndpointsDown.delete(Endpoints.MunzeeSpecialsBouncers)
        return i;
      }).catch(e => {
        console.log("Bouncer Down >", e);
        EndpointsDown.add(Endpoints.MunzeeSpecialsBouncers)
        return null;
      }),
      request("munzee/specials/retired", {}, token.access_token).then(i => {
        EndpointsDown.delete(Endpoints.MunzeeSpecialsRetired)
        return i;
      }).catch(() => {
        EndpointsDown.add(Endpoints.MunzeeSpecialsRetired)
        return null;
      }),
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
