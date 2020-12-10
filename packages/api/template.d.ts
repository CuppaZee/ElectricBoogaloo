import { Endpoint, Response } from "./common";

export interface Template extends Endpoint {
  request: {
    endpoint: "template";
    params: {};
  }
  response: Response<{}>
}