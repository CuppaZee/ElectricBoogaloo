import Fuse from 'fuse.js';
import { Route } from '../types';
import mongo from '../util/mongo';
const route: Route = {
  path: "clan/list",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { query, limit, format }
      }: any) {
        var list = await mongo.collection("clans_list").find().toArray();
        if (query) {
          var fuse = new Fuse(list, {
            keys: [
              {
                name: 'name',
                weight: 0.7
              },
              {
                name: 'clan_id',
                weight: 0.15
              },
              {
                name: 'tagline',
                weight: 0.15
              },
            ]
          })

          list = fuse.search(query).map(i => i.item)
        }
        list = list.slice(0, Number(limit || (query ? "50" : "1000000")));
        if (format === "list") {
          return {
            status: "success",
            data: list
          }
        } else {
          return {
            status: "success",
            data: list.reduce((a, b, c) => {
              a[b.clan_id.toString()] = {
                name: b.name,
                tagline: b.tagline,
                logo: b.logo,
                index: c
              }
              return a;
            }, {} as {
              [clan_id: string]: {
                name: string;
                tagline: string;
                logo: string;
                index: number;
              }
            })
          }
        }
      }
    }
  ]
}
export default route;