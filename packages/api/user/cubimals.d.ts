import { Endpoint, Response } from "../common";

export interface Cubimal {
  id: string;
  name: string;
  description: string;
  logo: string;
  collected: number;
}

export interface UserCubimals extends Endpoint {
  request: {
    endpoint: "user/cubimals";
    params: {
      method?: "get";
    };
  };
  response: Response<Cubimal[]>;
}
