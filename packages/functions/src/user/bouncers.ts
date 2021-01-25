import { retrieve, request } from "../util";
import { createRevGeocoder, LookupResult } from '@webkitty/geo-rev'
import geoTz from "geo-tz";
import { MunzeeSpecialBouncer } from "@cuppazee/api/munzee/specials";
import { Route } from "../types";
import { getBouncers } from "../util/cache";

const geocoder = createRevGeocoder();

const route: Route = {
  path: "user/bouncers",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { user_id }, db }: any) {
        const token = await retrieve(
          db,
          { user_id: 125914, teaken: false },
          60
        );
        const deploys = await request(
          "user/deploys",
          { user_id, type_id: 505508 },
          token.access_token
        );
        const bouncers = await getBouncers();

        for (var q = 0; q < 5 && deploys?.data?.has_more; q++) {
          var x = (
            await request(
              "user/deploys",
              { user_id, type_id: 505508, page: q + 1 },
              token.access_token
            )
          )?.data;
          if (!x?.has_more) deploys.data.has_more = 0;
          deploys.data.munzees = deploys.data.munzees.concat(x?.munzees ?? []);
        }
        var deps = await Promise.all(
          deploys?.data?.munzees
            .slice()
            .reverse()
            .map(async (i) => {
              let munzee: typeof i & {
                bouncer?: MunzeeSpecialBouncer;
                location?: LookupResult;
                timezone?: string;
              } = i;
              munzee.bouncer = bouncers.find(
                (b) =>
                  "mythological_munzee" in b &&
                  b?.mythological_munzee?.munzee_id.toString() ===
                    i.munzee_id.toString()
              ) as MunzeeSpecialBouncer;
              if (munzee.bouncer) {
                munzee.location = (await geocoder).lookup(
                  {
                    latitude: Number(munzee.bouncer.latitude),
                    longitude: Number(munzee.bouncer.longitude)
                  }
                );
                munzee.timezone = geoTz(
                  Number(munzee.bouncer.latitude),
                  Number(munzee.bouncer.longitude)
                );
              }
              return munzee;
            }) || []
        );
        return {
          status: "success",
          data: deps,
        };
      },
    },
  ],
};

export default route;
