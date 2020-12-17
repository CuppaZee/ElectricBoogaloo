import { request, retrieve } from '../util';
import POLYfromEntries from 'object.fromentries';
import { Route } from '../types';
const route: Route = {
  path: "clan/rewards",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        db,
        params: { game_id }
      }: any) {
        var token = await retrieve(db, { user_id: 455935, teaken: false }, 60);
        var rewards = (await request(`clan/v2/challenges/{game_id}`, { game_id }, token.access_token))?.data;
        if (!rewards) {
          return {
            status: "error",
            data: null,
          }
        }
        var reqs = {
          battle: rewards.battle,
          levels: [] as {
            [reward_id: string]: number;
          }[],
          rewards: {} as {
            [reward: string]: {
              reward_id: number;
              name: string;
              logo: string;
            }
          },
          order: [] as number[]
        };
        var ensure = (a: string, b: number) => { if (!reqs.order.includes(b)) reqs.order.push(b) };
        for (var level in rewards.rewards.levels) {
          var level_rewards = rewards.rewards.levels[level];
          var level_data = POLYfromEntries(([] as [number, number][]).concat(...level_rewards.rewards.map<[number, number][]>(i => {
            if (i.reward_id === 12) {
              return [[-1, i.amount], [-2, i.amount]]
            } else if (i.reward_id === 11) {
              return [[17, i.amount], [23, i.amount], [24, i.amount], [25, i.amount]]
            } else if (i.reward_id === 45) {
              return [[17, i.amount], [23, i.amount], [25, i.amount]]
            }
            return [[i.reward_id, i.amount]];
          })))
          for (const reward of level_rewards.rewards) {
            if (reward.reward_id === 12) {
              ensure("rewards", -1);
              ensure("rewards", -2);
              reqs.rewards["-1"] = {
                reward_id: -1,
                name: "Virtual",
                logo: "https://munzee.global.ssl.fastly.net/images/pins/virtual.png"
              }
              reqs.rewards["-2"] = {
                reward_id: -2,
                name: "Virtual Color",
                logo: "https://munzee.global.ssl.fastly.net/images/pins/virtual_rainbow.png"
              }
            } else if (reward.reward_id === 11) {
              ensure("rewards", 17);
              ensure("rewards", 23);
              ensure("rewards", 24);
              ensure("rewards", 25);
              reqs.rewards["17"] = {
                reward_id: 17,
                name: "Flat Rob",
                logo: "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png"
              }
              reqs.rewards["23"] = {
                reward_id: 23,
                name: "Flat Lou",
                logo: "https://munzee.global.ssl.fastly.net/images/pins/flatlou.png"
              }
              reqs.rewards["24"] = {
                reward_id: 24,
                name: "Flat Matt",
                logo: "https://munzee.global.ssl.fastly.net/images/pins/flatmatt.png"
              }
              reqs.rewards["25"] = {
                reward_id: 25,
                name: "Flat Hammock",
                logo: "https://munzee.global.ssl.fastly.net/images/pins/flathammock.png"
              }
            } else if (reward.reward_id === 45) {
              ensure("rewards", 17);
              ensure("rewards", 23);
              ensure("rewards", 25);
              reqs.rewards["17"] = {
                reward_id: 17,
                name: "Flat Rob",
                logo: "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png"
              }
              reqs.rewards["23"] = {
                reward_id: 23,
                name: "Flat Lou",
                logo: "https://munzee.global.ssl.fastly.net/images/pins/flatlou.png"
              }
              reqs.rewards["25"] = {
                reward_id: 25,
                name: "Flat Hammock",
                logo: "https://munzee.global.ssl.fastly.net/images/pins/flathammock.png"
              }
            } else {
              ensure("rewards", reward.reward_id);
              reqs.rewards[reward.reward_id] = {
                reward_id: reward.reward_id,
                name: reward.name,
                logo: reward.logo
              }
            }
          }
          reqs.levels.push(level_data);
        }
        return {
          status: "success",
          data: reqs
        }
      }
    }
  ]
}
export default route;