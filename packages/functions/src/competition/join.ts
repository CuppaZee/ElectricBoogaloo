module.exports = {
  path: "competition/join",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        params: { username },
        teamsData
      }: any) {
        const teams = await teamsData();
        let team = teams.sort((a: any, b: any) => a.list.length - b.list.length)[0].team_id
        if (username) {
          const userTeam = teams.find((i: any) => i.list && i.list.some((i: any) => i.n.toLowerCase() === username.toLowerCase()));
          if (userTeam) {
            team = userTeam.team_id;
          }
        }
        return {
          status: "success",
          data: {
            team
          }
        };
      },
    },
  ],
};