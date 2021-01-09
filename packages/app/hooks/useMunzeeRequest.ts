import { useQuery } from "react-query";
import useToken from "./useToken";
import stringify from "fast-json-stable-stringify";

import { FetchRequest, FetchResponse, Endpoints } from '@cuppazee/api';

const getMunzeeData = async <Path extends keyof Endpoints>(
  endpoint: FetchRequest<Path>["endpoint"],
  params: FetchRequest<Path>["params"],
  token: string,
): Promise<FetchResponse<Path> | null> => {
  var body = new FormData();
  body.append('data', JSON.stringify(params));
  body.append('access_token', token);
  var response = await fetch('https://api.munzee.com/' + endpoint?.replace(/{([A-Za-z0-9_]+)}/g,(string) => {
    return params?.[string[1] as keyof FetchRequest<Path>["params"]] || "";
  }), {
    method: 'POST',
    body,
  })
  // TODO: Error Handling
  // TODO: FROM value
  return await response.json();
}

export default function useMunzeeRequest<Path extends keyof Endpoints>(
  endpoint: FetchRequest<Path>["endpoint"],
  params: FetchRequest<Path>["params"],
  run?: boolean,
  user_id?: number
) {
  const { data: token } = useToken(user_id);
  return useQuery(
    ["munzee", endpoint, stringify(params), user_id],
    () => getMunzeeData(endpoint, params, token?.data?.access_token),
    {
      enabled: (run ?? true) && token !== undefined,
    }
  );
}
