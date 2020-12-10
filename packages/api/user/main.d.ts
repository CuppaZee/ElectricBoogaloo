import { Endpoint, Response } from "../common";

export interface User extends Endpoint {
  request: {
    endpoint: "user";
    params: {
      user_id: number;
    } | {
      username: string;
    };
  };
  response: Response<{
    username: string;
    user_id: number;
    user_type_id: number;
    avatar: string;
    number_of_captures: number;
    number_of_deployments: number;
    number_of_undeployments: number;
    number_of_archived: number;
    number_of_badges: number;
    rovers_transported: number;
    coins_discovered: number;
    hash: string;
    premium: number;
    level: number;
    points_till_next_level: number;
    max_points_in_level: number;
    min_points_in_level: number;
    rank: number;
    points: number;
    join_time: string;
    days_old: number;
    maintenance_team: number;
    number_of_maintenance_munzees: number;
    number_of_soft_maintenance_munzees: number;
    number_of_own_socials: number;
    titles: string[],
    number_of_unique_specials_captured: number;
    premium_expires: string;
    clan?: {
      id: number;
      name: string;
      url: string;
      logo: string;
      rank: 0;
      total_clans: 0;
    }
  }>
}