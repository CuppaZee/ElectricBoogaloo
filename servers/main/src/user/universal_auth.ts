import fetch from "node-fetch";
import crypto from "crypto";
import { URLSearchParams } from "url";
import config from "../config";
import { Route } from "../types";
import mongo from "../util/mongo";

const route: Route = {
  path: "universal/auth",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { code, state }, res }) {
        try {
          const state_data = JSON.parse(state || "{}");
          const d = await fetch("https://api.munzee.com/oauth/login", {
            method: "POST",
            body: new URLSearchParams({
              client_id: config.universal.client_id,
              client_secret: config.universal.client_secret,
              grant_type: "authorization_code",
              code,
              redirect_uri: config.universal.redirect_uri,
            }),
          });
          const data = await d.json();
          const teaken = crypto.randomBytes(20).toString("hex");
          const user_d = await fetch("https://api.munzee.com/user", {
            method: "POST",
            body: new URLSearchParams({
              access_token: data.data.token.access_token,
              data: JSON.stringify({
                user_id: data.data.user_id,
              }),
            }),
          });
          const user_data = await user_d.json();
          const { username, user_id } = user_data.data;

          const doc_data = await mongo.collection("auth").findOne({ application: "universal", user_id: user_id });

          let user_number = doc_data?.user_number;
          let user_count = 0;

          if (doc_data) {
            
            user_count = (await mongo
              .collection("counters")
              .findOne({ id: "auth_universal" })).value;
            await mongo
              .collection("auth")
              .updateOne(
                {
                  application: "universal",
                  user_id: user_id,
                },
                {
                  $set: {
                    application: "universal",
                    token: data.data.token,
                    user_id,
                    username,
                    teakens: [...(doc_data?.teakens ?? []), teaken],
                  },
                }
              );
          } else {
            const count = await mongo.collection("counters").findOneAndUpdate(
              { id: "auth_universal" },
              { $inc: { value: 1 } }
            );
            user_number = (count.value?.value ?? -2) + 1;
            user_count = user_number;
            await mongo.collection("auth").insertOne({
              application: "universal",
              token: data.data.token,
              user_id,
              username,
              teakens: [teaken],
              user_number,
            })
          }

          res.redirect(
            `${state_data.redirect}?teaken=${encodeURIComponent(
              teaken
            )}&username=${username}&user_id=${user_id}&state=${encodeURIComponent(state)}`
          );

          const platform =
            {
              android: "🤖",
              ios: "🍎",
              web: "🌐",
            }[state_data.platform as "android" | "ios" | "web"] || `[${state_data.platform}] `;
          let discordmessage = ``;
          if (doc_data) {
            discordmessage = `${platform}🔁 ${username} | ${user_count} Users [#${user_number}]`;
          } else {
            discordmessage = `${platform}🆕 ${username} | User #${user_number}`;
          }
          await fetch(config.discord.authorization_universal, {
            method: "POST",
            body: new URLSearchParams({
              content: discordmessage,
            }),
          });
          return {
            norespond: true,
          };
        } catch (e) {
          console.error(e);
          res.send(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Sorry</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                body {
                  margin: 0!important;
                  background-color: #e7f7ec;
                  text-align: center;
                  padding: 8px;
                  font-family: 'Roboto', sans-serif;
                }
                h1 {
                  margin: 0;
                }
                p {
                  margin: 0;
                }
              </style>
            </head>
            <body>
              <h1>Oops!</h1>
              <p>We need to be able to read your Munzee Account data. Please close this popup and log in again.</h1>
            </body>
            </html>`
          );
          return {
            norespond: true,
          };
        }
      },
    },
  ],
};
export default route;
