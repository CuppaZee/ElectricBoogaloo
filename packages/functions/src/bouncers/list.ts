import {
  MunzeeSpecial,
  MunzeeSpecialBouncer,
} from "@cuppazee/api/munzee/specials";
import { Route } from "../types";
// import { retrieve, request } from "../util";
import { getBouncers } from "../util/cache";

function logo(special: MunzeeSpecial | MunzeeSpecialBouncer): string {
  if ("logo" in special) {
    return (
      special.logo ||
      "https://munzee.global.ssl.fastly.net/images/pins/undefined.png"
    );
  } else {
    return (
      special.mythological_munzee.munzee_logo ||
      "https://munzee.global.ssl.fastly.net/images/pins/undefined.png"
    );
  }
}

const route: Route = {
  path: "bouncers/list",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { list: l } }) {
        const list = l as string;
        // var token = await retrieve({ user_id: 125914, teaken: false }, 60);
        // var data = await Promise.all([
        //   request("munzee/specials", {}, token.access_token),
        //   request("munzee/specials/mythological", {}, token.access_token),
        //   request("munzee/specials/pouchcreatures", {}, token.access_token),
        //   request("munzee/specials/flat", {}, token.access_token),
        //   request("munzee/specials/bouncers", {}, token.access_token),
        //   request("munzee/specials/retired", {}, token.access_token),
        // ]);
        
        // let body: (MunzeeSpecial | MunzeeSpecialBouncer)[] = [];
        // for (let endpointData of data) {
        //   body = body.concat(endpointData?.data ?? []);
        // }
        const bouncers = await getBouncers();
        var output = bouncers
          .filter((i) => list.split(",").includes(logo(i).slice(49, -4)))
          .map((i) => [
            Number(i.latitude),
            Number(i.longitude),
            list.split(",").indexOf(logo(i).slice(49, -4)),
            Number(i.munzee_id),
          ]);
        return {
          status: "success",
          data: {
            list: list.split(","),
            keys: ["latitude", "longitude", "logo", "munzee_id"],
            data: output,
          },
        };
      },
    },
  ],
};

export default route;