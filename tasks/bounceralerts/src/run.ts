import { computeDistanceBetween, computeHeading } from "spherical-geometry-js";
import { MongoClient } from "mongodb";
import config from "./config"
import { TypeTags, loadFromArrayBuffer, loadFromLzwJson, CuppaZeeDB } from "@cuppazee/db";
import fetch from "node-fetch";

const dbCache: { value: CuppaZeeDB } = {
  value: new CuppaZeeDB([], [], []),
};

async function loadDB() {
  try {
    const response = await fetch(`https://db.cuppazee.app/lzwmsgpack/`);
    if (!response.ok) throw "e";
    const data = await response.arrayBuffer();
    if (data.byteLength > 0) {
      const { db } = loadFromArrayBuffer(data);
      dbCache.value = db;
    }
  } catch (e) {
    const response = await fetch(`https://db.cuppazee.app/lzw/`);
    if (!response.ok) throw "e";
    const data = await response.text();
    if (data.length > 0) {
      const { db } = loadFromLzwJson(data);
      dbCache.value = db;
    }
  }
}

type DeviceNotificationUser = {
  user_id: number;
  username: string;
  primary?: boolean;
  streaksaver?: {
    time: number;
    types: ("deploy" | "capture" | "poi")[];
  };
};

type DeviceNotificationStaticLocation = {
  enabled: boolean;
  latitude: string;
  longitude: string;
  name: string;
};

type DeviceNotificationSettings = {
  type: "expo";
  token: string;

  users: DeviceNotificationUser[];

  locations?: {
    dynamic?: {
      latitude: number;
      longitude: number;
    };
    static: DeviceNotificationStaticLocation[];
  };

  bouncers?: {
    enabled: boolean;
    default: string;
    starred: string;
    overrides: (
      | {
          tag: string;
          radius: string;
        }
      | {
          icon: string;
          radius: string;
        }
    )[];
  };

  starred_users?: {
    user_id: number;
    username: string;
  }[];

  munzee_blog?: boolean;
  imperial?: boolean;

  platform?: "android_2.0.1" | "android_2.0.2" | "ios";

  dnrCount?: number;
};


interface MunzeeSpecial {
  munzee_id: string;
  logo: string;
  latitude: string;
  longitude: string;
  friendly_name: string;
  time_placed: string;
  full_url: string;
  special_good_until: number;
}

interface MunzeeSpecialBouncer {
  munzee_id: string;
  latitude: string;
  longitude: string;
  friendly_name: string;
  time_placed: string;
  full_url: string;
  mythological_munzee: {
    friendly_name: string;
    code: string;
    creator_user_id: string;
    creator_username: string;
    munzee_id: string;
    munzee_logo: string;
    capture_type_id: string;
  };
  special_good_until: number;
}

async function getBouncers(): Promise<((MunzeeSpecial | MunzeeSpecialBouncer) & {
    hash: string;
    endpoint: "regular" | "mythological" | "pouchcreatures" | "flat" | "bouncers" | "retired";
  })[]> {
  const response = await fetch("https://server.cuppazee.app/bouncers/all");
  const data = await response.json();
  console.log('Got Bouncers:', data.data.length);
  return data.data;
}

async function notificationData(options?: any): Promise<DeviceNotificationSettings[]> {
  return (
    await mongo
      .collection<DeviceNotificationSettings>("notification_settings")
      .find(options ?? {})
      .toArray()
  ).filter(i => !i.dnrCount || i.dnrCount < 100);
}


const uri = config.mongoURI;
// Create a new MongoClient
const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoClient.connect();

const mongo = mongoClient.db("cuppazee");

import { Expo, ExpoPushMessage } from "expo-server-sdk";

const expo = new Expo();

async function notification(messages: ExpoPushMessage[]) {
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let to = chunk.map(i => i.to).flat();
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(`Sent Notifications:`, ticketChunk.length);
      tickets.push(...ticketChunk.map((i, n) => ({ ...i, token: to[n] })));
    } catch (error) {
      console.error(error);
    }
  }

  return await mongo.collection("notification_tickets").insertOne({
    tickets,
    sent_at: Date.now(),
  });
}

async function getLease() {
  const result = await mongo
    .collection("notification_feeds")
    .findOneAndUpdate(
      { id: "bouncer_alerts", locked: { $lt: Date.now() } },
      { $set: { locked: Date.now() + 300000 } }
    );
  if (result.value) {
    return result.value;
  }
  return null;
}

(async function () {
  await loadDB();
  const list = await getLease();
  const leaseEnd = Date.now() + 300000;

  if (!list) return;

  const devices = await notificationData({
    "bouncers.enabled": true,
  });
  try {
    // Calculate Notifications to Send
    const sent = {
      regular: new Set(list.regular?.match(/.{8}/g)),
      mythological: new Set(list.mythological?.match(/.{8}/g)),
      pouchcreatures: new Set(list.pouchcreatures?.match(/.{8}/g)),
      flat: new Set(list.flat?.match(/.{8}/g)),
      bouncers: new Set(list.bouncers?.match(/.{8}/g)),
      retired: new Set(list.retired?.match(/.{8}/g)),
    };
    const all_bouncers = await getBouncers();
    var bouncers = all_bouncers
      .filter(i => !sent[i.endpoint].has(i.hash))
      .map(i => ({
        ...i,
        type: dbCache.value.getType(
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

    if (Date.now() > leaseEnd - 60000) return;

    // Send Notifications
    await notification(
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
              image: `https://images.cuppazee.app/types/64/${("mythological_munzee" in i.bouncer
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
    await mongo.collection("notification_feeds").updateOne(
      { id: "bouncer_alerts" },
      {
        $set: {
          locked: 0,
          regular: sendLists.regular || list.regular,
          mythological: sendLists.mythological || list.mythological,
          pouchcreatures: sendLists.pouchcreatures || list.pouchcreatures,
          flat: sendLists.flat || list.flat,
          bouncers: sendLists.bouncers || list.bouncers,
          retired: sendLists.retired || list.retired,
        },
      }
    );

    return;
  } catch (e) {
    console.error(e);
    return;
  }
})();