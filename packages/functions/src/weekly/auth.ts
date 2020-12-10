
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'fetch'.
var fetch = require("node-fetch");
// @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
var crypto = require("crypto");
// @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
var { URLSearchParams } = require("url");
var config = require('../config.json');
var firebase = require("firebase-admin");

module.exports = {
  path: "auth/auth/team",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "userid",
        },
      },
      async function({
        params: { code, state },
        res,
        db
      }: any) {
        try {

          var state_data = JSON.parse(state || "{}");
          var d = await fetch("https://api.munzee.com/oauth/login", {
            method: "POST",
            body: new URLSearchParams({
              client_id: config.team.client_id,
              client_secret: config.team.client_secret,
              grant_type: "authorization_code",
              code,
              redirect_uri: config.team.redirect_uri,
            }),
          });
          var data = await d.json();
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'randomBytes' does not exist on type 'Cry... Remove this comment to see the full error message
          var teaken = crypto.randomBytes(20).toString("hex");
          var user_d = await fetch("https://api.munzee.com/user", {
            method: "POST",
            body: new URLSearchParams({
              access_token: data.data.token.access_token,
              data: JSON.stringify({
                user_id: data.data.user_id
              })
            }),
          });
          var user_data = await user_d.json();
          var { username, user_id } = user_data.data;

          var doc = db.collection('auth_team').doc(user_id.toString())
          var doc_data = (await doc.get()).data();

          await doc.set({
            token: data.data.token,
            user_id,
            teakens: [
              ...(doc_data ? (doc_data.teakens || []) : []),
              teaken
            ]
          })

          res.redirect(
            `${state_data.redirect}?teaken=${encodeURIComponent(
              teaken
            )}&username=${username}&user_id=${user_id}&state=${encodeURIComponent(state)}`
          );


          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          var platform = {
            android: "🤖",
            ios: "🍎",
            web: "🌐"
          }[state_data.platform] || `[${state_data.platform}] `;
          var { list } = (await db.collection('data').doc('user_list_team').get()).data();
          var discordmessage = "n/a";
          if (list.includes(username)) {
            discordmessage = `${platform}🔁 ${username} | ${list.length} Users [#${list.indexOf(username) + 1}]`
          } else {
            discordmessage = `${platform}🆕 ${username} | User #${list.length + 1}`;
            db.collection('data').doc('user_list_team').update({
              list: firebase.firestore.FieldValue.arrayUnion(username)
            })
          }
          await fetch(
            config.discord.authorization_team,
            {
              method: "POST",
              body: new URLSearchParams({
                content: discordmessage
              })
            }
          )
          return {
            norespond: true,
          };
        } catch (e) {
          console.log(e);
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
          }
        }
      },
    },
  ],
};
