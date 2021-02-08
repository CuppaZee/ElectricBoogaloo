import { retrieve, request } from "../util";
// import { get } = require("../util/db");
import types from "@cuppazee/types";
import spherical from "spherical-geometry-js";
import { PointsType } from "@cuppazee/types/lib/munzee";
import { Route } from "../types";

const pointsForBlast: {
  [icon: string]: number | string;
} = {
  carrotseed: 20,
  carrotplant: 35,
  carrot: 50,
  peasseed: 20,
  peasplant: 35,
  peas: 50,
  colt: 20,
  racehorse: 35,
  championshiphorse: 50,
  chick: 20,
  chicken: 35,
  eggs: 50,
  farmer: 20,
  farmerandwife: 35,
  family: 50,
  pottedplant: 20,
  garden: 35,
  field: 50,
  seaweed: 20,
  fish: 35,
  shark: 50,
  canoe: 20,
  motorboat: 35,
  submarine: 50,
  firstwheel: 20,
  "penny-farthingbike": 35,
  musclecar: 50,
  safaritruck: 20,
  safarivan: 35,
  safaribus: 50,
  carnationseed: 10,
  carnationgermination: 20,
  carnationgrowth: 30,
  carnationbud: 40,
  pinkcarnationblossom: 50,
  redcarnationblossom: 50,
  violetcarnationblossom: 50,
  whitecarnationblossom: 50,
  yellowcarnationblossom: 50,
  virtualemerald: 40,
  virtualsapphire: 36,
  virtualonyx: 50,
  virtual_onyx: 50,
  virtualcitrine: 45,
  virtual_citrine: 45,

  virtual: "10-60",
  virtual_white: "10-60",
  virtual_rainbow: "10-60",
  virtual_timberwolf: "10-60",
  virtual_silver: "10-60",
  virtual_gray: "10-60",
  virtual_black: "10-60",
  virtual_orchid: "10-60",
  virtual_wisteria: "10-60",
  virtual_purple_mountains_majesty: "10-60",
  virtual_violet: "10-60",
  virtual_plum: "10-60",
  virtual_blue_violet: "10-60",
  virtual_indigo: "10-60",
  virtual_blue: "10-60",
  virtual_cadet_blue: "10-60",
  virtual_periwinkle: "10-60",
  virtual_cornflower: "10-60",
  virtual_blue_green: "10-60",
  virtual_pacific_blue: "10-60",
  virtual_cerulean: "10-60",
  virtual_robin_egg_blue: "10-60",
  virtual_turquoise_blue: "10-60",
  virtual_sea_green: "10-60",
  virtual_granny_smith_apple: "10-60",
  virtual_green: "10-60",
  virtual_forest_green: "10-60",
  virtual_asparagus: "10-60",
  virtual_olive_green: "10-60",
  virtual_yellow_green: "10-60",
  virtual_green_yellow: "10-60",
  virtual_spring_green: "10-60",
  virtual_gold: "10-60",
  virtual_yellow: "10-60",
  virtual_goldenrod: "10-60",
  virtual_dandelion: "10-60",
  virtual_burnt_orange: "10-60",
  virtual_orange: "10-60",
  virtual_melon: "10-60",
  virtual_pink: "10-60",
  virtual_carnation_pink: "10-60",
  virtual_mauvelous: "10-60",
  virtual_salmon: "10-60",
  virtual_tickle_me_pink: "10-60",
  virtual_magenta: "10-60",
  virtual_wild_strawberry: "10-60",
  virtual_violet_red: "10-60",
  virtual_red_violet: "10-60",
  virtual_apricot: "10-60",
  virtual_peach: "10-60",
  virtual_macaroni_and_cheese: "10-60",
  virtual_tan: "10-60",
  virtual_burnt_sienna: "10-60",
  virtual_bittersweet: "10-60",
  virtual_red_orange: "10-60",
  virtual_scarlet: "10-60",
  virtual_red: "10-60",
  virtual_brick_red: "10-60",
  virtual_mahogany: "10-60",
  virtual_chestnut: "10-60",
  virtual_tumbleweed: "10-60",
  virtual_raw_sienna: "10-60",
  virtual_brown: "10-60",

  flatrob: "10-66",
  flatmatt: "10-82",
  flatlou: "10-68",
  flathammock: "10-70",

  crossbow: 20,

  temporaryvirtual: "25-50",
};

