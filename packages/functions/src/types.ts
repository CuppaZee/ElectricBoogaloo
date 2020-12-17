import { firestore } from "firebase-admin";
import { Response } from "firebase-functions"
import { Device } from "./util/notificationSettings";

export type Route = {
  path: string;
  latest: number;
  perms?: number;
  versions: RouteVersion[];
}

export type RouteVersion = {
  version: number;
  function (data: RouteData): (Promise<RouteResponse> | RouteResponse);
}

export type RouteData = {
  params: {
    [key:string]: any;
  };
  res: Response;
  db: firestore.Firestore;
  notificationData: () => Promise<Device[]>;
}

export type RouteResponse = {
  norespond: true;
  status?: undefined;
  error_message?: string;
  data?: undefined;
} | {
  norespond?: false;
  status: "success" | "error" | {
    code: number;
    
  };
  error_message?: string;
  data: any;
};