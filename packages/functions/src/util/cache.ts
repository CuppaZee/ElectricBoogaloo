import { MunzeeSpecial, MunzeeSpecialBouncer } from '@cuppazee/api/munzee/specials';
import db from './db';
import request from './request';
import retrieve from './retrieve';

const cache: {
  bouncers: (MunzeeSpecial | MunzeeSpecialBouncer)[];
  bouncers_updated: number;
} = {
  bouncers: [],
  bouncers_updated: 0,
}

export async function getBouncers(force?: boolean) {
  if(force || cache.bouncers_updated < Date.now() - 300000) {
    const token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
    const data = await Promise.all([
      request("munzee/specials", {}, token.access_token),
      request("munzee/specials/mythological", {}, token.access_token),
      request("munzee/specials/pouchcreatures", {}, token.access_token),
      request("munzee/specials/flat", {}, token.access_token),
      request("munzee/specials/bouncers", {}, token.access_token),
      request("munzee/specials/retired", {}, token.access_token),
    ]);
    let body: (MunzeeSpecial | MunzeeSpecialBouncer)[] = [];
    for (let endpointData of data) {
      body = body.concat(endpointData?.data ?? []);
    }
    cache.bouncers = body;
    cache.bouncers_updated = Date.now();
  }
  return cache.bouncers;
}