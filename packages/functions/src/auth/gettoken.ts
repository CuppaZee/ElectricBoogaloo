import { retrieve } from "../util";
import config from '../config.json';

export default {
  path: "auth/get",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "userid",
        },
      },
      async function({
        params: { teaken, user_id, time },
        db
      }: any) {
        if (Date.now() > 1593227045659) return {
          status: "error",
          data: null
        }
        if (config.bypass_teakens.includes(teaken)) {
          teaken = false;
        }
        var got = await retrieve(db, { user_id, teaken }, time ? Number(time) : 7500);
        if (!got) {
          return {
            status: "error",
            data: null
          }
        }
        return {
          status: "success",
          data: got
        }
      },
    },
    {
      version: 2,
      params: {
        user_id: {
          type: "userid",
        },
      },
      async function({
        params: { teaken, user_id, time },
        db
      }: any) {
        if (config.bypass_teakens.includes(teaken)) {
          teaken = false;
        }
        var got = await retrieve(db, { user_id, teaken }, time ? Number(time) : 7500);
        if (!got) {
          return {
            status: "error",
            data: null
          }
        }
        return {
          status: "success",
          data: got
        }
      },
    },
  ],
};
