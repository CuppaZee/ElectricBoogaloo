const data = require('./data.json');

module.exports = {
  path: "weekly/weeks",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function() {
        return {
          status: "success",
          data: data.filter((i: any) => new Date(i.reveal).valueOf()<Date.now()).reverse(),
        };
      }
    }
  ]
}