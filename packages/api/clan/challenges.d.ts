import { Endpoint, Response } from "../common";

export interface ClanV2Challenges extends Endpoint {
  request: {
    endpoint: "clan/v2/challenges/{game_id}";
    params: {
      clan_id?: number;
      game_id: number;
    };
  };
  response: Response<{
    battle: {
      game_id: number;
      start: number;
      end: number;
      reveal_at: number;
      lb_total_task_id: number;
      title: string;
    },
    clan: {
      clan_id: number;
      name: string;
      simple_name: string;
      tagline: string;
      created_by_userid: number;
      logo: string;
      privacy: "private" | "public" | "hidden";
      goal: "Casual Clan" | "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5";
      members: number;
    },
    rewards: {
      levels: {
        [level: string]: {
          name: string;
          rewards: {
            id: number;
            reward_id: number;
            name: string;
            amount: number;
            logo: string;
          }[],
          collected: 0 | 1;
          collected_at: number;
          percent_completed: number;
        }
      }
    }
  }>;
}