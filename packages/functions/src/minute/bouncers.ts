import types, { TypeTags } from "@cuppazee/types";
import { computeDistanceBetween, computeHeading } from "spherical-geometry-js";
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
              const locations = device.locations?.static.filter(i => i.enabled) ?? [];
              if (device.locations?.dynamic) {
                locations.push({
                  enabled: true,
                  name: "Current Location",
                  latitude: device.locations.dynamic.latitude.toString(),
                  longitude: device.locations.dynamic.longitude.toString(),
                });
              }

              // Default
              let maxDistance: number = Number(device.bouncers.default);

              // Overrides
              for (const override of device.bouncers.overrides.slice().reverse()) {
                if (
                  ("tag" in override &&
                    bouncer.type?.has_tag(TypeTags[override.tag as keyof typeof TypeTags])) ||
                  ("icon" in override && bouncer.type?.icon === override.icon)
                ) {
                  maxDistance = Number(override.radius);
                }
              }

              // Starred
              if (
                "mythological_munzee" in bouncer &&
                device.starred_users
                  ?.map(i => i.user_id)
                  .includes(Number(bouncer.mythological_munzee.creator_user_id))
              ) {
                maxDistance = Math.max(maxDistance, Number(device.bouncers.starred));
              }
              for (const location of locations) {
                let distance = computeDistanceBetween(
                  [Number(location.longitude) || 0, Number(location.latitude) || 0],
                  [Number(bouncer.longitude) || 0, Number(bouncer.latitude) || 0]
                );
                if (distance < maxDistance * (device.imperial ? 1609 : 1000))
                  found.push({
                    location,
                    distance,
                    direction: computeHeading(
                      [Number(location.longitude) || 0, Number(location.latitude) || 0],
                      [Number(bouncer.longitude) || 0, Number(bouncer.latitude) || 0]
                    ),
                  });
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
              const onThisHost = all_bouncers.filter(b => b.full_url === i.bouncer.full_url).length;
              return {
                to: i.device.token,
                sound: "default",
                title: title + (onThisHost > 1 ? ` [${onThisHost}/6]` : ""),
                body: `At ${i.bouncer.friendly_name} by ${
                  i.bouncer.full_url.split("/")[4]
                }\n${i.found
                  .map(location => {
                    let direction = ["↓ S", "↙ SW", "← W", "↖ NW", "↑ N", "↗ NE", "→ E", "↘ SE"][
                      Math.floor((location.direction + 202.5) / 45) % 8
                    ];
                    let distance;
                    if (i.device.imperial) {
                      let feet = location.distance * 3.28084;
                      let miles = feet * 0.000189394;
                      if (feet < 4000) {
                        distance = `${Math.round(feet + Number.EPSILON)}ft`;
                      } else {
                        distance = `${Math.round((miles + Number.EPSILON) * 100) / 100}mi`;
                      }
                    } else {
                      let kms = location.distance * 1000;
                      if (location.distance < 700) {
                        distance = `${Math.round(location.distance + Number.EPSILON)}m`;
                      } else {
                        distance = `${Math.round((kms + Number.EPSILON) * 100) / 100}km`;
                      }
                    }
                    return `${distance} ${direction} from ${location.location.name}`;
                  })
                  .join("\n")}`,
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
