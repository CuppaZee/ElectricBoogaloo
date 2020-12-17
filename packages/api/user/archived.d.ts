import { Endpoint, Response } from "../common";

export interface UserArchivedMunzee {
  munzee_id: string;
  friendly_name: string;
  deployed_at: string;
  points: number;
  creator_username: string;
  munzee_code: string;
  last_captured_at?: string;
  last_captured_by_id?: string;
  capture_type_id: string;
  number_of_captures: number;
  archived_at: string;
  notes: string;
  latitude: string;
  longitude: string;
  maintenance: string;
  pin_icon: string;
  last_captured_username?: string;
  last_captured_at_unix?: number;
  url: string;
  virtual?: 0 | 1;
  evolution?: 0 | 1;
  deployed_at_unix: number;
  archived_at_unix: number;
}

export interface UserArchived extends Endpoint {
  request: {
    endpoint: "user/archived";
    params: {
      page?: number;
    };
  }
  response: Response<{
    has_more: 0 | 1;
    munzees: UserArchivedMunzee[];
  }>
}