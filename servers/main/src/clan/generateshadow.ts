import { request, retrieve } from "../util";
import config from "../config";
import { Route } from "../types";
import mongo from "../util/mongo";
const Airtable = require("airtable");

const groupsdata: {
  [group_id: string]: {
    months: {
      [game_id: string]: {
        name: string;
        clans: {
          clan_id: number;
          clan_name: string;
          shadow_name?: string;
        }[];
      };
    };
    base_id: string;
    admins: string[];
  };
} = {
  cuppaclans: {
    base_id: "app3rWUMkDuHTUIAo",
    admins: ["125914", "51311"],
    months: {
      90: {
        name: "September 2020",
        clans: [
          { clan_id: 1349, clan_name: "coffee" },
          { clan_id: 457, clan_name: "tea" },
          { clan_id: 2042, clan_name: "mocha" },
          { clan_id: 1441, clan_name: "cocoa" },
          { clan_id: 1902, clan_name: "hot choc" },
          { clan_id: 1870, clan_name: "horlicks" },
          { clan_id: -1, clan_name: "shadow", shadow_name: "CuppaClans Shadow Crew" },
        ],
      },
      91: {
        name: "October 2020",
        clans: [
          { clan_id: 1349, clan_name: "coffee" },
          { clan_id: 457, clan_name: "tea" },
          { clan_id: 2042, clan_name: "mocha" },
          { clan_id: 1441, clan_name: "cocoa" },
          { clan_id: 1902, clan_name: "hot choc" },
          { clan_id: 1870, clan_name: "horlicks" },
          { clan_id: -1, clan_name: "shadow", shadow_name: "CuppaClans Shadow Crew" },
        ],
      },
      92: {
        name: "November 2020",
        clans: [
          { clan_id: 1349, clan_name: "coffee" },
          { clan_id: 457, clan_name: "tea" },
          { clan_id: 2042, clan_name: "mocha" },
          { clan_id: 1441, clan_name: "cocoa" },
          { clan_id: 1902, clan_name: "hot choc" },
          { clan_id: 1870, clan_name: "horlicks" },
          { clan_id: -1, clan_name: "shadow", shadow_name: "CuppaClans Shadow Crew" },
        ],
      },
      93: {
        name: "December 2020",
        clans: [
          { clan_id: 1349, clan_name: "coffee" },
          { clan_id: 457, clan_name: "tea" },
          { clan_id: 2042, clan_name: "mocha" },
          { clan_id: 1441, clan_name: "cocoa" },
          { clan_id: 1902, clan_name: "hot choc" },
          { clan_id: 1870, clan_name: "horlicks" },
          { clan_id: -1, clan_name: "shadow", shadow_name: "CuppaClans Shadow Crew" },
        ],
      },
      94: {
        name: "January 2021",
        clans: [
          { clan_id: 1349, clan_name: "coffee" },
          { clan_id: 457, clan_name: "tea" },
          { clan_id: 2042, clan_name: "mocha" },
          { clan_id: 1441, clan_name: "cocoa" },
          { clan_id: 1902, clan_name: "hot choc" },
          { clan_id: 1870, clan_name: "horlicks" },
          { clan_id: -1, clan_name: "shadow", shadow_name: "CuppaClans Shadow Crew" },
        ],
      },
      95: {
        name: "February 2021",
        clans: [
          { clan_id: 1349, clan_name: "coffee" },
          { clan_id: 457, clan_name: "tea" },
          { clan_id: 2042, clan_name: "mocha" },
          { clan_id: 1441, clan_name: "cocoa" },
          { clan_id: 1902, clan_name: "hot choc" },
          { clan_id: 1870, clan_name: "horlicks" },
          { clan_id: -1, clan_name: "shadow", shadow_name: "CuppaClans Shadow Crew" },
        ],
      },
      96: {
        name: "March 2021",
        clans: [
          { clan_id: 1349, clan_name: "coffee" },
          { clan_id: 457, clan_name: "tea" },
          { clan_id: 2042, clan_name: "mocha" },
          { clan_id: 1441, clan_name: "cocoa" },
          { clan_id: 1902, clan_name: "hot choc" },
          { clan_id: 1870, clan_name: "horlicks" },
          { clan_id: -1, clan_name: "shadow", shadow_name: "CuppaClans Shadow Crew" },
        ],
      },
      97: {
        name: "April 2021",
        clans: [
          { clan_id: 1349, clan_name: "coffee" },
          { clan_id: 457, clan_name: "tea" },
          { clan_id: 2042, clan_name: "mocha" },
          { clan_id: 1441, clan_name: "cocoa" },
          { clan_id: 1902, clan_name: "hot choc" },
          { clan_id: 1870, clan_name: "horlicks" },
          { clan_id: 3224, clan_name: "latte" },
          { clan_id: -1, clan_name: "shadow", shadow_name: "CuppaClans Shadow Crew" },
        ],
      },
      98: {
        name: "May 2021",
        clans: [
          { clan_id: 1349, clan_name: "coffee" },
          { clan_id: 457, clan_name: "tea" },
          { clan_id: 2042, clan_name: "mocha" },
          { clan_id: 1441, clan_name: "cocoa" },
          { clan_id: 1902, clan_name: "hot choc" },
          { clan_id: 1870, clan_name: "horlicks" },
          { clan_id: 3224, clan_name: "latte" },
          { clan_id: -1, clan_name: "shadow", shadow_name: "CuppaClans Shadow Crew" },
        ],
      },
    },
  },
  kcat: {
    base_id: "appXMRIBV4VeCWprW",
    admins: ["16968", "15078", "125914"],
    months: {
      90: {
        name: "September 2020",
        clans: [
          { clan_id: 1064, clan_name: "kcat" },
          { clan_id: 2049, clan_name: "cream on first" },
        ],
      },
      91: {
        name: "October 2020",
        clans: [
          { clan_id: 1064, clan_name: "kcat" },
          { clan_id: 2049, clan_name: "cream on first" },
        ],
      },
      92: {
        name: "November 2020",
        clans: [
          { clan_id: 1064, clan_name: "kcat" },
          { clan_id: 2049, clan_name: "cream on first" },
        ],
      },
    },
  },
};

