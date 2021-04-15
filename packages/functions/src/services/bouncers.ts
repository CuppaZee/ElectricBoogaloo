import types, { TypeTags } from "@cuppazee/types";
import { computeDistanceBetween, computeHeading } from "spherical-geometry-js";
import notification from "../util/notification";
import { getBouncers } from "../util/cache";
import db from "../util/db";
import notificationData from "../util/notificationSettings";

const leaseTime = 5 * 60 * 1000; // 5m

function getData() {
  const ref = db.collection("data").doc("bouncer_notifications");
  return db.runTransaction(transaction => {
    return transaction.get(ref).then(doc => {
      if (doc.data()?.lease && new Date() < doc.data()?.lease) {
        return { onLease: true };
      }
      const leasedUntil = new Date(new Date().getTime() + leaseTime);
      transaction.update(ref, { lease: leasedUntil });
      return {
        leasedUntil,
        list: doc.data()?.sent_lists,
      };
    });
  });
}

export default async function () {
  const { onLease, list, leasedUntil } = await getData();

  if (onLease) return;

  const devices = await notificationData();
  try {
    // Calculate Notifications to Send
    const sent = {
      regular: new Set(list.regular.match(/.{8}/g)),
      mythological: new Set(list.mythological.match(/.{8}/g)),
      pouchcreatures: new Set(list.pouchcreatures.match(/.{8}/g)),
      flat: new Set(list.flat.match(/.{8}/g)),
      bouncers: new Set(list.bouncers.match(/.{8}/g)),
      retired: new Set(list.retired.match(/.{8}/g)),
    };
    const all_bouncers = await getBouncers(true);
    var bouncers = all_bouncers
      .filter(i => !sent[i.endpoint].has(i.hash))
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
          locations.unshift({
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

    if (Date.now() > (leasedUntil?.valueOf() || 0) - 60000) return;

    // Send Notifications
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
        if (onThisHost > 1) {
          title = title + ` [${onThisHost}/6]`;
        }
        const body = `${i.found
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
              let kms = location.distance / 1000;
              if (location.distance < 700) {
                distance = `${Math.round(location.distance + Number.EPSILON)}m`;
              } else {
                distance = `${Math.round((kms + Number.EPSILON) * 100) / 100}km`;
              }
            }
            return `${distance} ${direction} from ${location.location.name}`;
          })
          .join("\n")}\nAt ${i.bouncer.friendly_name} by ${i.bouncer.full_url.split("/")[4]}`;
        if (i.device.platform === "android_2.0.2") {
          return {
            to: i.device.token,
            data: {
              type: "bouncer",
              path: `/munzee/${i.bouncer.munzee_id}`,
              title,
              description: body,
              latitude: Number(i.bouncer.latitude),
              longitude: Number(i.bouncer.longitude),
              image: `https://icons.cuppazee.app/64/${("mythological_munzee" in i.bouncer
                ? i.bouncer.mythological_munzee.munzee_logo
                : i.bouncer.logo
              ).slice(49, -4)}.png`,
            },
          };
        }
        return {
          to: i.device.token,
          sound: "default",
          title,
          body,
          data: {
            path: `/munzee/${i.bouncer.munzee_id}`,
          },
        };
      })
    );

    // Update Database
    const sendLists = all_bouncers.reduce(
      (a, b) => {
        return {
          ...a,
          [b.endpoint]: a[b.endpoint] + b.hash,
        };
      },
      {
        regular: "",
        mythological: "",
        pouchcreatures: "",
        flat: "",
        bouncers: "",
        retired: "",
      }
    );
    await db
      .collection("data")
      .doc("bouncer_notifications")
      .set({
        sent_lists: {
          regular: sendLists.regular || list.regular,
          mythological: sendLists.mythological || list.mythological,
          pouchcreatures: sendLists.pouchcreatures || list.pouchcreatures,
          flat: sendLists.flat || list.flat,
          bouncers: sendLists.bouncers || list.bouncers,
          retired: sendLists.retired || list.retired,
        },
      });

    return;
  } catch (e) {
    console.error(e);
    return;
  }
}
