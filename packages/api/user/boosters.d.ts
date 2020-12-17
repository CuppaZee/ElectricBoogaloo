import { Endpoint, Response } from "../common";

export interface UserBoostersCredits extends Endpoint {
  request: {
    endpoint: "user/boosters/credits";
    params: {};
  }
  response: Response<{
    [key: string]: {
      type_id: string;
      name: string;
      short_name: string;
      credits: number;
    };
  }>
}

export interface UserBoostersActive extends Endpoint {
  request: {
    endpoint: "user/boosters/active";
    params: {};
  }
  response: Response<{
    items: unknown[]
  }>
}