import { Route } from "../types";
import mongo from "../util/mongo";

const route: Route = {
  path: "user/list",
  latest: 1,
  versions: [
    {
      version: 1,
      async function() {
        var data = await mongo.db("auth").collection("special").findOne({ id: "user_list" });
        return {
          status: "success",
          data
        }
      }
    }
  ]
}
export default route;