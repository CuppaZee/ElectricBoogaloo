import { Endpoint, Response } from "../../common";

export type StatzeePlayerDayCapture = {
  capture_id: string;
  captured_at: string;
  points: string;
  code: string;
  friendly_name: string;
  capture_type_id: string;
  username: string;
  pin: string;
};
export type StatzeePlayerDayCaptureOn = {
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
};
export type StatzeePlayerDayDeploy = {
  id: string;
  deployed_at: string;
  points: string;
  code: string;
  friendly_name: string;
  capture_type_id: string;
  latitude: string;
  reset_at: void;
  pin: string;
};
export type StatzeePlayerDayArchive = {
  id: string;
  code: string;
  friendly_name: string;
  archived_at: string;
};

export interface StatzeePlayerDay extends Endpoint {
  request: {
    endpoint: "statzee/player/day";
    params: {
      day: string;
    };
  };
  response: Response<{
    captures: StatzeePlayerDayCapture[],
    deploys: StatzeePlayerDayDeploy[];
    captures_on: StatzeePlayerDayCaptureOn[];
    archived: StatzeePlayerDayArchive[];
    referral: void;
    zeeops: void;
    total_points: number;
    level: number;
  }>
}