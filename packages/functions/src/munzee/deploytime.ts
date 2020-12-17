import { Route } from "../types";

import { retrieve, request } from "../util";

const route: Route = {
  path: "munzee/deploytime",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { url }, db, res }: any) {
        if (!url) {
          return res.send("Missing URL");
        }
        let modifiedURL = url;
        modifiedURL =
          modifiedURL.match(/\/m\/([^/]+)\/([0-9]+)/) ||
          modifiedURL.match(/\bm\/([^/]+)\/([0-9]+)/);
        if (!modifiedURL) return res.send("Invalid URL");
        modifiedURL = `/m/${url[1]}/${url[2]}`;
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        res.send(
          (
            await request("munzee", { url: url }, token.access_token)
          )?.data?.deployed_at
            ?.replace("T", " ")
            .replace(/-0[56]:00/, "")
        );
        return {
          norespond: true,
        };
      },
    },
  ],
};

export default route;
