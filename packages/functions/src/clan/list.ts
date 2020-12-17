import Fuse from 'fuse.js';
import { Route } from '../types';
const route: Route = {
  path: "clan/list",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        db,
        params: { query, limit, format }
      }: any) {
        var { clans: data }: {
          clans: {
            name: string;
            tagline: string;
            logo: string;
          }[];
        } = (await db.collection('data').doc('clans').get()).data();
        var list = Object.entries(data).map(i => ({
          clan_id: Number(i[0]),
          name: i[1].name,
          tagline: i[1].tagline,
          logo: i[1].logo,
        }));
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