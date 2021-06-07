import {
  TypePoints,
  TypePointsType,
  TypeHidden,
  TypeState,
  TypeTags,
} from "@cuppazee/db";

const flats: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  points?: TypePoints;
}[] = [
  {
    name: "Flat Rob",
    icons: ["flatrob"],
    id: "flatrob",
    munzee_id: 353,
    state: TypeState.Virtual,
    points: {
      deploy: 19,
      type: TypePointsType.Split,
      split: 76,
      min: 10,
    },
  },
  {
    name: "Flat Matt",
    icons: ["flatmatt"],
    id: "flatmatt",
    munzee_id: 1015,
    state: TypeState.Virtual,
    points: {
      deploy: 19,
      type: TypePointsType.Split,
      split: 92,
      min: 10,
    },
  },
  {
    name: "Flat Lou",
    icons: ["flatlou"],
    id: "flatlou",
    munzee_id: 1338,
    state: TypeState.Virtual,
    points: {
      deploy: 19,
      type: TypePointsType.Split,
      split: 78,
      min: 10,
    },
  },
  {
    name: "Flat Hammock",
    icons: ["flathammock"],
    id: "flathammock",
    munzee_id: 1581,
    state: TypeState.Virtual,
    points: {
      deploy: 19,
      type: TypePointsType.Split,
      split: 80,
      min: 10,
    },
  },
  {
    name: "Flat DHS",
    icons: ["flatdhs"],
    id: "flatdhs",
    state: TypeState.Virtual,
    points: {
      deploy: 19,
      type: TypePointsType.Split,
      split: 94,
      min: 19,
    },
  },
  {
    name: "Flat Disc Golf Basket",
    icons: ["flatdiscgolfbasket"],
    id: "flatdiscgolfbasket",
    state: TypeState.Virtual,
    points: {
      deploy: 19,
      type: TypePointsType.Split,
      split: 90,
      min: 19,
    },
  },
];

export default flats;
