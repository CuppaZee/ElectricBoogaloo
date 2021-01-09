import { UserUndeploysMunzee } from "@cuppazee/api/user/undeploys";
import { Route } from "../types";
import { request } from "../util";

const route: Route = {
  path: "user/inventory",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { access_token } }: any) {
        var [credits, history, boosters] = await Promise.all([
          request("user/credits", {}, access_token),
          request("user/credits/history", {}, access_token),
          request("user/boosters/credits", {}, access_token),
        ] as const);
        var undeployed: UserUndeploysMunzee[] = [];
        for (var page = 0; page < 20; page++) {
          let und = (await request("user/undeploys", { page }, access_token))
            ?.data;
          if (!und?.has_more) {
            page = 100;
          }
          undeployed = undeployed.concat(und ? und.munzees : []);
        }
        const formattedUndeployed = Object.entries(
          undeployed
            .map((i) => i.pin_icon.match(/\/([^./]+).png/)?.[1])
            .reduce((obj, item) => {
              obj[item ?? ""] = (obj[item ?? ""] || 0) + 1;
              return obj;
            }, {} as { [key: string]: number })
        ).map((i) => ({ type: i[0], amount: i[1] }));
        return {
          status: "success",
          data: {
            credits: credits?.data,
            history: history?.data,
            boosters: boosters?.data,
            undeployed: formattedUndeployed,
          },
        };
      },
    },
  ],
};

export default route;
