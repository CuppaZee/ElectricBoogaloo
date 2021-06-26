import fetch from "node-fetch";
import { URLSearchParams } from "url";
import _config from "../config";
import mongo from "./mongo";

export enum AuthApplication {
  Main = "main",
  Team = "team",
  Universal = "universal",
}

export interface AuthToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  expires: number;
}

export interface AuthData {
  application: AuthApplication;
  user_id: number | string;
  teakens: string[];
  token: AuthToken;
  user_number: number;
  username: string;
}

export interface ValidTeakenResponse {
  valid: true;
  data: AuthData;
}

export interface InvalidTeakenResponse {
  valid: false;
  data: null;
}

export async function validateTeaken(user_id: number, teaken: string | false, application: AuthApplication): Promise<ValidTeakenResponse | InvalidTeakenResponse> {
  const data = await mongo
    .collection<AuthData>("auth")
    .findOne({ application, user_id: Number(user_id) });
  if (data && (teaken === false || data.teakens.includes(teaken))) {
    return {
      valid: true,
      data,
    }
  }
  return {
    valid: false,
    data: null
  }
}

export default async function (
  { user_id, teaken }: { user_id: number | string; teaken: string | false },
  time: number,
  application: AuthApplication = AuthApplication.Main
) {
  try {
    const config = application in _config ? (_config as any)[application] : _config;
    const { data } = await validateTeaken(Number(user_id), teaken, application);
    if (!data) {
      return null;
    }
    if (teaken === false || data.teakens.includes(teaken)) {
      const token = data.token;
      if (time && token.expires * 1000 > Date.now() + time * 1000) {
        const { refresh_token: _, ...r } = token;
        return r;
      }
      console.info("CZ- REFRESHING", token.expires, Date.now(), time);
      const formData = new URLSearchParams();
      formData.append("client_id", config.client_id);
      formData.append("client_secret", config.client_secret);
      formData.append("grant_type", "refresh_token");
      formData.append("refresh_token", token.refresh_token);
      const n = await fetch("https://api.munzee.com/oauth/login", {
        method: "POST",
        body: formData,
      });
      const ne = await n.json();
      await mongo
        .collection("auth")
        .updateOne({ application, user_id }, { $set: { token: { ...token, ...ne.data?.token } } });
      return ne.data?.token;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
