import { useQuery } from "react-query";
import useToken from "./useToken";
import stringify from "fast-json-stable-stringify";
import { useIsFocused } from "@react-navigation/native";

const getCuppaZeeData = async <T>(
  endpoint: string,
  params: { [key: string]: any },
  token: string
): Promise<T> => {
  const response = await fetch(
    `https://server.beta.cuppazee.app/${endpoint}`,
    {
      method: "POST",
      body: JSON.stringify({ ...params, access_token: token }),
    }
  );
  if (!response.ok) {
    throw {
      json: response.json(),
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      type: response.type,
      params,
    };
  }
  // TODO: FROM value
  return await response.json();
};

export default function useCuppaZeeRequest<T = any>(
  endpoint: string,
  params: { [key: string]: any },
  run?: boolean,
  user_id?: number,
  bypassIsFocused?: boolean
) {
  const isFocused = bypassIsFocused ?? useIsFocused();
  const token = useToken(user_id);
  const data = useQuery(
    ["cuppazee", endpoint, stringify(params), user_id],
    () => getCuppaZeeData<T>(endpoint, params, token?.token?.access_token),
    {
      enabled: isFocused && (run ?? true) && token.status === "valid",
    }
  );
  return {
    tokenStatus: token,
    ...data,
  };
}
