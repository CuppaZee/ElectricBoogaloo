var moment = require("moment");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var { retrieve, request } = require("../util");
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'g'.
var { g } = require('../util/db');
const gameConfig_1 = require('./gameconfig.json');
const gameConfig_2 = require('./gameconfig_2.json');
const gameConfig_3 = require('./gameconfig_3.json');
const gameConfig_7 = require('./gameconfig_7.json');
const gameConfig_8 = require('./gameconfig_8.json');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('../config.json');

module.exports = {
  path: "competition/minute",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        params: { key },
        teamsData,
        db
      }: any) {
        if(key !== config.zeecret_competition_minute_key) {
          return {
            status: "error",
            data: "Don't even try. 😜"
          }
        }
        const teams = await teamsData();
        const roundDoc = (await db.collection('zeecret').orderBy('round_id', 'desc').limit(1).get()).docs[0];
        if (!roundDoc) {
          return {
            status: "error",
            data: null,
          }
        }
        const round = roundDoc.data();
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const gameConfig = {
          1: gameConfig_1,
          2: gameConfig_2,
          3: gameConfig_3,
          4: gameConfig_3,
          5: gameConfig_3,
          6: gameConfig_3,
          7: gameConfig_7,
          8: gameConfig_8,
        }[round.round_id] || gameConfig_8;
        if(round.pause) {
          return {
            status: "success",
            data: true
          }
        }
        const capturesTypes = new Set([...gameConfig.healing.filter((i: any) => i.type === "capture"), ...gameConfig.damaging.filter((i: any) => i.type === "capture")].map(i => g(i.icon)));
        const deploysTypes = new Set([...gameConfig.healing.filter((i: any) => i.type === "deploy"), ...gameConfig.damaging.filter((i: any) => i.type === "deploy")].map(i => g(i.icon)));
        console.log(Array.from(capturesTypes), Array.from(deploysTypes), round.round_id);
        const roundUpdate = {};
        const teamBatches = {};
        for (let team of ["pine", "pear"]) {
          const team_info = teams.find((i: any) => i.team_id === (team));
          const userListUpdate = {}
          const batchID = round[`next_id_${team}`] || 0;
          const batches = await db.collection('zeecret').doc(roundDoc.id).collection(team).get();
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          teamBatches[team] = batches.docs;
          const batchDoc = batches.docs.find((i: any) => i.id===batchID.toString());
          const batch = batchDoc ? batchDoc.data() : {};

          const users = team_info.list.slice(batchID * 90, (batchID + 1) * 90);

          for (let date = moment(round.start).hour(0).minute(0).second(0).millisecond(0); date.valueOf() < Date.now(); date = moment(date).add(1, 'day')) {
            const dateString = date.format('YYYY-MM-DD');
            // if (!batch[dateString] || !batch[dateString].final) {
            if(!batch[dateString] || !batch[dateString].finalised) {
              batch[dateString] = {}
            }
            if (date.valueOf() < Date.now() - 88200000 && !batch[dateString].finalised) {
              batch[dateString].finalised = {};
            }
            const data = await Promise.all(users.map(async (i: any) => {
              try {
                if(batch[dateString].finalised && batch[dateString].finalised[i.i]) return {};
                const token = await retrieve(db, { user_id: i.i, teaken: false }, 120, team)
                const activity = await request('statzee/player/day', { day: dateString }, token.access_token, `competition/minute/err ${i.i} ${i.n}`, true);
                if(!activity) return {};
                if(activity.status_text === "The access token provided is expired, revoked, malformed, or invalid for other reasons.") {
                  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                  userListUpdate[`fixed.${i.i}`] = false;
                  return {};
                }
                if(activity.data && activity.data.captures && batch[dateString].finalised) {
                  batch[dateString].finalised[i.i] = true;
                }
                return activity.data || {};
              } catch(e) {
                console.error('Competition Error', i.n, i.i, e)
                return {};
              }
            }))
            const activity = {
              // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
              captures: [].concat(...data.map(i => ((i || {}).captures || []))),
              // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
              deploys: [].concat(...data.map(i => ((i || {}).deploys || [])))
            }
            console.log('competition/minute', dateString, team, activity.captures.length, activity.deploys.length, JSON.stringify(activity.captures[0]), JSON.stringify(activity.deploys[0]))
            for (const capture of activity.captures) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'pin' does not exist on type 'never'.
              const icon = g(capture.pin);
              let type = icon;
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'friendly_name' does not exist on type 'n... Remove this comment to see the full error message
              if(icon === "pineagent" && (round.round_id.toString() === "7" ? ["#56"] : ["#28","#45","#32"]).some(i=>capture.friendly_name.includes(i))) {
                type = "pineagentmystery";
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'friendly_name' does not exist on type 'n... Remove this comment to see the full error message
              } else if(icon === "pearagent" && (round.round_id.toString() === "7" ? ["#12"] : ["#42","#14","#15"]).some(i=>capture.friendly_name.includes(i))) {
                type = "pearagentmystery";
              }
              if (capturesTypes.has(icon)) {
                if (!batch[dateString][`${type}_capture`]) batch[dateString][`${type}_capture`] = [];
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'captured_at' does not exist on type 'nev... Remove this comment to see the full error message
                batch[dateString][`${type}_capture`].push(new Date(capture.captured_at).valueOf());
              }
            }
            for (const deploy of activity.deploys) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'pin' does not exist on type 'never'.
              const icon = g(deploy.pin);
              if (deploysTypes.has(icon)) {
                if (!batch[dateString][`${icon}_deploy`]) batch[dateString][`${icon}_deploy`] = [];
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployed_at' does not exist on type 'nev... Remove this comment to see the full error message
                batch[dateString][`${icon}_deploy`].push(new Date(deploy.deployed_at).valueOf());
              }
            }
            // }
          }

          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          roundUpdate[`next_id_${team}`] = (users.length < 90) ? 0 : (batchID + 1);
          await db.collection('zeecret').doc(roundDoc.id).collection(team).doc(batchID.toString()).set(batch);
          if(Object.keys(userListUpdate).length > 0) await db.collection('data').doc(`user_list_${team}`).update(userListUpdate);
        }

        let actions: any = [];

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pear' does not exist on type '{}'.
        for(let batchDoc of teamBatches.pear) {
          let batchData = batchDoc.data();
          for(let day in batchData) {
            let batch = batchData[day];
            for(let requirement of [...gameConfig.healing,...gameConfig.damaging]) {
              actions = actions.concat((batch[`${g(requirement.icon)}_${requirement.type}`]||[]).map((i: any) => ({
                pear: requirement.health || 0,
                pine: -(requirement.damage || 0),
                time: i,
                type: `${g(requirement.icon)}_${requirement.type}`,
                team: "pear"
              })))
            }
          }
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pine' does not exist on type '{}'.
        for(let batchDoc of teamBatches.pine) {
          let batchData = batchDoc.data();
          for(let day in batchData) {
            let batch = batchData[day];
            for(let requirement of [...gameConfig.healing,...gameConfig.damaging]) {
              actions = actions.concat((batch[`${g(requirement.icon)}_${requirement.type}`]||[]).map((i: any) => ({
                pine: requirement.health || 0,
                pear: -(requirement.damage || 0),
                time: i,
                type: `${g(requirement.icon)}_${requirement.type}`,
                team: "pine"
              })))
            }
          }
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
        actions.sort((a,b)=>a.time-b.time);

        const startTime = moment(round.start).valueOf();
        
        const points = {
          pine: round.base || round.max,
          pear: round.base || round.max,
        }
        const stats = {
          pear: {},
          pine: {},
        }
        let end = false;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pear' does not exist on type '{}'.
        const updateTime = (Date.now() - ((teamBatches.pear.length + 2) * 60000));

        for(let action of actions) {
          if(action.time > startTime && action.time < updateTime && !end) {
            points.pine = Math.min(round.max, Math.max(0, points.pine + action.pine));
            points.pear = Math.min(round.max, Math.max(0, points.pear + action.pear));
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            stats[action.team][action.type] = (stats[action.team][action.type] || 0) + 1;
            if(points.pine === 0 || points.pear === 0) {
              end = action.time;
            }
          }
        }
        // 1602608280000
        // 1602594096000
        if(end) {
          await db.collection('zeecret').doc((Number(roundDoc.id) + 1).toString()).set({
            max: 10000,
            base: 2500,
            next_id_pear: 0,
            next_id_pine: 0,
            round_id: Number(roundDoc.id) + 1,
            start: end,
            pause: true,
            // @ts-expect-error ts-migrate(2363) FIXME: The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
            max_length: new Date('2020-12-01T23:59:00-06:00').valueOf() - end
          })
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'end' does not exist on type '{}'.
          roundUpdate.end = end;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'result' does not exist on type '{}'.
          roundUpdate.result = points.pine === 0 ? "pear" : "pine";
        } else if((round.start + round.max_length) <= updateTime) {
          await db.collection('zeecret').doc((Number(roundDoc.id) + 1).toString()).set({
            max: 10000,
            base: 2500,
            next_id_pear: 0,
            next_id_pine: 0,
            round_id: Number(roundDoc.id) + 1,
            start: round.start + round.max_length,
            pause: true,
            max_length: new Date('2020-12-01T23:59:00-06:00').valueOf() - (round.start + round.max_length)
          })
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'end' does not exist on type '{}'.
          roundUpdate.end = round.start + round.max_length;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'result' does not exist on type '{}'.
          roundUpdate.result = (points.pine > points.pear) ? "pine" : "pear";
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'points' does not exist on type '{}'.
        roundUpdate.points = points;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stats' does not exist on type '{}'.
        roundUpdate.stats = stats;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updated_at' does not exist on type '{}'.
        roundUpdate.updated_at = updateTime;

        await roundDoc.ref.update(roundUpdate);

        return {
          status: "success",
          data: {
            v: 5
          }
        };
      },
    },
  ],
};