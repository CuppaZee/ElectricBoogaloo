import { Endpoint, Response } from "../../common";

export interface StatzeePlayerDay extends Endpoint {
  request: {
    endpoint: "statzee/player/day";
    params: {
      day: string;
    };
  };
  response: Response<{
    captures: {
      capture_id: string;
      captured_at: string;
      points: string;
      code: string;
      friendly_name: string;
      capture_type_id: string;
      username: string;
      pin: string;
    }[],
    deploys: {
      id: string;
      deployed_at: string;
      points: string;
      code: string;
      friendly_name: string;
      capture_type_id: string;
      latitude: string;
      reset_at: void;
      pin: string;
    }[];
    captures_on: {
      capture_id: string;
      captured_at: string;
      points_for_creator: string;
      points: string;
      code: string;
      friendly_name: string;
      capture_type_id: string;
      deployed_at: string;
      latitude: string;
      username: string;
      pin: string;
    }[];
    archived: {
      id: string;
      code: string;
      friendly_name: string;
      archived_at: string;
    }[];
    referral: void;
    zeeops: void;
    total_points: number;
    level: number;
  }>
}