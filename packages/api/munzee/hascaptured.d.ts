import { Endpoint, Response } from "../common";

export interface MunzeeHascaptured extends Endpoint {
  request: {
    endpoint: "munzee/hascaptured";
    params: {
      munzee_ids: string;
    };
  };
  response: Response<{
    [key: string]: 0 | 1;
  }>;
}
