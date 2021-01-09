import { Endpoint, Response } from "../common";

export interface ClanV2Requirements extends Endpoint {
  request: {
    endpoint: "clan/v2/requirements";
    params: {
      clan_id: number;
      game_id: number;
    };
  };
  response: Response<{
    level_reached: number;
    updated_at: number;
    data: {
      levels: {
        [level: string]: {
          individual: {
            id: number;
            task_id: number;
            name: string;
            amount: number;
            description: string;
            logo: string;
            data: {
              [user_id: string]: number;
            },
            completed: 0 | 1;
            percent_completed: number;
          }[],
          group: {
            id: number;
            task_id: number;
            name: string;
            amount: number;
            description: string;
            logo: string;
            data: {
              [user_id: string]: number;
            },
            value: number;
            completed: 0 | 1;
            percent_completed: number;
          }[],
          completed: 0 | 1;
          percent_completed: number;
        }
      } | [];
    },
    battle: {
      game_id: number;
      start: number;
      end: number;
      reveal_at: number;
      lb_total_task_id: number;
    }
  }>;
}