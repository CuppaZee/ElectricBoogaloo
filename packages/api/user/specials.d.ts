import { Endpoint, Response } from "../common";

export interface UserSpecials extends Endpoint {
  request: {
    endpoint: "user/specials";
    params: {
      user_id: number;
    };
  };
  response: Response<
    {
      name: string;
      logo: string;
      count: number;
    }[]
  >;
}
