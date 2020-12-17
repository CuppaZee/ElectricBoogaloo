module.exports = {
  path: "competition/users",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        params: { users },
        teamsData
      }: any) {
        const teams = await teamsData();
        return {
          status: "success",
          data: users.split(',').reduce((a: any, b: any) => {
            const team = teams.find((i: any) => i.list && i.list.some((i: any) => i.n.toLowerCase()===b.toLowerCase()));
            return {
              ...a,
              [b]: team ? team.team_id : null,
            }
          }, {})
        };
      },
    },
    {
      version: 2,
      params: {},
      async function({
        params: { users },
        teamsData
      }: any) {
        const teams = await teamsData();
        return {
          status: "success",
          data: users.split(',').reduce((a: any, b: any) => {
            const team = teams.find((i: any) => i.list && i.list.some((i: any) => i.n.toLowerCase()===b.toLowerCase()));
            return {
              ...a,
              [b]: team ? `${team.team_id}_${team.fixed[team.list.find((i: any) => i.n.toLowerCase()===b.toLowerCase()).i]}` : null,
            };
          }, {})
        };
      },
    },
  ],
};