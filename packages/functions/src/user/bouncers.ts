import { retrieve, request } from "../util";
import path from "path";
import geocoderFunction from "offline-geocoder";
const geocoder = geocoderFunction({
  database: path.join(__dirname, "../util/geolocate/db.sqlite"),
});
import geoTz from "geo-tz";
import { MunzeeSpecialBouncer } from "@cuppazee/api/munzee/specials";
import { Route } from "../types";
import { getBouncers } from "../util/cache";

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
        // var [deploys, ...data] = await Promise.all([
        //   request(
        //     "user/deploys",
        //     { user_id, type_id: 505508 },
        //     token.access_token
        //   ),
        //   request("munzee/specials/mythological", {}, token.access_token),
        //   request("munzee/specials/pouchcreatures", {}, token.access_token),
        //   request("munzee/specials/flat", {}, token.access_token),
        //   request("munzee/specials/bouncers", {}, token.access_token),
        // ] as const);

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
        // let body: MunzeeSpecialBouncer[] = [];
        // for (let endpointData of data) {
        //   body = body.concat(endpointData?.data ?? []);
        // }
        var deps = await Promise.all(
          deploys?.data?.munzees
            .slice()
            .reverse()
            .map(async (i) => {
              let munzee: typeof i & {
                bouncer?: MunzeeSpecialBouncer;
                location?: GeocoderLocation;
                timezone?: string;
              } = i;
              munzee.bouncer = bouncers.find(
                (b) =>
                  "mythological_munzee" in b &&
                  b?.mythological_munzee?.munzee_id.toString() ===
                    i.munzee_id.toString()
              ) as MunzeeSpecialBouncer;
              if (munzee.bouncer) {
                munzee.location = await geocoder.reverse(
                  Number(munzee.bouncer.latitude),
                  Number(munzee.bouncer.longitude)
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
