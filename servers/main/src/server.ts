import express from "express";
import cors from "cors";

import { Route } from "./types";
import http from "http";
// import https from "https";
// import Jimp from "jimp";

// import db from "./util/db";
// import notificationData from "./util/notificationSettings";

// import bouncersService from "./services/bouncers";

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
import { EndpointsDown } from "./util/endpointStatus";

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

async function apiResponder(req: express.Request, res: express.Response) {
  var startTime = process.hrtime();
  function executed_in() {
    let pt = process.hrtime(startTime);
    return pt[0] * 1e9 + pt[1];
  }
  try {
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
        endpointsDown: Array.from(EndpointsDown),
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
        endpointsDown: Array.from(EndpointsDown),
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
        endpointsDown: Array.from(EndpointsDown),
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
    var response = await Promise.resolve(
      use.function({
        params: params,
        res,
        notificationData: null as any,
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
        endpointsDown: Array.from(EndpointsDown),
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
      endpointsDown: Array.from(EndpointsDown),
      route: null,
      executed_in: executed_in(),
    });
  }
}

var app = express();
app.use(cors({ origin: true }));
app.use(express.text());
app.use(express.json());
app.use(express.static("./public", {
  extensions: ['html']
}))

app.all("**", apiResponder);

http.createServer(app).listen(80);
// https.createServer(options, app).listen(443);
