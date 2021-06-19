import { Route } from "../types";
import { gameID } from "../util";
import mongo from "../util/mongo";

const route: Route = {
  path: "user/cuppazee",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { user_id } }) {
        const shadowClan = await mongo.collection("shadow").findOne({
          game_id: gameID().toString(),
          _members: { $elemMatch: { user_id: Number(user_id) } }
        });
        
        return {
          status: "success",
          data: {
            shadowClan: shadowClan ? {
              clan_id: shadowClan.clan_id,
              ...shadowClan._details
            } : null,
          },
        };
      },
    },
  ],
};

export default route;
