import config from "../config.json";
import fetch from "node-fetch";
import { Route } from "../types";
import { URLSearchParams } from "url";

const route: Route = {
  path: "report",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { reports } }) {
        await fetch(config.discord.error_report, {
          method: "POST",
          body: new URLSearchParams({
            content: `\`\`\`${JSON.stringify(reports, null, 2)}\`\`\``,
          }),
        });
        return {
          status: "success",
          data: true,
        };
      },
    },
  ],
};
export default route;
