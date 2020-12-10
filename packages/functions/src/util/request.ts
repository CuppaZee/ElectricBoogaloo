import fetch from "node-fetch";
import { URLSearchParams } from "url";
import { FetchRequest, FetchResponse, Endpoints } from '@cuppazee/api';

export default async function <Path extends keyof Endpoints>(
  endpoint: FetchRequest<Path>["endpoint"],
  params: FetchRequest<Path>["params"],
  token: string,
  logMessage?: string,
): Promise<FetchResponse<Path> | null> {
  try {
    var data = await fetch('https://api.munzee.com/' + endpoint, {
      method: 'POST',
      body: new URLSearchParams({
        data: JSON.stringify(params),
        access_token: token
      })
    })
    const dataJSON = await data.json();
    if (logMessage && !dataJSON.data) {
      console.log(logMessage, dataJSON);
    }
    return dataJSON;
  } catch (e) {
    if (logMessage) {
      console.log(logMessage, e);
    }
    return null;
  }
}