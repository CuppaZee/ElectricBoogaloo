import {
  MunzeeSpecial,
  MunzeeSpecialBouncer,
} from "@cuppazee/api/munzee/specials";
import { retrieve, request } from "../util";

export default {
  path: "bouncers/overview",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db }: any) {
        const token = await retrieve(
          db,
          { user_id: 125914, teaken: false },
          60
        );
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
        var overview = body.reduce((a, b) => {
          const logo =
            ("mythological_munzee" in b
              ? b.mythological_munzee.munzee_logo
              : b.logo) ||
            "https://munzee.global.ssl.fastly.net/images/pins/undefined.png";
          a[logo] = (a[logo] || 0) + 1;
          return a;
        }, {} as { [key: string]: number });

        return {
          status: "success",
          data: overview,
        };
      },
    },
  ],
};
