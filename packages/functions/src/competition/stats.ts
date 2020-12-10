module.exports = {
  path: "competition/stats",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        params: { round },
        db
      }: any) {
        const document = await db.collection('zeecret').doc(round.toString()).get();
        return {
          status: "success",
          data: document.data()
        };
      },
    },
  ],
};