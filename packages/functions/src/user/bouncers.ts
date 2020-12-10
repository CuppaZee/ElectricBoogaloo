
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var {retrieve,request} = require("../util");
var path = require("path");
var geocoder = require('offline-geocoder')({ database: path.join(__dirname,'../util/geolocate/db.sqlite') })
var geoTz = require('geo-tz')

module.exports = {
  path: "user/bouncers",
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
        params: { user_id },
        db
      }: any) {
        var token = await retrieve(db, {user_id:125914,teaken:false}, 60);
        var data = await Promise.all([
          request('user/deploys',{user_id,type_id:505508},token.access_token),
          request('munzee/specials/mythological',{},token.access_token),
          request('munzee/specials/pouchcreatures',{},token.access_token),
          request('munzee/specials/flat',{},token.access_token),
          request('munzee/specials/bouncers',{},token.access_token)
        ]);
        for(var q = 0;q < 5&&data[0].has_more;q++) {
          var x = await request('user/deploys',{user_id,type_id:505508,page:q+1},token.access_token);
          if(!x.has_more) data[0].has_more = false;
          data[0].munzees = data[0].munzees.concat(x.munzees)
        }
        var body = [].concat(...data.slice(1));
        var deps = await Promise.all(data[0].munzees.slice().reverse().map(async (i: any,index: any)=>{
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'mythological_munzee' does not exist on t... Remove this comment to see the full error message
          i.bouncer = body.find(b=>((b||{}).mythological_munzee||{}).munzee_id.toString()===i.munzee_id.toString());
          if(i.bouncer) {
            i.location = await geocoder.reverse(i.bouncer.latitude, i.bouncer.longitude);
            i.timezone = geoTz(i.bouncer.latitude, i.bouncer.longitude);
          }
          // if(i.bouncer&&index<10) i.location = JSON.parse(await rp(`https://api.mapbox.com/geocoding/v5/mapbox.places/${i.bouncer.longitude},${i.bouncer.latitude}.json?access_token=ACCESS_TOKEN_HERE`));
          return i;
        }));
        return {
          status: "success",
          data: deps
        }
      },
    },
  ],
};
