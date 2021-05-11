import { Endpoint, Response } from "../common";

export interface QRate {
  qrate_id: number;
  name: string;
  description: string;
  logo: string;
  time_found: string;
  qrowbars_used: number;
  time_completed: null;
  progress: number;ß
  goal: number;
}

export interface QRates extends Endpoint {
  request: {
    endpoint: "qrates";
    params: {
      method?: "get";
    };
  };
  response: Response<{
    max_free_slots: number;
    max_premium_slots: number;
    max_purchased_slots: number;
    max_temp_slots: number;
    can_purchase: number;
    slot_cost: number;
    qrates: QRate[];
  }>;
}
