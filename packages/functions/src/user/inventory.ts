import { Route } from "../types";
import { request } from "../util";

const route: Route = {
  path: "user/inventory",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { access_token } }) {
        var [undeployed, credits, history, boosters] = await Promise.all([
          request("user/undeploys/count", {}, access_token),
          request("user/credits", {}, access_token),
          request("user/credits/history", {}, access_token),
          request("user/boosters/credits", {}, access_token),
        ] as const);
        const formattedUndeployed = undeployed?.data?.map(i => ({
          type: i.pin_icon.match(/\/([^./]+).png/)?.[1],
          amount: i.count,
        })) ?? [];
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
