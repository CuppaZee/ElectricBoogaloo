import rss from "rss-parser";
const parser = new rss();
import { MongoClient } from "mongodb";
import config from "./config";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import cheerio from "cheerio";
import nodemailer from "nodemailer";

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

const transporter = nodemailer.createTransport(config.nodemailer);

export default function sendEmail(data: any) {
  return transporter.sendMail({
    from: {
      name: data.name || "CuppaZee App",
      address: "noreply@cuppazee.app",
    },
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });
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

async function sendNotifications(
  { link, title }: any,
  tokens: Promise<DeviceNotificationSettings[]>
) {
  await notification(
    (
      await tokens
    )
      .filter(i => i.munzee_blog)
      .map(i => ({
        to: i.token,
        sound: "default",
        title: "Munzee Blog Post",
        body: title,

        data: {
          url: link,
        },
      }))
  );
}

(async function () {
  var data = await mongo.collection("notification_feeds").findOne({ id: "munzee" });
  if (!data.run)
    return {
      status: "success",
      data: null,
    };
  var update: any = {};
  async function check(x?: boolean) {
    // Munzee
    var feed = await parser.parseURL("https://www.munzeeblog.com/feed/");
    if (feed.items[0].guid !== data.munzee_blog) {
      data.munzee_blog = feed.items[0].guid;
      update.munzee_blog = feed.items[0].guid;

      const promises: Promise<unknown>[] = [];

      console.log("New Munzee Blog", feed.items[0].guid);
      let img = cheerio.load(feed.items[0]["content:encoded"] || "")?.("img")?.[0];
      if (!data.dev) {
        console.log("Sending messages");
        promises.push(sendNotifications(feed.items[0], notificationData()).catch(() =>
          console.log("Sending Notifications Failed")
        ));
        if (!feed.items[0].title?.match(/clan/i) || !feed.items[0].title?.match(/requirement/i)) {
          for (var email of config.emails.munzeeblog) {
            promises.push(sendEmail({
              to: email,
              subject: feed.items[0].title,
              text: feed.items[0].link + "#content",
            }).catch(() => console.log("Error Sending Email")));
          }
        }
      } else {
        console.log("In Dev Mode, not running");
      }
      promises.push(fetch(config.discord.blog, {
        method: "POST",
        body: new URLSearchParams({
          payload_json: JSON.stringify({
            embeds: [
              {
                title: feed.items[0].title,
                url: feed.items[0].link + "#content",
                description:
                  feed.items[0].contentSnippet + `\n[Read More](<${feed.items[0].link}#content>)`,
                image: img
                  ? {
                      url: img && "attribs" in img ? img.attribs.src : "",
                    }
                  : null,
              },
            ],
            content: feed.items[0].title,
          }),
        }),
      }));
      await Promise.all(promises);
    } else {
      console.log("Same Munzee Blog", feed.items[0].guid);
    }

    if (x && Object.keys(update).length > 0) {
      await mongo.collection("notification_feeds").updateOne({ id: "munzee" }, { $set: update });
    }
  }
  await check(true);
  return {
    status: "success",
    data: update,
  };
})()
  .then(() => process.exit())
  .catch(() => process.exit(1));