const route: Route = {
  path: "map/blast",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { user_id, lat, lng, amount } }) {
        var token = await retrieve({ user_id, teaken: false }, 60);

        var boundaries = [
          spherical.computeOffset({ lat, lng }, 1700, 0),
          spherical.computeOffset({ lat, lng }, 1700, 90),
          spherical.computeOffset({ lat, lng }, 1700, 180),
          spherical.computeOffset({ lat, lng }, 1700, 270),
        ];
        var lat1 = Math.min(...boundaries.map((i) => i.lat()));
        var lat2 = Math.max(...boundaries.map((i) => i.lat()));
        var lng1 = Math.min(...boundaries.map((i) => i.lng()));
        var lng2 = Math.max(...boundaries.map((i) => i.lng()));
        var data = await request(
          "map/boundingbox/v4",
          {
            filters: "12, 105, 76, 34, 139, 140, 143, 98, 93, 51, 686",
            points: {
              box1: {
                lat1,
                lat2,
                lng1,
                lng2,
              },
            },
            fields:
              "munzee_id,friendly_name,latitude,longitude,has_user_captured_munzee,owned_by_user,original_pin_image,capture_type_id,pin_icon,unicorn",
            total_limit: 15000,
          },
          token.access_token
        );

        if (data) {
          let munzees = data?.data?.[0].munzees ?? [];
          munzees = munzees
            .filter((i: any) => !i.unicorn)
            .filter(
              (i: any) =>
                spherical.computeDistanceBetween(
                  { lat: i.latitude, lng: i.longitude },
                  { lat, lng }
                ) *
                  0.0006213712 <=
                1
            )
            .sort((a: any, b: any) => {
              return (
                spherical.computeDistanceBetween(
                  { lat: a.latitude, lng: a.longitude },
                  { lat, lng }
                ) -
                spherical.computeDistanceBetween(
                  { lat: b.latitude, lng: b.longitude },
                  { lat, lng }
                )
              );
            })
            .map((i: any) => {
              if (
                i.original_pin_image.match(/\/([^/]+)\.png/) &&
                pointsForBlast[i.original_pin_image.match(/\/([^/]+)\.png/)[1]]
              ) {
                let p =
                  pointsForBlast[
                    i.original_pin_image.match(/\/([^/]+)\.png/)[1]
                  ];
                if (typeof p === "string") {
                  let x = p.split("-").map(Number);
                  i.points = [x[0], (x[0] + x[1]) / 2, x[1]];
                } else {
                  i.points = [p, p, p];
                }
              } else {
                i.points = [0, 0, 0];
              }
              return i;
            });
          var output = [];
          for (var munzee of munzees) {
            const type = types.getType(munzee.original_pin_image ?? "")
              ?.points || { capture: 0 };
            let typePoints = {
              min: type.capture,
              avg: type.capture,
              max: type.capture,
            };
            if (type.type === PointsType.Split) {
              typePoints = {
                min: type.min,
                avg: (type.split ?? 0) / 2,
                max: (type.split ?? 0) - (type.min ?? 0),
              };
            }
            if (
              output.length === 0 ||
              output[output.length - 1].total === Number(amount || 100)
            ) {
              output.push({
                total: 0,
                points: {
                  min: 0,
                  max: 0,
                  avg: 0,
                },
                types: {} as {
                  [key: string]: {
                    total: number;
                    points: {
                      min: number;
                      max: number;
                      avg: number;
                    };
                  };
                },
              });
            }
            output[output.length - 1].total += 1;
            output[output.length - 1].points = {
              min: output[output.length - 1].points.min + (typePoints.min ?? 0),
              max: output[output.length - 1].points.max + (typePoints.max ?? 0),
              avg: output[output.length - 1].points.avg + (typePoints.avg ?? 0),
            };
            if (
              !output[output.length - 1].types[
                munzee.original_pin_image?.slice(49, -4) ?? ""
              ]
            )
              output[output.length - 1].types[
                munzee.original_pin_image?.slice(49, -4) ?? ""
              ] = {
                total: 0,
                points: {
                  min: 0,
                  max: 0,
                  avg: 0,
                },
              };
            output[output.length - 1].types[
              munzee.original_pin_image?.slice(49, -4) ?? ""
            ] = {
              total:
                output[output.length - 1].types[
                  munzee.original_pin_image?.slice(49, -4) ?? ""
                ].total + 1,
              points: {
                min:
                  output[output.length - 1].types[
                    munzee.original_pin_image?.slice(49, -4) ?? ""
                  ].points.min + (typePoints.min ?? 0),
                max:
                  output[output.length - 1].types[
                    munzee.original_pin_image?.slice(49, -4) ?? ""
                  ].points.max + (typePoints.max ?? 0),
                avg:
                  output[output.length - 1].types[
                    munzee.original_pin_image?.slice(49, -4) ?? ""
                  ].points.avg + (typePoints.avg ?? 0),
              },
            };
          }
          return {
            status: "success",
            data: output,
          };
        } else {
          return {
            status: "error",
          };
        }
      },
    },
  ],
};

export default route;
