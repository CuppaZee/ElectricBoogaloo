export type StatusCode = number;
export type StatusText = string;
export type EntityType = "user";
export type Scope = "read" | "write" | "capture_light" | "all";

export type Response<D> = {
  data?: D | null;
  status_code: StatusCode;
  status_text: StatusText;
  executed_in: number;
  authenticated_entity: string;
  authenticated_entity_type: EntityType;
  allowed_scopes: Scope[];
  server: string;
}

export interface Endpoint {
  request: {
    endpoint: string;
    params: {
      [key: string]: unknown;
    }
  };
  response: Response<unknown>
}