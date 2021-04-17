import fetch from "node-fetch";
import { Route } from "../types";
import { request } from "../util";

async function getQrates(token: string) {
  try {
    const response = await fetch(`https://api.munzee.com/qrates?access_token=${encodeURIComponent(token)}`);
    return (await response.json()).data;
  } catch (e) {
    return null;
  }
}

const route: Route = {
  path: "user/inventory",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { access_token } }) {
        var [undeployed, credits, history, boosters, qrates] = await Promise.all([
          request("user/undeploys/count", {}, access_token),
          request("user/credits", {}, access_token),
          request("user/credits/history", {}, access_token),
          request("user/boosters/credits", {}, access_token),
          getQrates(access_token)
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
            qrates,
          },
        };
      },
    },
  ],
};

export default route;
