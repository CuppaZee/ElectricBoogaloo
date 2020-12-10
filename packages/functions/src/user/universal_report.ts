
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
var config = require('../config.json');
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'fetch'.
var fetch = require('node-fetch');

module.exports = {
  path: "user/universal/report",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: { report }
      }: any) {
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
