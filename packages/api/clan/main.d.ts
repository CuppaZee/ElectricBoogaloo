import { Endpoint, Response } from "../common";

export interface ClanV2 extends Endpoint {
  request: {
    endpoint: "clan/v2";
    params: {
      clan_id: number;
    };
  };
  response: Response<{
      details: {
        clan_id: number;
        name: string;
        simple_name: string;
        tagline: string;
        created_by_userid: number;
        logo: string;
        privacy: "private" | "public" | "hidden";
        goal: "Casual Clan" | "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5";
        members: number;
      };
      users: {
        user_id: string;
        username: string;
        is_admin: "0" | "1";
      }[];
      admins: {
        [id: string]: {
          user_id: string;
          username: string;
          is_admin: "0" | "1";
        }
      };
      result: {
        game_id: 81,
        level_reached: 0,
        updated_at: 1575467517,
        total_value: 74348,
        rank: 95
      };
      pending_requests?: void;
      pending_invitations?: void;
    }>;
}