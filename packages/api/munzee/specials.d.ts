import { Endpoint, Response } from "../common";

export interface MunzeeSpecial {
  munzee_id: string;
  logo: string;
  latitude: string;
  longitude: string;
  friendly_name: string;
  time_placed: string;
  full_url: string;
  special_good_until: number;
}

export interface MunzeeSpecialBouncer {
  munzee_id: string;
  latitude: string;
  longitude: string;
  friendly_name: string;
  time_placed: string;
  full_url: string;
  mythological_munzee: {
    friendly_name: string;
    code: string;
    creator_user_id: string;
    creator_username: string;
    munzee_id: string;
    munzee_logo: string;
    capture_type_id: string;
  },
  special_good_until: number;
}

export interface MunzeeSpecials extends Endpoint {
  request: {
    endpoint: "munzee/specials";
    params: {};
  }
  response: Response<MunzeeSpecial[]>
}
export interface MunzeeSpecialsMythological extends Endpoint {request: {endpoint: "munzee/specials/mythological";params: {}};response: Response<MunzeeSpecial[]>}
export interface MunzeeSpecialsPouchCreatures extends Endpoint {request: {endpoint: "munzee/specials/pouchcreatures";params: {}};response: Response<MunzeeSpecial[]>}
export interface MunzeeSpecialsRetired extends Endpoint {request: {endpoint: "munzee/specials/retired";params: {}};response: Response<MunzeeSpecial[]>}
export interface MunzeeSpecialsFlat extends Endpoint {request: {endpoint: "munzee/specials/flat";params: {}};response: Response<MunzeeSpecial[]>}
export interface MunzeeSpecialsBouncers extends Endpoint {request: {endpoint: "munzee/specials/bouncers";params: {}};response: Response<MunzeeSpecial[]>}