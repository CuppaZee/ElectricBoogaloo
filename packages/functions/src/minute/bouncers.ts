import { retrieve, request } from "../util";
// import { get } from '../util/db';
import types from "@cuppazee/types";
import { computeDistanceBetween } from "spherical-geometry-js";
import config from "../config.json";
import fetch from "node-fetch";
import notification from "../util/notification";
import {
  MunzeeSpecial,
  MunzeeSpecialBouncer,
} from "@cuppazee/api/munzee/specials";
import { Route } from "../types";

function generateBouncerHash(id: any, timestamp: any) {
  return `${Buffer.from(id)
    .toString("base64")
    .padEnd(10, "=")
    .slice(0, 5)}${Buffer.from([timestamp % 172800])
    .toString("base64")
    .slice(0, 3)}`;
}

const route: Route = {
  path: "minute/bouncers",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ db, notificationData }) {
        const devices = await notificationData();
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        var sent = new Set(
          (await db.collection("data").doc("bouncer_notifications").get())
            .data()
            ?.list.match(/.{8}/g)
        );
        var data = await Promise.all([
          request("munzee/specials", {}, token.access_token),
          request("munzee/specials/mythological", {}, token.access_token),
          request("munzee/specials/pouchcreatures", {}, token.access_token),
          request("munzee/specials/flat", {}, token.access_token),
          request("munzee/specials/bouncers", {}, token.access_token),
          request("munzee/specials/retired", {}, token.access_token),
        ]);
        let body: ((MunzeeSpecial | MunzeeSpecialBouncer) & {
          hash: string;
        })[] = [];
        for (const d of data) {
          const da: MunzeeSpecial[] | MunzeeSpecialBouncer[] = d?.data ?? [];
          body = [
            ...body,
            ...(da as (MunzeeSpecialBouncer | MunzeeSpecial)[]).map(
              (i) =>
                ({
                  ...i,
                  hash: generateBouncerHash(
                    Number(
                      "mythological_munzee" in i
                        ? i.mythological_munzee.munzee_id
                        : i.munzee_id
                    ),
                    i.special_good_until
                  ),
                } ?? [])
            ),
          ];
        }
        await db
          .collection("data")
          .doc("bouncer_notifications")
          .set({ list: body.map((i) => i.hash).join("") });
        var bouncers = body.filter((i) => !sent.has(i.hash));
        let all = [];
        for (var device of devices.filter(
          (i) => i.bouncers && i.bouncers.enabled
        )) {
          for (var bouncer of bouncers) {
            let found = [];
            const locations = device.bouncers?.locations ?? [];
            // if (device.bouncers?.dynamic) {
            //   locations?.push({
            //     name: "Current Location",
            //     latitude: device.location.latitude,
            //     longitude: device.location.longitude,
            //   });
            // }
            for (const location of locations) {
              let distance = computeDistanceBetween(
                [location.longitude, location.latitude],
                [Number(bouncer.longitude), Number(bouncer.latitude)]
              );
              if (distance < 5000) found.push({ location, distance });
            }
            if (found.length > 0) {
              all.push({ found, bouncer, device });
              await fetch(config.discord.bouncer_test, {
                method: "POST",
                body: new URLSearchParams({
                  content: `\`\`\`json\n${JSON.stringify(
                    bouncer,
                    null,
                    2
                  )}\`\`\`${found.map(
                    (i) => `${i.distance}m from ${i.location.name}`
                  )}`,
                }),
              });
            }
          }
        }
        await notification(
          db,
          all.map((i) => {
            let title = `New ${
              ("logo" in i.bouncer ? i.bouncer.logo : "").slice(49, -4) ||
              "Unknown Type"
            } Nearby`;
            if ("mythological_munzee" in i.bouncer) {
              title = `${i.bouncer.mythological_munzee.friendly_name} by ${i.bouncer.mythological_munzee.creator_username}`;
            } else {
              var type = types.getType(i.bouncer.logo);
              if (type) {
                title = `New ${type.name} Nearby`;
              }
            }
            return {
              to: i.device.token,
              sound: "default",
              title,
              body: i.found
                .map(
                  (location) =>
                    `${
                      location.distance < 700
                        ? `${Math.floor(location.distance)}m`
                        : `${Math.floor(location.distance / 10) / 100}km`
                    } from ${location.location.name}`
                )
                .join("\n"),
              data: {
                type: "bouncer",
                bouncer: i.bouncer.full_url,
              },
            };
          })
        );
        return {
          status: "success",
          data: true,
        };
      },
    },
  ],
};

export default route;