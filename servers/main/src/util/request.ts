import fetch from "node-fetch";
import { URLSearchParams } from "url";
import { FetchRequest, FetchResponse, Endpoints } from '@cuppazee/api';
// import { logger } from "firebase-functions";

export default async function <Path extends keyof Endpoints>(
  endpoint: FetchRequest<Path>["endpoint"],
  params: FetchRequest<Path>["params"],
  token: string,
  logMessage?: string,
): Promise<FetchResponse<Path> | null> {
  try {
    console.info('CZ- REQUESTING', endpoint);
    var data = await fetch('https://api.munzee.com/' + endpoint?.replace(/{([A-Za-z0-9_]+)}/g,(_, a) => {
      return params?.[a as keyof FetchRequest<Path>["params"]] || "";
    }), {
      method: 'POST',
      body: new URLSearchParams({
        data: JSON.stringify(params),
        access_token: token
      })
    })
    const dataText = await data.text();
    try {
      const dataJSON = JSON.parse(dataText);
      if (logMessage && !dataJSON.data) {
        console.log(logMessage, dataJSON);
      }
      return dataJSON;
    } catch (e) {
      console.log('Invalid JSON from ' + endpoint + " >", dataText);
      throw e;
    }
  } catch (e) {
    if (logMessage) {
      console.log(logMessage, e);
    }
    throw e;
  }
}