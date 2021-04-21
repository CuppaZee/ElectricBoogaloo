import rss from "rss-parser";
const parser = new rss();
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import cheerio from "cheerio";
import config from "../config";
import notification from "../util/notification";
import sendEmail from "../util/nodemailer";
import { Route } from "../types";
import { DeviceNotificationSettings } from "../util/notificationSettings";
import mongo from "../util/mongo";

async function sendNotifications(
  { link, title }: any,
  tokens: Promise<DeviceNotificationSettings[]>
) {
  await notification(
    (await tokens)
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

const route: Route = {
  path: "minute/blogchecker",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ notificationData }) {
        var data = await mongo.db("notifications").collection("feeds").findOne({ id: "munzee" });
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

            console.log("New Munzee Blog", feed.items[0].guid);
            let img = cheerio.load(feed.items[0]["content:encoded"] || "")("img")[0];
            if (!data.dev)
              sendNotifications(feed.items[0], notificationData()).catch(() =>
                console.log("Sending Notifications Failed")
              );
            if (
              !feed.items[0].title?.match(/clan/i) ||
              !feed.items[0].title?.match(/requirement/i)
            ) {
              for (var email of config.emails.munzeeblog) {
                sendEmail({
                  to: email,
                  subject: feed.items[0].title,
                  text: feed.items[0].link + "#content",
                }).catch(() => console.log("Error Sending Email"));
              }
            }
            await fetch(config.discord.blog, {
              method: "POST",
              body: new URLSearchParams({
                payload_json: JSON.stringify({
                  embeds: [
                    {
                      title: feed.items[0].title,
                      url: feed.items[0].link + "#content",
                      description:
                        feed.items[0].contentSnippet +
                        `\n[Read More](<${feed.items[0].link}#content>)`,
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
            });
          } else {
            console.log("Same Munzee Blog", feed.items[0].guid);
          }

          if (x && Object.keys(update).length > 0) {
            await mongo.db("notifications").collection("feeds").updateOne({ id: "munzee" }, update);
          }
        }
        await check(true);
        // await check();
        // await Promise.all([
        //   new Promise((resolve, reject) => {
        //     setTimeout(async function () {
        //       await check();
        //       resolve("Success!");
        //     }, 15000);
        //   }),
        //   new Promise((resolve, reject) => {
        //     setTimeout(async function () {
        //       await check();
        //       resolve("Success!");
        //     }, 30000);
        //   }),
        //   new Promise((resolve, reject) => {
        //     setTimeout(async function () {
        //       await check(true);
        //       resolve("Success!");
        //     }, 45000);
        //   }),
        // ]);
        return {
          status: "success",
          data: update,
        };
      },
    },
  ],
};

export default route;
