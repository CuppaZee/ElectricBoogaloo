
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'fetch'.
var fetch = require("node-fetch");
// @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
var crypto = require("crypto");
// @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
var { URLSearchParams } = require("url");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
var config = require('../config.json');
var firebase = require("firebase-admin");

module.exports = {
  path: "auth/auth/pine",
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
        teamsData,
        res,
        db
      }: any) {
        try {
          res.send(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Thank you</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                body {
                  margin: 0!important;
                  background-color: #e7f7ec;
                  text-align: center;
                  padding: 8px;
                  font-family: 'Roboto', sans-serif;
                }
                h2 {
                  margin: 0;
                }
                p {
                  margin: 0;
                }
              </style>
            </head>
            <body>
              <h2>These competition is now closed.</h2>
              <p>You are no longer able to enter.</p><br/>
              <button onclick="window.location.href = '${              
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'state_data'.
state_data.redirect}'">Close</button>
            </body>
            </html>`
          );
          return {
            norespond: true,
          }

          // var state_data = JSON.parse(state || "{}");
          // var d = await fetch("https://api.munzee.com/oauth/login", {
          //   method: "POST",
          //   body: new URLSearchParams({
          //     client_id: config.pine.client_id,
          //     client_secret: config.pine.client_secret,
          //     grant_type: "authorization_code",
          //     code,
          //     redirect_uri: config.pine.redirect_uri,
          //   }),
          // });
          // var data = await d.json();
          // var teaken = crypto.randomBytes(20).toString("hex");
          // var user_d = await fetch("https://api.munzee.com/user", {
          //   method: "POST",
          //   body: new URLSearchParams({
          //     access_token: data.data.token.access_token,
          //     data: JSON.stringify({
          //       user_id: data.data.user_id
          //     })
          //   }),
          // });
          // var user_data = await user_d.json();
          // var { username, user_id } = user_data.data;

          // var doc = db.collection('auth_pine').doc(user_id.toString())
          // var doc_data = (await doc.get()).data();

          // await doc.set({
          //   token: data.data.token,
          //   user_id,
          //   teakens: [
          //     ...(doc_data ? (doc_data.teakens || []) : []),
          //     teaken
          //   ]
          // })

          // var otherTeam = (await teamsData()).find(i=>(i.list && i.list.some(i=>i.n === username)));
          // if(otherTeam) {
          //   if(otherTeam.team_id === "pine" && !otherTeam.fixed[user_id]) {
          //     db.collection('data').doc('user_list_pine').update({
          //       [`fixed.${user_id}`]: true
          //     })
          //     res.send(
          //       `<!DOCTYPE html>
          //       <html lang="en">
          //       <head>
          //         <meta charset="UTF-8">
          //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
          //         <title>Thank you</title>
          //         <style>
          //           @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
          //           body {
          //             margin: 0!important;
          //             background-color: #e7f7ec;
          //             text-align: center;
          //             padding: 8px;
          //             font-family: 'Roboto', sans-serif;
          //           }
          //           h2 {
          //             margin: 0;
          //           }
          //           p {
          //             margin: 0;
          //           }
          //         </style>
          //       </head>
          //       <body>
          //         <h2>Thank you for opting-in again</h2>
          //         <p>${username} is in Team ${otherTeam.team_id.toUpperCase()}.</h1><br/>
          //         <button onclick="window.location.href = '${state_data.redirect}?teaken=${encodeURIComponent(
          //           teaken
          //         )}&username=${username}&user_id=${user_id}&status=reopt&state=${encodeURIComponent(state)}'">Done</button>
          //       </body>
          //       </html>`
          //     );
          //     return {
          //       norespond: true,
          //     }
          //   }
          //   res.send(
          //     `<!DOCTYPE html>
          //     <html lang="en">
          //     <head>
          //       <meta charset="UTF-8">
          //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
          //       <title>Sorry</title>
          //       <style>
          //         @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
          //         body {
          //           margin: 0!important;
          //           background-color: #e7f7ec;
          //           text-align: center;
          //           padding: 8px;
          //           font-family: 'Roboto', sans-serif;
          //         }
          //         h2 {
          //           margin: 0;
          //         }
          //         p {
          //           margin: 0;
          //         }
          //       </style>
          //     </head>
          //     <body>
          //       <h2>You're already in a team</h2>
          //       <p>${username} is already in Team ${otherTeam.team_id.toUpperCase()}. You don't need to opt-in again.</h1><br/>
          //       <button onclick="window.location.href = '${state_data.redirect}?teaken=${encodeURIComponent(
          //         teaken
          //       )}&username=${username}&user_id=${user_id}&status=already&state=${encodeURIComponent(state)}'">Done</button>
          //     </body>
          //     </html>`
          //   );
          //   return {
          //     norespond: true,
          //   }
          // }

          // res.redirect(
          //   `${state_data.redirect}?teaken=${encodeURIComponent(
          //     teaken
          //   )}&username=${username}&user_id=${user_id}&state=${encodeURIComponent(state)}`
          // );


          // var platform = {
          //   android: "🤖",
          //   ios: "🍎",
          //   web: "🌐"
          // }[state_data.platform] || `[${state_data.platform}] `;
          // var { list } = (await db.collection('data').doc('user_list_pine').get()).data();
          // var discordmessage = `[PINE] ${platform} ${username} | User #${list.length + 1}`;
          // db.collection('data').doc('user_list_pine').update({
          //   list: firebase.firestore.FieldValue.arrayUnion({
          //     n: username,
          //     i: user_id
          //   })
          // })
          // await fetch(
          //   config.discord.authorization_competition,
          //   {
          //     method: "POST",
          //     body: new URLSearchParams({
          //       content: discordmessage
          //     })
          //   }
          // )
          // return {
          //   norespond: true,
          // };
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
