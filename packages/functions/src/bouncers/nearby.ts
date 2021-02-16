import { computeDistanceBetween, computeHeading } from "spherical-geometry-js";
import { Route } from "../types";
import { getBouncers } from "../util/cache";
import notificationSettings from "../util/notificationSettings";
import types, { TypeTags } from "@cuppazee/types";

const route: Route = {
  path: "bouncers/nearby",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { token, longitude, latitude } }) {
        const devices = await notificationSettings();
        const device = devices.find(i => i.token === token)?.bouncers ?? {
          default: "10",
          starred: "",
          overrides: [],
        };
        const starred_users = devices.find(i => i.token === token)?.starred_users ?? [];
        const imperial = devices.find(i => i.token === token)?.imperial || false;
        const all_bouncers = await getBouncers();
        const bouncers = Object.values(all_bouncers).map(i => ({
          ...i,
          type: types.getType(
            "mythological_munzee" in i ? i.mythological_munzee.munzee_logo : i.logo
          ),
          distance: computeDistanceBetween(
            [Number(longitude) || 0, Number(latitude) || 0],
            [Number(i.longitude) || 0, Number(i.latitude) || 0]
          )
        }));
        return {
          status: "success",
          data: bouncers.filter(bouncer => {
            // Default
            let maxDistance: number = Number(device.default);

            // Overrides
            for (const override of device.overrides.slice().reverse()) {
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
              starred_users
                ?.map(i => i.user_id)
                .includes(Number(bouncer.mythological_munzee.creator_user_id))
            ) {
              maxDistance = Math.max(maxDistance, Number(device.starred));
            }
            return bouncer.distance < maxDistance * (imperial ? 1609 : 1000);
          }).map(i => {
            let direction = ["↓ S", "↙ SW", "← W", "↖ NW", "↑ N", "↗ NE", "→ E", "↘ SE"][
              Math.floor(((computeHeading(
                [Number(longitude) || 0, Number(latitude) || 0],
                [Number(i.longitude) || 0, Number(i.latitude) || 0]
              )) + 202.5) / 45) % 8
            ];
            let distance;
            if (imperial) {
              let feet = i.distance * 3.28084;
              let miles = feet * 0.000189394;
              if (feet < 4000) {
                distance = `${Math.round(feet + Number.EPSILON)}ft`;
              } else {
                distance = `${Math.round((miles + Number.EPSILON) * 100) / 100}mi`;
              }
            } else {
              let kms = i.distance / 1000;
              if (i.distance < 700) {
                distance = `${Math.round(i.distance + Number.EPSILON)}m`;
              } else {
                distance = `${Math.round((kms + Number.EPSILON) * 100) / 100}km`;
              }
            }
            return {
              ...i,
              direction: direction,
              distanceStr: distance,
              type: undefined,
            };
          }),
        };
      },
    },
  ],
};

export default route;
