import { ClanV2Challenges } from "@cuppazee/api/clan/challenges";
import { ClanV2 } from "@cuppazee/api/clan/main";
import { ClanV2Requirements } from "@cuppazee/api/clan/requirements";
import { Type, TypeState, TypeTags } from "@cuppazee/types";
import dayjs from "dayjs";

export function monthToGameID(year?: number, month?: number) {
  let now = dayjs.mhqNow();
  let y = year !== undefined ? year : now.year();
  let m = month !== undefined ? month : now.month();
  return y * 12 + m - 24158;
}

export function gameIDToMonth(gameID: number) {
  let t = gameID + 24158;
  return {
    m: t % 12,
    y: Math.floor(t / 12),
  };
}

export const April2021Requirements = {"data":{"level_reached":0,"updated_at":1617364789,"data":{"levels":{"1":{"individual":[{"id":7414,"task_id":1,"name":"Days of Activity","amount":5,"description":"Capture or deploy a munzee to register activity for the day. Does not have to be in a row. (Excludes Social Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/1.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":7419,"task_id":3,"name":"Total Points","amount":17500,"description":"Earn deploy, cap or capon points from any type of munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/3.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9279,"task_id":13,"name":"Places Capture","amount":2,"description":"Capture any type of Places Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/13.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9288,"task_id":24,"name":"Bouncer Captures","amount":5,"description":"Capture any type of Player Owned Bouncer, Munzee Owned Bouncer or Team Owned Bouncer.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/24.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9292,"task_id":28,"name":"Flat Friends Points","amount":100,"description":"Earn deploy, cap or capon points from any type of Flat Munzee. (Excludes Fancy Flat Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/28.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9306,"task_id":36,"name":"Greeting Card Points","amount":100,"description":"Earn deploy, cap or capon points from any type of Greeting Card.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/36.png","data":{"455935":0},"completed":0,"percent_completed":0}],"group":[{"id":7419,"task_id":3,"name":"Total Points","amount":75000,"description":"Earn deploy, cap or capon points from any type of munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/3.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9269,"task_id":7,"name":"Destination Point","amount":2500,"description":"Earn deploy, cap or capon points from any type of Destination Munzee. (Includes Rooms)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/7.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9279,"task_id":13,"name":"Places Capture","amount":25,"description":"Capture any type of Places Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/13.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9287,"task_id":23,"name":"Weapon Points","amount":500,"description":"Earn deploy, cap or capon points from any type of Clan Weapon Munzee","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/23.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9288,"task_id":24,"name":"Bouncer Captures","amount":50,"description":"Capture any type of Player Owned Bouncer, Munzee Owned Bouncer or Team Owned Bouncer.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/24.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9292,"task_id":28,"name":"Flat Friends Points","amount":500,"description":"Earn deploy, cap or capon points from any type of Flat Munzee. (Excludes Fancy Flat Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/28.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9297,"task_id":30,"name":"Reseller Cap/Deploys","amount":10,"description":"Capture or deploy any type of Reseller Munzee. (Includes Reseller Unique Munzees only)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/30.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9302,"task_id":33,"name":"Renovated Destinations","amount":5,"description":"Renovate a Motel Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/33.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9306,"task_id":36,"name":"Greeting Card Points","amount":2000,"description":"Earn deploy, cap or capon points from any type of Greeting Card.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/36.png","data":{"455935":0},"completed":0,"percent_completed":0}]},"2":{"individual":[{"id":7414,"task_id":1,"name":"Days of Activity","amount":10,"description":"Capture or deploy a munzee to register activity for the day. Does not have to be in a row. (Excludes Social Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/1.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":7419,"task_id":3,"name":"Total Points","amount":35000,"description":"Earn deploy, cap or capon points from any type of munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/3.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9279,"task_id":13,"name":"Places Capture","amount":4,"description":"Capture any type of Places Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/13.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9288,"task_id":24,"name":"Bouncer Captures","amount":10,"description":"Capture any type of Player Owned Bouncer, Munzee Owned Bouncer or Team Owned Bouncer.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/24.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9292,"task_id":28,"name":"Flat Friends Points","amount":200,"description":"Earn deploy, cap or capon points from any type of Flat Munzee. (Excludes Fancy Flat Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/28.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9306,"task_id":36,"name":"Greeting Card Points","amount":250,"description":"Earn deploy, cap or capon points from any type of Greeting Card.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/36.png","data":{"455935":0},"completed":0,"percent_completed":0}],"group":[{"id":7419,"task_id":3,"name":"Total Points","amount":175000,"description":"Earn deploy, cap or capon points from any type of munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/3.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9269,"task_id":7,"name":"Destination Point","amount":3500,"description":"Earn deploy, cap or capon points from any type of Destination Munzee. (Includes Rooms)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/7.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9279,"task_id":13,"name":"Places Capture","amount":50,"description":"Capture any type of Places Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/13.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9287,"task_id":23,"name":"Weapon Points","amount":1250,"description":"Earn deploy, cap or capon points from any type of Clan Weapon Munzee","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/23.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9288,"task_id":24,"name":"Bouncer Captures","amount":75,"description":"Capture any type of Player Owned Bouncer, Munzee Owned Bouncer or Team Owned Bouncer.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/24.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9292,"task_id":28,"name":"Flat Friends Points","amount":1250,"description":"Earn deploy, cap or capon points from any type of Flat Munzee. (Excludes Fancy Flat Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/28.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9297,"task_id":30,"name":"Reseller Cap/Deploys","amount":20,"description":"Capture or deploy any type of Reseller Munzee. (Includes Reseller Unique Munzees only)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/30.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9302,"task_id":33,"name":"Renovated Destinations","amount":15,"description":"Renovate a Motel Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/33.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9305,"task_id":35,"name":"QRewzee/SleepZee Captures","amount":20,"description":"Capture QRewzees or SleepZees.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/35.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9306,"task_id":36,"name":"Greeting Card Points","amount":4000,"description":"Earn deploy, cap or capon points from any type of Greeting Card.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/36.png","data":{"455935":0},"completed":0,"percent_completed":0}]},"3":{"individual":[{"id":7414,"task_id":1,"name":"Days of Activity","amount":15,"description":"Capture or deploy a munzee to register activity for the day. Does not have to be in a row. (Excludes Social Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/1.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":7419,"task_id":3,"name":"Total Points","amount":60000,"description":"Earn deploy, cap or capon points from any type of munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/3.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9269,"task_id":7,"name":"Destination Point","amount":250,"description":"Earn deploy, cap or capon points from any type of Destination Munzee. (Includes Rooms)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/7.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9279,"task_id":13,"name":"Places Capture","amount":6,"description":"Capture any type of Places Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/13.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9287,"task_id":23,"name":"Weapon Points","amount":250,"description":"Earn deploy, cap or capon points from any type of Clan Weapon Munzee","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/23.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9288,"task_id":24,"name":"Bouncer Captures","amount":20,"description":"Capture any type of Player Owned Bouncer, Munzee Owned Bouncer or Team Owned Bouncer.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/24.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9292,"task_id":28,"name":"Flat Friends Points","amount":200,"description":"Earn deploy, cap or capon points from any type of Flat Munzee. (Excludes Fancy Flat Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/28.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9297,"task_id":30,"name":"Reseller Cap/Deploys","amount":1,"description":"Capture or deploy any type of Reseller Munzee. (Includes Reseller Unique Munzees only)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/30.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9302,"task_id":33,"name":"Renovated Destinations","amount":1,"description":"Renovate a Motel Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/33.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9306,"task_id":36,"name":"Greeting Card Points","amount":450,"description":"Earn deploy, cap or capon points from any type of Greeting Card.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/36.png","data":{"455935":0},"completed":0,"percent_completed":0}],"group":[{"id":7419,"task_id":3,"name":"Total Points","amount":350000,"description":"Earn deploy, cap or capon points from any type of munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/3.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9269,"task_id":7,"name":"Destination Point","amount":6000,"description":"Earn deploy, cap or capon points from any type of Destination Munzee. (Includes Rooms)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/7.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9279,"task_id":13,"name":"Places Capture","amount":100,"description":"Capture any type of Places Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/13.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9287,"task_id":23,"name":"Weapon Points","amount":2500,"description":"Earn deploy, cap or capon points from any type of Clan Weapon Munzee","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/23.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9288,"task_id":24,"name":"Bouncer Captures","amount":125,"description":"Capture any type of Player Owned Bouncer, Munzee Owned Bouncer or Team Owned Bouncer.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/24.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9291,"task_id":27,"name":"Zodiac Cap/Deploy","amount":25,"description":"Capture or deploy any type of Western or Chinese Zodiac Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/27.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9292,"task_id":28,"name":"Flat Friends Points","amount":2000,"description":"Earn deploy, cap or capon points from any type of Flat Munzee. (Excludes Fancy Flat Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/28.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9297,"task_id":30,"name":"Reseller Cap/Deploys","amount":30,"description":"Capture or deploy any type of Reseller Munzee. (Includes Reseller Unique Munzees only)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/30.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9302,"task_id":33,"name":"Renovated Destinations","amount":25,"description":"Renovate a Motel Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/33.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9305,"task_id":35,"name":"QRewzee/SleepZee Captures","amount":40,"description":"Capture QRewzees or SleepZees.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/35.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9306,"task_id":36,"name":"Greeting Card Points","amount":6000,"description":"Earn deploy, cap or capon points from any type of Greeting Card.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/36.png","data":{"455935":0},"completed":0,"percent_completed":0}]},"4":{"individual":[{"id":7414,"task_id":1,"name":"Days of Activity","amount":20,"description":"Capture or deploy a munzee to register activity for the day. Does not have to be in a row. (Excludes Social Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/1.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":7419,"task_id":3,"name":"Total Points","amount":75000,"description":"Earn deploy, cap or capon points from any type of munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/3.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9269,"task_id":7,"name":"Destination Point","amount":1000,"description":"Earn deploy, cap or capon points from any type of Destination Munzee. (Includes Rooms)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/7.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9279,"task_id":13,"name":"Places Capture","amount":10,"description":"Capture any type of Places Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/13.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9287,"task_id":23,"name":"Weapon Points","amount":450,"description":"Earn deploy, cap or capon points from any type of Clan Weapon Munzee","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/23.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9288,"task_id":24,"name":"Bouncer Captures","amount":35,"description":"Capture any type of Player Owned Bouncer, Munzee Owned Bouncer or Team Owned Bouncer.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/24.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9292,"task_id":28,"name":"Flat Friends Points","amount":600,"description":"Earn deploy, cap or capon points from any type of Flat Munzee. (Excludes Fancy Flat Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/28.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9297,"task_id":30,"name":"Reseller Cap/Deploys","amount":5,"description":"Capture or deploy any type of Reseller Munzee. (Includes Reseller Unique Munzees only)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/30.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9302,"task_id":33,"name":"Renovated Destinations","amount":5,"description":"Renovate a Motel Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/33.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9306,"task_id":36,"name":"Greeting Card Points","amount":750,"description":"Earn deploy, cap or capon points from any type of Greeting Card.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/36.png","data":{"455935":0},"completed":0,"percent_completed":0}],"group":[{"id":7419,"task_id":3,"name":"Total Points","amount":600000,"description":"Earn deploy, cap or capon points from any type of munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/3.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9269,"task_id":7,"name":"Destination Point","amount":10000,"description":"Earn deploy, cap or capon points from any type of Destination Munzee. (Includes Rooms)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/7.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9278,"task_id":12,"name":"Evolution Point","amount":2500,"description":"Earn deploy, cap or capon points from any type of Evolution Munzee","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/12.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9279,"task_id":13,"name":"Places Capture","amount":200,"description":"Capture any type of Places Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/13.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9285,"task_id":19,"name":"Jewel Points","amount":3000,"description":"Earn deploy, cap or capon points from any type of Jewel Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/19.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9287,"task_id":23,"name":"Weapon Points","amount":4000,"description":"Earn deploy, cap or capon points from any type of Clan Weapon Munzee","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/23.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9288,"task_id":24,"name":"Bouncer Captures","amount":200,"description":"Capture any type of Player Owned Bouncer, Munzee Owned Bouncer or Team Owned Bouncer.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/24.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9291,"task_id":27,"name":"Zodiac Cap/Deploy","amount":55,"description":"Capture or deploy any type of Western or Chinese Zodiac Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/27.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9292,"task_id":28,"name":"Flat Friends Points","amount":3500,"description":"Earn deploy, cap or capon points from any type of Flat Munzee. (Excludes Fancy Flat Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/28.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9297,"task_id":30,"name":"Reseller Cap/Deploys","amount":50,"description":"Capture or deploy any type of Reseller Munzee. (Includes Reseller Unique Munzees only)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/30.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9298,"task_id":31,"name":"Gaming Points","amount":2500,"description":"Earn deploy, cap or capon points from any type of Gaming Munzee (Including scattering types).","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/31.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9302,"task_id":33,"name":"Renovated Destinations","amount":50,"description":"Renovate a Motel Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/33.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9304,"task_id":34,"name":"Mystery Point","amount":3000,"description":"Earn deploy, cap or capon points from any type of Mystery Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/34.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9305,"task_id":35,"name":"QRewzee/SleepZee Captures","amount":75,"description":"Capture QRewzees or SleepZees.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/35.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9306,"task_id":36,"name":"Greeting Card Points","amount":8000,"description":"Earn deploy, cap or capon points from any type of Greeting Card.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/36.png","data":{"455935":0},"completed":0,"percent_completed":0}]},"5":{"individual":[{"id":7414,"task_id":1,"name":"Days of Activity","amount":25,"description":"Capture or deploy a munzee to register activity for the day. Does not have to be in a row. (Excludes Social Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/1.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":7419,"task_id":3,"name":"Total Points","amount":90000,"description":"Earn deploy, cap or capon points from any type of munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/3.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9269,"task_id":7,"name":"Destination Point","amount":2500,"description":"Earn deploy, cap or capon points from any type of Destination Munzee. (Includes Rooms)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/7.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9279,"task_id":13,"name":"Places Capture","amount":25,"description":"Capture any type of Places Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/13.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9287,"task_id":23,"name":"Weapon Points","amount":1000,"description":"Earn deploy, cap or capon points from any type of Clan Weapon Munzee","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/23.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9288,"task_id":24,"name":"Bouncer Captures","amount":60,"description":"Capture any type of Player Owned Bouncer, Munzee Owned Bouncer or Team Owned Bouncer.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/24.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9292,"task_id":28,"name":"Flat Friends Points","amount":1000,"description":"Earn deploy, cap or capon points from any type of Flat Munzee. (Excludes Fancy Flat Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/28.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9297,"task_id":30,"name":"Reseller Cap/Deploys","amount":10,"description":"Capture or deploy any type of Reseller Munzee. (Includes Reseller Unique Munzees only)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/30.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9302,"task_id":33,"name":"Renovated Destinations","amount":10,"description":"Renovate a Motel Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/33.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9305,"task_id":35,"name":"QRewzee/SleepZee Captures","amount":5,"description":"Capture QRewzees or SleepZees.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/35.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9306,"task_id":36,"name":"Greeting Card Points","amount":1500,"description":"Earn deploy, cap or capon points from any type of Greeting Card.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/36.png","data":{"455935":0},"completed":0,"percent_completed":0}],"group":[{"id":7419,"task_id":3,"name":"Total Points","amount":810000,"description":"Earn deploy, cap or capon points from any type of munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/3.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9269,"task_id":7,"name":"Destination Point","amount":20000,"description":"Earn deploy, cap or capon points from any type of Destination Munzee. (Includes Rooms)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/7.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9278,"task_id":12,"name":"Evolution Point","amount":5000,"description":"Earn deploy, cap or capon points from any type of Evolution Munzee","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/12.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9279,"task_id":13,"name":"Places Capture","amount":300,"description":"Capture any type of Places Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/13.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9285,"task_id":19,"name":"Jewel Points","amount":6000,"description":"Earn deploy, cap or capon points from any type of Jewel Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/19.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9287,"task_id":23,"name":"Weapon Points","amount":7500,"description":"Earn deploy, cap or capon points from any type of Clan Weapon Munzee","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/23.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9288,"task_id":24,"name":"Bouncer Captures","amount":500,"description":"Capture any type of Player Owned Bouncer, Munzee Owned Bouncer or Team Owned Bouncer.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/24.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9291,"task_id":27,"name":"Zodiac Cap/Deploy","amount":125,"description":"Capture or deploy any type of Western or Chinese Zodiac Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/27.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9292,"task_id":28,"name":"Flat Friends Points","amount":5000,"description":"Earn deploy, cap or capon points from any type of Flat Munzee. (Excludes Fancy Flat Munzees)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/28.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9297,"task_id":30,"name":"Reseller Cap/Deploys","amount":100,"description":"Capture or deploy any type of Reseller Munzee. (Includes Reseller Unique Munzees only)","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/30.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9298,"task_id":31,"name":"Gaming Points","amount":5000,"description":"Earn deploy, cap or capon points from any type of Gaming Munzee (Including scattering types).","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/31.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9302,"task_id":33,"name":"Renovated Destinations","amount":100,"description":"Renovate a Motel Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/33.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9304,"task_id":34,"name":"Mystery Point","amount":7500,"description":"Earn deploy, cap or capon points from any type of Mystery Munzee.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/34.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9305,"task_id":35,"name":"QRewzee/SleepZee Captures","amount":150,"description":"Capture QRewzees or SleepZees.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/35.png","data":{"455935":0},"completed":0,"percent_completed":0},{"id":9306,"task_id":36,"name":"Greeting Card Points","amount":10000,"description":"Earn deploy, cap or capon points from any type of Greeting Card.","logo":"https://munzee.global.ssl.fastly.net/images/clan_tasks/36.png","data":{"455935":0},"completed":0,"percent_completed":0}]}}},"battle":{"game_id":97,"start":1617426060,"end":1619845260,"reveal_at":1616961300,"lb_total_task_id":3}},"status_code":200,"status_text":"OK","executed_in":0.17316794395447,"authenticated_entity":"125914","authenticated_entity_type":"user","allowed_scopes":["read"],"server":"ip-172-18-33-250"}

export const requirementMeta: {
  [task_id: string]: {
    task_id: number;
    top: string;
    bottom: string;
    icon: string;
    icons?: string[];
    total?: "min";
    meta: {
      activity: ("capture" | "deploy" | "capon")[];
      days?: boolean;
      points?: boolean;
      types?: (munzee: Type) => boolean;
      exclude?: (munzee: Type) => boolean;
    };
    hidden?: string[];
  };
} = {
  1: {
    task_id: 1,
    top: "Days of",
    bottom: "Activity",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    total: "min",
    meta: {
      activity: ["capture", "deploy"],
      days: true,
      exclude: i => i.state === TypeState.Locationless,
    },
  },
  2: {
    task_id: 2,
    top: "Total",
    bottom: "Captures",
    icon: "captured",
    meta: {
      activity: ["capture"],
    },
  },
  3: {
    task_id: 3,
    top: "Total",
    bottom: "Points",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
    },
    hidden: ["u89"],
  },
  6: {
    task_id: 6,
    top: "Total",
    bottom: "Deploys",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    meta: {
      activity: ["deploy"],
      points: true,
      exclude: i => ["personalmunzee", "premiumpersonal"].includes(i.icon),
    },
  },
  7: {
    task_id: 7,
    top: "Dest.",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/hotel.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/1starmotel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtualresort.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeDestination),
      exclude: i => i.icon === "skyland",
    },
  },
  9: {
    task_id: 9,
    top: "Greenie",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/munzee.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/munzee.png",
      "https://munzee.global.ssl.fastly.net/images/pins/munzee.png",
    ],
    meta: {
      activity: ["capture"],
      types: i => i.icon === "munzee",
    },
  },
  10: {
    task_id: 10,
    top: "Deploy",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    meta: {
      activity: ["deploy"],
      points: true,
      exclude: i => ["personalmunzee", "premiumpersonal"].includes(i.icon),
    },
  },
  12: {
    task_id: 12,
    top: "Evo",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.Evolution),
    },
  },
  13: {
    task_id: 13,
    top: "Places",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/poi_filter.png",
    meta: {
      activity: ["capture"],
      types: i => i.has_tag(TypeTags.TypePOI),
    },
  },
  14: {
    task_id: 14,
    top: "Jewel",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/aquamarine.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/diamond.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtualonyx.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeJewel),
    },
  },
  17: {
    task_id: 17,
    top: "Evo",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.Evolution),
    },
  },
  19: {
    task_id: 19,
    top: "Jewel",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/diamond.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/aquamarine.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtual_citrine.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeJewel),
    },
  },
  20: {
    task_id: 20,
    top: "Weapon",
    bottom: "Deploys",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/catapult.png",
    ],
    meta: {
      activity: ["deploy"],
      types: i => i.has_tag(TypeTags.TypeWeaponClan),
    },
  },
  22: {
    task_id: 22,
    top: "Urban Fit",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.icon === "urbanfit",
    },
  },
  23: {
    task_id: 23,
    top: "Weapon",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/catapult.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeWeaponClan),
    },
  },
  24: {
    task_id: 24,
    top: "Bouncer",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png",
      "https://munzee.global.ssl.fastly.net/images/pins/theunicorn.png",
      "https://munzee.global.ssl.fastly.net/images/pins/nomad.png",
      "https://munzee.global.ssl.fastly.net/images/pins/muru.png",
    ],
    meta: {
      activity: ["capture"],
      types: i => i.state === TypeState.Bouncer,
    },
  },
  25: {
    task_id: 25,
    top: "Mystery",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mystery.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mystery.png",
      "https://munzee.global.ssl.fastly.net/images/pins/airmystery.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeMystery),
    },
  },
  26: {
    task_id: 26,
    top: "Weapon",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/crossbow.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeWeaponClan),
    },
  },
  27: {
    task_id: 27,
    top: "Zodiac",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/zodiac.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/zodiac.png",
      "https://munzee.global.ssl.fastly.net/images/pins/scorpio.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeZodiac),
    },
  },
  28: {
    task_id: 28,
    top: "Flat",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png",
      "https://munzee.global.ssl.fastly.net/images/pins/flatlou.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeFlat),
    },
  },
  29: {
    task_id: 29,
    top: "Elemental",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/earthmystery.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/icemystery.png",
      "https://munzee.global.ssl.fastly.net/images/pins/earthmystery.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i =>
        i.has_tag(TypeTags.Evolution) &&
        (!i.has_tag(TypeTags.Scatter) ||
          ["fire", "waterdroplet", "frozengreenie", "charge"].includes(i.icon)),
    },
  },
  30: {
    task_id: 30,
    top: "Reseller",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/reseller.png",
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeReseller),
    },
  },
  31: {
    task_id: 31,
    top: "Gaming",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeGaming),
    },
  },
  32: {
    task_id: 32,
    top: "Gaming",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png",
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: i => i.has_tag(TypeTags.TypeGaming),
    },
  },
  33: {
    task_id: 33,
    top: "Renovate",
    bottom: "Motel",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
      "https://munzee.global.ssl.fastly.net/images/pins/2starmotel.png",
    ],
    meta: {
      activity: ["capture"],
      types: i => i.icon === "renovation",
    },
  },
  34: {
    task_id: 34,
    top: "Mystery",
    bottom: "Points",
    icon: "https://i.ibb.co/YdRQ3Sf/Split-Mystery.png",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.TypeMystery),
    },
  },
  35: {
    task_id: 35,
    top: "QRewZee",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/qrewzee.png",
    meta: {
      activity: ["capture"],
      types: i => i.icon === "qrewzee",
    },
  },
  36: {
    task_id: 36,
    top: "Card",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/envelope.png",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: i => i.has_tag(TypeTags.Card),
    },
  },
};

