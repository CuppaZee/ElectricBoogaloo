import { Endpoint, Response } from "../common";

export interface UserFind extends Endpoint {
  request: {
    endpoint: "user/find";
    params: {
      text: string;
      limit?: number;
    };
  };
  response: Response<{
    users: { user_id: string; username: string }[];
    too_many: 1;
  }>;
}
