import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Dashboard: "",
          User: {
            path: "user",
            screens: {
              Profile: ':username',
              Activity: ':username/activity/:date?',
              Inventory: ':username/inventory'
            },
          },
          Clan: {
            path: "clan",
            screens: {
              Stats: ':clanid/:year?/:month?'
            },
          },
          Tools: {
            path: "tools",
            screens: {
              Calendar: 'calendar',
              Credits: 'credits'
            },
          },
          Auth: 'login',
        },
      },
      somewherewithoutcoffee: '*',
    },
  },
};
