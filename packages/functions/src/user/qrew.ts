import { UserArchivedMunzee } from "@cuppazee/api/user/archived";
import { Route } from "../types";
import { retrieve, request } from "../util";
import typesDB from "@cuppazee/types";
import { DestinationType, TypeState } from "@cuppazee/types/lib/munzee";
import day from "../util/day";

const route: Route = {
  path: "user/qrew",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { username, user_id, from } }) {
        function convertState(state?: TypeState) {
          if (!from || !from.includes("_1.2_")) {
            return state;
          }
          if (state === TypeState.Physical) {
            return "physical"
          }
          return "virtual";
        }
        var token = await retrieve({ user_id, teaken: false }, 60);
        try {
          var [captures, deploys, capture_dates, deploy_dates] = await Promise.all([
            request("statzee/player/captures/types", { username }, token.access_token),
            request("statzee/player/deploys/types", { username }, token.access_token),
            request("statzee/player/captures", { username }, token.access_token),
            request("statzee/player/deploys", { username }, token.access_token),
          ] as const);
        } catch (e) {
          return {
            status: "error",
            error_message: "munzee_api_5xx",
          };
        }
        var archived: UserArchivedMunzee[] = [];
        for (var page = 0; page < 20; page++) {
          let und = (await request("user/archived", { page }, token.access_token))?.data;
          if (!und?.has_more) {
            page = 100;
          }
          archived = archived.concat(und ? und.munzees : []);
        }
        const formattedArchived = archived
          .map(i => i.capture_type_id)
          .reduce((obj, item) => {
            obj[item] = (obj[item] || 0) + 1;
            return obj;
          }, {} as { [key: string]: number });
        var cap = captures?.data?.types?.map(i => {
          var g = typesDB.getType(i.name);
          return {
            type: Number(i.capture_type_id),
            state: g?.meta.destination_type === DestinationType.Room ? "room" : convertState(g?.state),
            name: i.name,
            icon: g?.icon,
            amount: Number(i.captures),
          };
        });
        var dep = deploys?.data?.types.map(i => {
          var g = typesDB.getType(i.name);
          return {
            type: Number(i.capture_type_id),
            state: g?.meta.destination_type === DestinationType.Room ? "room" : convertState(g?.state),
            name: i.name,
            icon: g?.icon,
            amount: Number(i.munzees) - (formattedArchived[i.capture_type_id] || 0),
          };
        });
        var recent_cap = Object.entries(capture_dates?.data ?? {}).sort(
          (a, b) => new Date(b[0]).valueOf() - new Date(a[0]).valueOf()
        )[0]?.[0];
        var recent_dep = Object.entries(deploy_dates?.data ?? {}).sort(
          (a, b) => new Date(b[0]).valueOf() - new Date(a[0]).valueOf()
        )[0]?.[0];
        var this_month = day().tz("America/Chicago").date() < 15;
        var next_check = day()
          .tz("America/Chicago")
          .add(this_month ? 0 : 1, "month")
          .date(this_month ? 15 : 1)
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0);
        var earliest = day(next_check).add(-14, "day");
        return {
          status: "success",
          data: {
            cap,
            dep,
            recent_cap: day.tz(recent_cap, "America/Chicago") >= earliest ? recent_cap : null,
            recent_dep: day.tz(recent_dep, "America/Chicago") >= earliest ? recent_dep : null,
            recent_capt: recent_cap,
            recent_depl: recent_dep,
            next_check: next_check.format(),
            earliest: earliest.format(),
          },
        };
      },
    },
  ],
};

export default route;