export type ClanShadowData = {
  members: number[];
  usernames: { [user_id: string]: string };
  data: {
    [task_id: string]: {
      [user_id: string]: number | "?";
    };
  };
  details: {
    group: string;
    group_admins: string[];
    name?: string;
  };
};

export type ClanRewardsData = {
  battle: {
    game_id: number;
    start: number;
    end: number;
    reveal_at: number;
    lb_total_task_id: number;
    title: string;
  };
  levels: {
    [reward_id: string]: number;
  }[];
  rewards: {
    [reward_id: string]: {
      reward_id: number;
      name: string;
      logo: string;
    };
  };
  order: number[];
};

export type ClanStatsFormattedUser = {
  username: string | null;
  user_id: number;
  admin: boolean;
  shadow: boolean;
  requirements: {
    [task_id: string]: {
      value?: number;
      level?: number;
    };
  };
  level: number;
};

export type ClanStatsFormattedData = {
  users: { [user_id: string]: ClanStatsFormattedUser };
  requirements: {
    [task_id: string]: {
      value: number;
      level?: number;
    };
  };
  level: number;
};

export type ClanStatsFormattedRequirements = {
  tasks: {
    individual: {
      [task_id: string]: number[];
    };
    group: {
      [task_id: string]: number[];
    };
  };
  individual: number[];
  group: number[];
  all: number[];
  isAprilFools: boolean;
};

