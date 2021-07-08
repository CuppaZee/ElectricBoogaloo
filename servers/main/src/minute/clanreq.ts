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
          subject: "https://server.cuppazee.app/clan/Jul21.png",
          text: `Clan Battle 100 (yes, we've hit triple digits!) is on the horizon, and July 2021 Clan Requirements are out now!\n\nCheck them out on CuppaZee Max at https://max.cuppazee.app/clan/requirements/07/2021, on CuppaZee Express at https://express.cuppazee.app/clans/requirements/07/2021, or in the Munzee App. You can also get to them on CuppaZee by heading to the Clan Requirements page and switching the month to July 2021. The requirements should be on the Munzee Blog in a few minutes.`
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