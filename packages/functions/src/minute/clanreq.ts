import { Route } from "../types";

import config from '../config.json';
import sendEmail from '../util/nodemailer';

const route: Route = {
  path: "minute/clanreqpost",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({
        params: {key}
      }) {
        if(key!==config.emails.clanreq.key) {
          return {
            status: "error",
            data: null
          }
        }
        await sendEmail({
          to: config.emails.clanreq.email,
          subject: "https://server.cuppazee.app/clan/92.png",
          text: `November 2020 Clan Requirements are out now on CuppaZee at https://cuppazee.app/clan/requirements/2020/11 and in the Munzee App. You can also get to them by pressing the Star icon in CuppaZee's sidebar. Coming soon to the Munzee Blog.`
        })
        return {
          status: "success",
          data: true
        }
      }
    }
  ]
}

export default route;