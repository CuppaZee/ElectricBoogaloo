import types, { TypeTags } from "@cuppazee/types";
import { computeDistanceBetween } from "spherical-geometry-js";
import notification from "../util/notification";
import { Route } from "../types";
import { getBouncers } from "../util/cache";

let running = false;

const route: Route = {
  path: "minute/bouncers",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ db, notificationData }) {
        const devices = await notificationData();
        if (running)
          return {
            status: "success",
            data: true,
          };
        running = true;
        try {
          var sent = new Set(
            (await db.collection("data").doc("bouncer_notifications").get())
              .data()
              ?.list.match(/.{8}/g)
          );
          const all_bouncers = await getBouncers(true);
          await db
            .collection("data")
            .doc("bouncer_notifications")
            .set({ list: all_bouncers.map(i => i.hash).join("") });
          var bouncers = all_bouncers
            .filter(i => !sent.has(i.hash))
            .map(i => ({
              ...i,
              type: types.getType(
                "mythological_munzee" in i ? i.mythological_munzee.munzee_logo : i.logo
              ),
            }));
          let all = [];
          for (var device of devices.filter(i => i.bouncers && i.bouncers.enabled)) {
            if (!device.bouncers?.enabled) continue;
            for (var bouncer of bouncers) {
              let found = [];
              const locations = device.locations?.static.slice() ?? [];
              if (device.locations?.dynamic) {
                locations.push({
                  enabled: true,
                  name: "Current Location",
                  latitude: device.locations.dynamic.latitude,
                  longitude: device.locations.dynamic.longitude,
                });
              }

              // Default
              let maxDistance: number = Number(device.bouncers.default);

              // Categories
              for (const tag of device.bouncers.tag.slice().reverse()) {
                if (bouncer.type?.has_tag(TypeTags[tag.tag as keyof typeof TypeTags])) {
                  maxDistance = Number(tag.radius);
                }
              }
              
              // Type
              for (const type of device.bouncers.type.slice().reverse()) {
                if (bouncer.type?.icon === type.icon) maxDistance = Number(type.radius);
              }

              // Starred
              if (
                "mythological_munzee" in bouncer &&
                device.bouncers.starred_users.map(i=>i.user_id).includes(
                  Number(bouncer.mythological_munzee.creator_user_id)
                )
              ) {
                maxDistance = Math.max(maxDistance, Number(device.bouncers.starred));
              }
              for (const location of locations) {
                let distance = computeDistanceBetween(
                  [Number(location.longitude) || 0, Number(location.latitude) || 0],
                  [Number(bouncer.longitude) || 0, Number(bouncer.latitude) || 0]
                );
                if (distance < maxDistance * 1000) found.push({ location, distance });
              }
              if (found.length > 0) {
                all.push({ found, bouncer, device });
              }
            }
          }
          await notification(
            db,
            all.map(i => {
              let title = "Error";
              if ("mythological_munzee" in i.bouncer) {
                title = `${i.bouncer.mythological_munzee.friendly_name} by ${i.bouncer.mythological_munzee.creator_username}`;
              } else if (i.bouncer.type) {
                title = `New ${i.bouncer.type.name} Nearby`;
              } else {
                title = `New ${i.bouncer.logo.slice(49, -4) || "Unknown Type"} Nearby`;
              }
              return {
                to: i.device.token,
                sound: "default",
                title,
                body: i.found
                  .map(
                    location =>
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
          running = false;
          return {
            status: "success",
            data: true,
          };
        } catch (e) {
          console.error(e);
          running = false;
          return {
            status: "error",
            data: false,
          };
        }
      },
    },
  ],
};

export default route;
