import { Endpoint, Response } from "../common";

export interface OpsZeeopsStatus extends Endpoint {
  request: {
    endpoint: "ops/zeeops/status";
    params: {
      user_id: number;
    };
  };
  response: Response<{
    success: boolean;
    missions: [
      {
        id: number;
        description: string;
        reward_description: string;
        imageUrl: string;
        rewards: {
          tid: string;
          amount: number;
          imageUrl: string;
          points: number;
          credit: 0 | 1;
          credit_type: string | null;
          munzee: 0 | 1;
          munzee_type: string | null;
          spawn: 0 | 1;
          spawn_type: string | null;
        }[];
        progress: number;
        goal: number;
        solved: 0 | 1;
        completedDate: string;
        rewardCollected: 0 | 1;
        rerolled: 0 | 1;
        reroll_timestamp: string;
        reroll_allowed: boolean;
      }
    ];
    weekStreakRewardUnlocked: boolean;
    currentMission: number;
    start_time: string;
  }>;
}

export interface OpsZeeopsTutorialsStatus extends Endpoint {
  request: {
    endpoint: "ops/zeeops/tutorials/status";
    params: {
      user_id: number;
    };
  };
  response: Response<
    {
      id: number;
      description: string;
      reward_description: string;
      imageUrl: string;
      rewards: {
        tid: string;
        amount: number;
        imageUrl: string;
        points: number;
        credit: 0 | 1;
        credit_type: string | null;
        munzee: 0 | 1;
        munzee_type: string | null;
        spawn: 0 | 1;
        spawn_type: string | null;
      }[];
      completed: 0 | 1;
      rewardCollected: 0 | 1;
    }[]
  >;
}
