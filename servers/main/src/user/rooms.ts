import { Route } from "../types";
import { request } from "../util";
import { UserDeploys } from "@cuppazee/api/user/deploys";

const route: Route = {
  path: "user/rooms",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { user_id, access_token } }) {
        var rooms: NonNullable<UserDeploys["response"]["data"]>["munzees"] = [];
        for (let page = 0; page < 20; page++) {
          let und = (await request("user/deploys", { user_id, page, type_id: 971 }, access_token))?.data;
          if (!und?.has_more) {
            page = 100;
          }
          rooms = rooms.concat(und ? und.munzees : []);
        }
        for (let page = 0; page < 20; page++) {
          let und = (await request("user/deploys", { user_id, page, type_id: 2184 }, access_token))?.data;
          if (!und?.has_more) {
            page = 100;
          }
          rooms = rooms.concat(und ? und.munzees : []);
        }
        
        return {
          status: "success",
          data: {
            rooms: rooms.sort((a,b) => new Date(a.deployed_at).valueOf() - new Date(b.deployed_at).valueOf())
          },
        };
      },
    },
  ],
};

export default route;
