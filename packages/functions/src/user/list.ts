module.exports = {
  path: "user/list",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
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