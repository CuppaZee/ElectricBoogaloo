import { Endpoint, Response } from "../common";

export interface Munzee extends Endpoint {
  request: {
    endpoint: "munzee";
    params:
      | {
          munzee_id: number;
          closest?: boolean;
        }
      | {
          url: string;
          closest?: boolean;
        };
  };
  response: Response<{
    munzee_id: number;
    capture_type_id: string;
    friendly_name: string;
    number_of_captures: number;
    points: number;
    latitude: string;
    longitude: string;
    deployed: 0 | 1;
    archived: 0 | 1;
    archived_at?: string;
    deployed_at?: string;
    notes: string;
    motel_id: string;
    hotel_id: string;
    resort_id: string;
    rovers: unknown[];
    evolution_reset_available: 0 | 1;
    creator_user_id: number;
    creator_username: string;
    creator_titles: {
      [key: string]: string;
    };
    first_to_capture?: {
      username: string;
      user_id: number;
    };
    url: string;
    code: string;
    generic_code_hash: string;
    has_user_captured_munzee: 0 | 1;
    owned_by_user: 0 | 1;
    has_user_subscribed_munzee: 0 | 1;
    photos: number;
    last_updated_at?: string;
    number_of_entries: number;
    magnets_used_today: number;
    maintenance: 0 | 1;
    pin_icon: string;
    original_pin_image: string;
    is_virtual: 0 | 1;
    closest?: {
      munzee_id: string;
      friendly_name: string;
      capture_type_id: string;
      code: string;
      distance: string;
      pin_icon: string;
    }[];
    bouncers?: {
      unicorn_id: number;
      time_placed: string;
      good_until: number;
      mythological_capture_type: number;
      unicorn_munzee: {
        munzee_id: string;
        friendly_name: string;
        creator_user_id: string;
        creator_username: string;
        code: string;
        number_of_captures: number;
      };
      munzee_logo: string;
      mythological_type: string;
    }[];
    special_good_until?: number;
    unicorn?: 0 | 1;
    unicorn_munzee?: {
      munzee_id: string;
      friendly_name: string;
      creator_user_id: string;
      creator_username: string;
      code: string;
      number_of_captures: number;
      has_user_captured_munzee: 0 | 1;
    };
    mythological_type?: string;
    mythological_capture_type?: number;
  }>;
}
