module.exports = {
  path: "weekly/player",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        db,
        params: { week_id, user_id }
      }: any) {
        const data = (await db.collection('weekly').doc(week_id).get()).data().players;
        return {
          status: "success",
          data: data[user_id],
        }
      }
    }
  ]
}