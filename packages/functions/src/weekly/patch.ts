// const weeks = require('./data.json');
// const { retrieve, request } = require('../util');

module.exports = {
  path: "weekly/patch",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        db,
        params: {week_id}
      }: any) {
        const batchDoc = (await db.collection('weekly').doc(week_id).collection('batches').orderBy('_updated_at').limit(1).get()).docs[0];
        const batch = batchDoc.data();

        

        // await db.collection('weekly').doc(week.id).set({ players: data });
        // batch._updated_at = Date.now();
        // await batchDoc.ref.set(batch);

        return {
          status: "success",
          data: {
            b: batch.players.filter((i: any) => i.pre.join()!==i.fpre.join()),
          }
        };
      }
    }
  ]
}