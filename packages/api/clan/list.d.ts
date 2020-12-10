import { Endpoint, Response } from "../common";
import { ClanV2 } from './main';

export interface ClanV2List extends Endpoint {
  request: {
    endpoint: "clan/v2/list";
    params: {
      goal?: void;
    };
  };
  response: Response<{
    id: number;
    name: string;
    simple_name: string;
    tagline: string;
    goal: "Casual Clan" | "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5";
    level_reached: number;
    members: number;
    privacy: "private" | "public" | "hidden";
    pending_request: number;
    logo: string;
  }[]>;
}

export interface ClanV2Search extends Endpoint {
  request: {
    endpoint: "clan/v2/search";
    params: {
      text: string;
      limit?: number;
    };
  };
  response: ClanV2List["response"];
}

export interface ClanV2Random extends Endpoint {
  request: {
    endpoint: "clan/v2/random";
    params: {
      privacy?: string;
    };
  };
  response: ClanV2["response"];
}