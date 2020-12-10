
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var { retrieve, request } = require("../util");
var { get } = require('../util/db');
var radix64 = require('radix-64')();
var spherical = require('spherical');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
var config = require('../config.json');
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'fetch'.
var fetch = require('node-fetch');
var notification = require('../util/notification');

function generateBouncerHash(id: any, timestamp: any) {
  return `${radix64.encodeInt(id,5)}${radix64.encodeInt(timestamp%172800,3)}`
}

module.exports = {
  path: "minute/bouncers",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        db,
        notificationData
      }: any) {
        const devices = await notificationData();
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        var sent = new Set((await db.collection('data').doc('bouncer_notifications').get()).data().list.match(/.{8}/g));
        var data = await Promise.all([
          request('munzee/specials',                {}, token.access_token),
          request('munzee/specials/mythological',   {}, token.access_token),
          request('munzee/specials/pouchcreatures', {}, token.access_token),
          request('munzee/specials/flat',           {}, token.access_token),
          request('munzee/specials/bouncers',       {}, token.access_token),
          request('munzee/specials/retired',        {}, token.access_token),
        ]);
        // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
        var body = [].concat(...data).map(i=>({...i,hash:generateBouncerHash(Number(i.mythological_munzee?i.mythological_munzee.munzee_id:i.munzee_id), i.special_good_until)}));
        await db.collection('data').doc('bouncer_notifications').set({list:body.map(i=>i.hash).join('')});
        var bouncers = body.filter(i=>!sent.has(i.hash));
        let all = [];
        for(var device of devices.filter((i: any) => i.bouncers && i.bouncers.enabled)) {
          for(var bouncer of bouncers) {
            let found = [];
            const locations = device.bouncers.locations;
            if(device.bouncers.dynamic) {
              locations.push({
                name: "Current Location",
                latitude: device.location.latitude,
                longitude: device.location.longitude
              });
            }
            for(var location of locations) {
              let distance = spherical.distance([location.longitude,location.latitude],[Number(bouncer.longitude),Number(bouncer.latitude)])
              if(distance < 5000) found.push({location,distance});
            }
            if(found.length > 0) {
              all.push({found,bouncer,device});
              await fetch(
                config.discord.bouncer_test,
                {
                  method: "POST",
                  body: new URLSearchParams({
                    content: `\`\`\`json\n${JSON.stringify(bouncer, null, 2)}\`\`\`${found.map(i=>`${i.distance}m from ${i.location.name}`)}`
                  })
                }
              )
            }
          }
        }
        await notification(db, all.map(i=>{
          let title = `New ${(i.bouncer.logo||"").slice(49,-4) || "Unknown Type"} Nearby`;
          if(i.bouncer.mythological_munzee) {
            title = `${i.bouncer.mythological_munzee.friendly_name} by ${i.bouncer.mythological_munzee.creator_username}`
          } else {
            var type = get("icon",i.bouncer.logo);
            if(type) {
              title = `New ${type.name} Nearby`;
            }
          }
          return {
            to: i.device.token,
            sound: 'default',
            title,
            body: i.found.map(location=>`${location.distance < 700 ? `${Math.floor(location.distance)}m` : `${Math.floor(location.distance / 10) / 100}km`} from ${location.location.name}`).join('\n'),
            data: {
              type: 'bouncer',
              bouncer: i.bouncer.full_url
            },
          }
        }))
        return {
          status: "success",
          data: true
        }
      },
    },
  ],
};
