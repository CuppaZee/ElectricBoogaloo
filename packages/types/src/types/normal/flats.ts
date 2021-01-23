import {
  PointsInterface,
  PointsType,
  TypeHidden,
  TypeID,
  TypeState,
  TypeTags,
} from "../../munzee";

const flats: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  alt_icons?: string[];
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  points?: PointsInterface;
}[] = [
  {
    name: "Flat Rob",
    icon: "flatrob",
    id: 353,
    state: TypeState.Virtual,
    points: {
      deploy: 19,
      type: PointsType.Split,
      split: 76,
      min: 10,
    },
  },
  {
    name: "Flat Matt",
    icon: "flatmatt",
    id: 1015,
    state: TypeState.Virtual,
    points: {
      deploy: 19,
      type: PointsType.Split,
      split: 92,
      min: 10,
    },
  },
  {
    name: "Flat Lou",
    icon: "flatlou",
    id: 1338,
    state: TypeState.Virtual,
    points: {
      deploy: 19,
      type: PointsType.Split,
      split: 78,
      min: 10,
    },
  },
  {
    name: "Flat Hammock",
    icon: "flathammock",
    id: 1581,
    state: TypeState.Virtual,
    points: {
      deploy: 19,
      type: PointsType.Split,
      split: 80,
      min: 10,
    },
  },
];

export default flats;
