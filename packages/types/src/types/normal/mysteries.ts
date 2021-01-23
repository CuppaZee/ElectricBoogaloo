import {
  PointsInterface,
  PointsType,
  TypeHidden,
  TypeID,
  TypeState,
  TypeTags,
} from "../../munzee";

const mysteries: {
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
    name: "Mystery",
    icon: "mystery",
    id: 280,
    state: TypeState.Physical,
    points: {
      deploy: 60,
      type: PointsType.Split,
      split: 80,
      min: 20,
    },
  },
  {
    name: "Fire Mystery",
    icon: "firemystery",
    id: 532,
    state: TypeState.Physical,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: PointsType.Split,
      split: 60,
      min: 10,
      interval: 5,
    },
  },
  {
    name: "Ice Mystery",
    icon: "icemystery",
    id: 651,
    state: TypeState.Physical,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: PointsType.Split,
      split: 60,
      min: 5,
      interval: 5,
    },
  },
  {
    name: "Earth Mystery",
    icon: "earthmystery",
    id: 851,
    state: TypeState.Physical,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: PointsType.Split,
      split: 60,
      min: 5,
      interval: 5,
    },
  },
  {
    name: "Water Mystery",
    icon: "watermystery",
    id: 1020,
    state: TypeState.Physical,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: PointsType.Split,
      split: 60,
      min: 5,
      interval: 5,
    },
  },
  {
    name: "Air Mystery",
    icon: "airmystery",
    id: 1086,
    state: TypeState.Virtual,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: PointsType.Split,
      split: 60,
      min: 5,
      interval: 5,
    },
  },
  {
    name: "Electric Mystery",
    icon: "electricmystery",
    id: 2391,
    state: TypeState.Virtual,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: PointsType.Split,
      split: 60,
      min: 10,
      interval: 5,
    },
  },
];

export default mysteries;
