import { Route } from "../types";

import config from '../config';
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
          subject: "https://server.cuppazee.app/clan/May21.png",
          text: `May 2021 Clan Requirements are out now on CuppaZee at https://cuppazee.app/clan/requirements/05/2021 and in the Munzee App. You can also get to them by selecting Clan Requirements from the Dashboard or sidebar and switching the month to May 2021. Coming soon to the Munzee Blog.`
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