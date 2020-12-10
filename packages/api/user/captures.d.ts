import { Endpoint, Response } from "../common";

export interface UserCaptures extends Endpoint {
  request: {
    endpoint: "user/captures";
    params: {
      user_id: number;
      page?: number;
    };
  }
  response: Response<{
    munzee_id: string;
    captured_at: string;
    points: number;
    creator_user_id: number;
    creator_username: string;
    deployed_at: string;
    url: string;
    friendly_name: string;
    code: string;
    latitude: string;
    longitude: string;
    is_virtual: 0 | 1,
    has_user_captured_munzee: 0 | 1,
    number_of_captures: number;
    owned_by_user: 0 | 1,
    capture_type_id: string;
    maintenance: string;
    rovers: number;
    deployed_at_unix: number;
    last_captured_at_unix: number;
    pin_icon: string;
    original_pin_image: string;
  }[]>
}

export interface UserCapturesSpecial extends Endpoint {
  request: {
    endpoint: "user/captures/special";
    params: {
      user_id: number;
      page?: number;
      type: string;
    };
  }
  response: Response<{
    has_more: 0 | 1;
    munzees: {
      munzee_id: string;
      captured_at: string;
      points: number;
      creator_username: string;
      creator_user_id: string;
      deployed_at: string;
      url: string;
      friendly_name: string;
      pin_icon: string;
    }[]
  }>
}