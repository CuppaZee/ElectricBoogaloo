import * as functions from "firebase-functions";
import { Route } from "./types";
import corsImport from "cors";
const cors = corsImport({ origin: true });

import Jimp from "jimp";

import db from "./util/db";
import notificationData from "./util/notificationSettings";

import bouncersService from "./services/bouncers";

import auth_routes from "./auth";
import bouncers_routes from "./bouncers";
import clan_routes from "./clan";
// import competition_routes from './competition';
import map_routes from "./map";
import minute_routes from "./minute";
import munzee_routes from "./munzee";
import notifications_routes from "./notifications";
import tools_routes from "./tools";
import user_routes from "./user";
import widget_routes from "./widget";
// import weekly_routes from './weekly';
var routes: Route[] = [
  ...auth_routes,
  ...bouncers_routes,
  ...clan_routes,
  // ...competition_routes,
  ...map_routes,
  ...minute_routes,
  ...munzee_routes,
  ...notifications_routes,
  ...tools_routes,
  ...user_routes,
  ...widget_routes,
  // ...weekly_routes,
];

console.log("COLD BOOT");

async function apiResponder(req: functions.Request, res: functions.Response) {
  var startTime = process.hrtime();
  function executed_in() {
    let pt = process.hrtime(startTime);
    return pt[0] * 1e9 + pt[1];
  }
  cors(req, res, async () => {
    try {
      functions.logger.log("REQUEST", req.url);
      var path = req.path.split("/").filter(Boolean);
      var version = null;
      var route = path.join("/");
      if (path[path.length - 1]?.match(/^v([0-9]+)$/)) {
        version = Number(path[path.length - 1].match(/^v([0-9]+)$/)?.[1]);
        route = path.slice(0, -1).join("/");
      }
      var routeDetails = {
        route,
        version: version || "latest",
        raw: path.join("/"),
        params: null,
      };
      var use_route = routes.find(i => i.path === route);
      if (!use_route) {
        return res.send({
          data: null,
          status: {
            text: "Route not Found",
            id: "route_not_found",
            code: 404,
          },
          route: routeDetails,
          executed_in: executed_in(),
        });
      }
      var use_version = version || use_route.latest;
      routeDetails.version = use_version;
      if (!use_route.versions.find(i => i.version === use_version)) {
        return res.send({
          data: null,
          status: {
            text: "Version not Found",
            id: "version_not_found",
            code: 404,
          },
          route: routeDetails,
          executed_in: executed_in(),
        });
      }
      var use = use_route.versions.find(i => i.version === use_version);
      if (!use?.function) {
        return res.send({
          data: null,
          status: {
            text: "Function not Found",
            id: "function_not_found",
            code: 500,
          },
          route: routeDetails,
          executed_in: executed_in(),
        });
      }
      var body = {};
      try {
        if (typeof req.body === "string") {
          body = JSON.parse(req.body || "{}");
        } else {
          body = req.body;
        }
      } catch (e) {
        console.error(e);
      }
      var params = Object.assign({}, req.query || {}, body || {});
      console.log(params);
      var response = await Promise.resolve(
        use.function({
          params: params,
          res,
          db,
          notificationData,
        })
      );
      if (response.norespond) return;
      return res
        .status(
          (typeof response.status === "object"
            ? response.status.code
            : { success: 200, error: 500 }[response.status]) || 500
        )
        .send({
          data: response.data,
          error_message: response.error_message,
          status: (typeof response.status === "object"
            ? response.status
            : {
                success: {
                  text: "Success",
                  id: "success",
                  code: 200,
                },
                error: {
                  text: "Unexpected Error",
                  id: "unexpected_error",
                  code: 500,
                },
              }[response.status]) || {
            text: "Unexpected Error",
            id: "unexpected_error",
            code: 500,
          },
          route: routeDetails,
          executed_in: executed_in(),
        });
    } catch (e) {
      console.error(e);
      return res.status(500).send({
        data: null,
        status: {
          text: "Unexpected Error",
          id: "unexpected_error",
          code: 500,
        },
        route: null,
        executed_in: executed_in(),
      });
    }
  });
  return;
}

export const apibeta = functions
  .runWith({
    timeoutSeconds: 540,
  })
  .https.onRequest(apiResponder);

export const apibeta_bouncers = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "1GB",
  })
  .https.onRequest(apiResponder);

export const bouncersServiceFunction = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "512MB",
  })
  .pubsub.topic("service_bouncers")
  .onPublish(bouncersService);

export const bouncersServiceHttp = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "512MB",
  })
  .https.onRequest(async (req, res) => {
    await bouncersService();
    res.send(true);
  });

export const icons = functions
  .runWith({
    timeoutSeconds: 30,
  })
  .https.onRequest(async (req, res) => {
    const parts = req.path
      .split("/")
      .map(i => i.trim())
      .filter(i => i)
      .filter(i => i !== "beta");
    const size = Number(parts[0]);
    const icon = decodeURIComponent(parts[1].split(".")[0]);
    const type = parts[1].split(".")[1];
    let image;

    // Get Image Normally
    try {
      if (!icon.match(/[A-Z\s]/)) {
        image = await Jimp.read(
          `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(icon)}.png`
        );
      }
    } catch (e) {}

    // Get Image without Spaces
    if (!image)
      try {
        image = await Jimp.read(
          `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(
            icon.toLowerCase().replace(/\s/g, "")
          )}.png`
        );
      } catch (e) {}

    // Get Image with Underscores replacing Spaces
    if (!image)
      try {
        image = await Jimp.read(
          `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(
            icon.toLowerCase().replace(/\s/g, "_")
          )}.png`
        );
      } catch (e) {}

    // Get "Missing" Image
    if (!image)
      try {
        image = await Jimp.read(`https://icons.cuppazee.app/missing.png`);
      } catch (e) {}
    image?.resize(size, size).autocrop().contain(size, size);
    res
      .set("Cache-Control", "public, max-age=43200, s-maxage=43200")
      .type(type)
      .send(await image?.getBufferAsync(`image/${type}`));
  });
