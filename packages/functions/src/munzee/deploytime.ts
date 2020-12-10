
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var { retrieve, request } = require("../util");

module.exports = {
  path: "munzee/deploytime",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "userid",
        },
      },
      async function({
        params: { url },
        db,
        res
      }: any) {
        if (!url) {
          return res.send('Missing URL')
        }
        url = url.match(/\/m\/([^/]+)\/([0-9]+)/)||url.match(/\bm\/([^/]+)\/([0-9]+)/);
        if(!url) return res.send('Invalid URL');
        url = `/m/${url[1]}/${url[2]}`;
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        res.send((await request('munzee', { url: url }, token.access_token)).deployed_at.replace('T',' ').replace(/-0[56]:00/,''));
        return {
          norespond: true,
        }
      },
    },
  ],
};