export function ClanRequirementsConverter(
  requirements?: ClanV2Requirements["response"]["data"]
) {
  let isAprilFools = false;
  if (!requirements || requirements.data.levels instanceof Array) return null;
  if (requirements.battle.game_id === 97 && requirements.data.levels["1"].individual.some(i=>i.name.includes("MOB"))) {
    requirements = JSON.parse(JSON.stringify(April2021Requirements)).data;
    isAprilFools = true;
  }
  if (!requirements || requirements.data.levels instanceof Array) return null;
  const data: ClanStatsFormattedRequirements = {
    tasks: {
      individual: {},
      group: {},
    },
    individual: [],
    group: [],
    all: [],
    isAprilFools
  };

  for (const level of Object.keys(requirements.data.levels).sort((a, b) => Number(b) - Number(a))) {
    const l = requirements.data.levels[level];
    for (const indiv of l.individual) {
      if (!data.individual.includes(indiv.task_id)) data.individual.push(indiv.task_id);
      if (!data.tasks.individual[indiv.task_id]) data.tasks.individual[indiv.task_id] = [];
      data.tasks.individual[indiv.task_id][Number(level)] = indiv.amount;

      if (!requirementMeta[indiv.task_id]) requirementMeta[indiv.task_id] = {
        task_id: indiv.task_id,
        top: indiv.name.split(" ")[0],
        bottom: indiv.name.split(" ").slice(1).join(" "),
        icon: indiv.logo,
        meta: {
          activity: [],
        }
      };
    }
    for (const group of l.group) {
      if (!data.group.includes(group.task_id)) data.group.push(group.task_id);
      if (!data.tasks.group[group.task_id]) data.tasks.group[group.task_id] = [];
      data.tasks.group[group.task_id][Number(level)] = group.amount;

      if (!requirementMeta[group.task_id])
        requirementMeta[group.task_id] = {
          task_id: group.task_id,
          top: group.name.split(" ")[0],
          bottom: group.name.split(" ").slice(1).join(" "),
          icon: group.logo,
          meta: {
            activity: [],
          },
        };
    }
  }

  data.all = [
    ...data.individual.filter(i => !data.group.includes(i)),
    ...data.individual.filter(i => data.group.includes(i)),
    ...data.group.filter(i => !data.individual.includes(i)),
  ];

  return data;
}

