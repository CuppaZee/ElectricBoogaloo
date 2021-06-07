import {
  TypePoints,
  TypePointsType,
  TypeHidden,
  TypeState,
  TypeTags,
} from "@cuppazee/db";

const mysteries: {
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
    name: "Mystery",
    icons: ["mystery"],
    id: "mystery",
    munzee_id: 280,
    state: TypeState.Physical,
    points: {
      deploy: 60,
      type: TypePointsType.Split,
      split: 80,
      min: 20,
    },
  },
  {
    name: "Fire Mystery",
    icons: ["firemystery"],
    id: "firemystery",
    munzee_id: 532,
    state: TypeState.Physical,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: TypePointsType.Split,
      split: 60,
      min: 10,
      interval: 5,
    },
  },
  {
    name: "Ice Mystery",
    icons: ["icemystery"],
    id: "icemystery",
    munzee_id: 651,
    state: TypeState.Physical,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: TypePointsType.Split,
      split: 60,
      min: 5,
      interval: 5,
    },
  },
  {
    name: "Earth Mystery",
    icons: ["earthmystery"],
    id: "earthmystery",
    munzee_id: 851,
    state: TypeState.Physical,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: TypePointsType.Split,
      split: 60,
      min: 5,
      interval: 5,
    },
  },
  {
    name: "Water Mystery",
    icons: ["watermystery"],
    id: "watermystery",
    munzee_id: 1020,
    state: TypeState.Physical,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: TypePointsType.Split,
      split: 60,
      min: 5,
      interval: 5,
    },
  },
  {
    name: "Air Mystery",
    icons: ["airmystery"],
    id: "airmystery",
    munzee_id: 1086,
    state: TypeState.Virtual,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: TypePointsType.Split,
      split: 60,
      min: 5,
      interval: 5,
    },
  },
  {
    name: "Electric Mystery",
    icons: ["electricmystery"],
    id: "electricmystery",
    munzee_id: 2391,
    state: TypeState.Virtual,
    tags: [TypeTags.TypeMysteryElemental],
    points: {
      deploy: 50,
      type: TypePointsType.Split,
      split: 60,
      min: 10,
      interval: 5,
    },
  },
];

export default mysteries;
