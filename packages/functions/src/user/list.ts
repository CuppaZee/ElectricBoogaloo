import { Route } from "../types";

const route: Route = {
  path: "user/list",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        db
      }: any) {
        var data = (await db.collection('data').doc('user_list').get()).data();
        return {
          status: "success",
          data
        }
      }
    }
  ]
}
export default route;