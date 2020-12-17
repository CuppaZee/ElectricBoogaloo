import { Endpoint, Response } from "../common";

export interface UserCredits extends Endpoint {
  request: {
    endpoint: "user/credits";
    params: {};
  }
  response: Response<{
    [key: string]: string;
  }>
}

export interface UserCreditsHistory extends Endpoint {
  request: {
    endpoint: "user/credits/history";
    params: {};
  }
  response: Response<{
    items: {
      type: string;
      time_awarded: string;
      log_text: string;
    }[]
  }>
}