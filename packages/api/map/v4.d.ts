import { Endpoint, Response } from "../common";

export interface V4MapMunzee {
  archived: "0" | "1";
  capture_type_id: string;
  code: string;
  creator_user_id: string;
  creator_username: string;
  deployed_at: string;
  deployed: "0" | "1";
  friendly_name: string;
  has_user_captured_munzee: 0 | 1;
  is_virtual: 0 | 1;
  last_captured_at: string;
  last_updated_at: number;
  latitude: string;
  longitude: string;
  maintenance: "0" | "1";
  munzee_id: string;
  notes: string;
  number_of_captures: number;
  original_pin_image: string;
  owned_by_user: 0 | 1;
  proximity_radius_ft: number;
  rovers: unknown[];
  special_good_until?: number;
}

export interface MapBoundingboxV4<X extends string = string> extends Endpoint {
  request: {
    endpoint: "map/boundingbox/v4";
    params: {
      filters: string;
      points: Record<X, {
        lat1: number;
        lng1: number;
        lat2: number;
        lng2: number;
      }>;
      fields: string;
      total_limit?: number;
    };
  };
  response: Response<
    {
      key: X;
      munzees: Partial<V4MapMunzee>[];
    }[]
  >;
}