export function ClanStatsConverter(
  clan?: ClanV2["response"]["data"],
  stats?: ClanV2Requirements["response"]["data"],
  requirements?: ClanStatsFormattedRequirements,
  actual_clan_id?: number,
  shadow?: ClanShadowData
) {
  if (!clan || !requirements || !stats || stats.data.levels instanceof Array) return null;
  const data: ClanStatsFormattedData = {
    users: {},
    requirements: {},
    level: 5,
  };

  if (shadow && stats.battle.end * 1000 > Date.now()) {
    for (const user of shadow.members) {
      data.users[user] = {
        username: shadow.usernames[user],
        user_id: user,
        admin: false,
        shadow: true,
        requirements: {},
        level: 5,
      };
    }
  }

  if ((actual_clan_id || 0) >= 0 && stats.battle.end * 1000 > Date.now()) {
    for (const user of clan.users) {
      data.users[Number(user.user_id)] = {
        username: user.username,
        user_id: Number(user.user_id),
        admin: user.is_admin === "1",
        shadow: false,
        requirements: {},
        level: 5,
      };
    }
  }
  const allTasks = [
    ...(stats?.data.levels["5"]?.individual || []),
    ...(stats?.data.levels["5"]?.group || []),
  ];
  for (const level of ["4", "3", "2", "1"]) {
    for(const task of [...(stats?.data.levels[level]?.individual || []),
      ...(stats?.data.levels[level]?.group || [])]) {
      if(!allTasks.some(i=>i.task_id === task.task_id)) {
        allTasks.push(task);
      }
    }
  }
  for (const task of allTasks) {
    // Setup Requirement
    data.requirements[task.task_id] = {
      value: requirementMeta[task.task_id]?.total === "min" ? Infinity : 0,
      level: 0,
    };
    for (const user_id of [
      ...((actual_clan_id || 0) < 0 ? [] : Object.keys(task.data) || []),
      ...((stats.battle.end * 1000 > Date.now() ? shadow?.members : []) || []).filter(
        i => data.users[i]?.shadow
      ),
    ]) {
      // Add Left User if Necessary
      if (!data.users[user_id]) {
        data.users[user_id] = {
          username:
            clan.users.find(i => i.user_id === user_id.toString())?.username ?? `#${user_id}`,
          user_id: Number(user_id),
          admin: (clan.users.find(i => i.user_id === user_id.toString())?.is_admin ?? "0") === "1",
          shadow: false,
          requirements: {},
          level: 5,
        };
      }
      const user = data.users[user_id];
      const valuePreConvert = task.data[user_id] === undefined ? task.data[user_id] : shadow?.data[task.task_id]?.[user_id];
      const value = Number(valuePreConvert ?? NaN);

      // Add to Clan Total
      if (requirementMeta[task.task_id]?.total === "min") {
        data.requirements[task.task_id].value = Math.min(
          data.requirements[task.task_id].value,
          value ?? Infinity
        );
      } else {
        data.requirements[task.task_id].value += value ?? 0;
      }

      // Set Requirement Value
      user.requirements[task.task_id] = {
        value,
        level: 0,
      };

      // Calculate Level
      if (requirements.tasks.individual[task.task_id]) {
        for (let level = 1; level <= 5; level++) {
          if ((requirements.tasks.individual[task.task_id][level] || 0) <= value) {
            user.requirements[task.task_id].level = level;
          }
        }
        user.level = Math.min(user.level, user.requirements[task.task_id].level || 0);
      } else {
        user.requirements[task.task_id].level = -1;
      }
    }
    // Calculate Clan Total Level
    if (requirements.tasks.group[task.task_id]) {
      for (let level = 1; level <= 5; level++) {
        if (
          (requirements.tasks.group[task.task_id][level] || 0) <=
          data.requirements[task.task_id].value
        ) {
          data.requirements[task.task_id].level = level;
        }
      }
      data.level = Math.min(data.level, data.requirements[task.task_id].level || 0);
    } else {
      data.requirements[task.task_id].level = -1;
    }
  }

  return data;
}
