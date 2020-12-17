import config from '../config.json';
import fetch from 'node-fetch';
import { Route } from '../types';

const route: Route = {
  path: "user/universal/report",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { report }
      }) {
        await fetch(
          config.discord.universal_report,
          {
            method: "POST",
            body: new URLSearchParams({
              content: `\`\`\`${report}\`\`\``
            })
          }
        )
        return {
          status: "success",
          data: true
        }
      },
    },
  ],
};
export default route;