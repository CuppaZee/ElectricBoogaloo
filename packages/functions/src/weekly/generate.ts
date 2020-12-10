module.exports = {
  path: "weekly/generate",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        db,
        params: { week_id }
      }: any) {
        const users = (await db.collection('data').doc('user_list').get()).data().list;
        const batches = [];
        for(var i = 0;i < users.length/90;i++) {
          batches.push(users.slice(90*i,90*(i+1)));
        }
        for(const batch of batches) {
          await db.collection('weekly').doc(week_id).collection('batches').add({
            _updated_at: Math.floor(Math.random()*1000),
            players: batch.map((i: any) => ({
              n: i
            }))
          })
        }
        return {
          status: "success",
          data: batches,
        }
      }
    }
  ]
}