const route: Route = {
  path: "clan/shadow/generate",
  latest: 2,
  versions: [
    {
      version: 2,
      async function({ params: { game_id, group = "cuppaclans" } }) {
        const clansdata = groupsdata[group as keyof typeof groupsdata];
        if (!clansdata) {
          return {
            status: "error",
            data: "Invalid `group`"
          }
        }
        var base = new Airtable({ apiKey: config.airtable_key }).base(clansdata.base_id);
        var token = await retrieve({ user_id: 455935, teaken: false }, 60);
        var all_users = (
          await base(clansdata.months[game_id].name)
            .select({
              view: "Table",
            })
            .all()
        ).map((i: any) => ({
          ...i.fields,
        }));
        if (!clansdata.months[game_id]) {
          return {
            status: "error",
            data: "Invalid `game_id`"
          }
        }
        for (let { clan_id, clan_name, shadow_name } of clansdata.months[game_id].clans) {
          var d = await mongo
            .collection("shadow")
            .findOne({ game_id: game_id.toString(), clan_id: clan_id.toString() });
          var users = all_users.filter((i: any) =>
            (i.Clan || "").toLowerCase().includes(clan_name)
          );
          var user_list: {
            valid: boolean; username: string; user_id: number;
          }[] = (
            await Promise.all(
              users.map(async (user: any) => {
                if (
                  d &&
                  d._members &&
                  d._members.find(
                    (i: any) => i.username.toLowerCase() === user.Username.toLowerCase()
                  )
                ) {
                  return d._members.find(
                    (i: any) => i.username.toLowerCase() === user.Username.toLowerCase()
                  );
                }
                let user_data = (
                  await request("user", { username: user.Username }, token.access_token)
                )?.data;
                if (!user_data) return {
                  valid: false,
                  username: user.Username,
                  user_id: 0,
                };
                return {
                  valid: true,
                  username: user_data.username,
                  user_id: Number(user_data.user_id),
                };
              })
            )
          );
          if (user_list.find(i => !i.valid)) {
            return {
              status: "error",
              data: `Invalid Username: \`${user_list.find(i => !i.valid)?.username}\``
            }
          }
          let final = {
            _members: user_list,
            _updated_at: 0,
            _details: {
              group: group,
              group_admins: clansdata.admins,
            } as {
              group: string;
              group_admins: string[];
              name?: string;
            },
          };
          if (shadow_name) final._details.name = shadow_name;
          await mongo
            .collection("shadow")
            .updateOne({ game_id: game_id.toString(), clan_id: Number(clan_id) }, { $set: final }, {upsert: true});
        }
        return {
          status: "success",
          data: all_users,
        };
      },
    },
  ],
};
export default route;
