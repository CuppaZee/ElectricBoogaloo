import {
  PointsInterface,
  TypeHidden,
  TypeID,
  TypeMeta,
  TypeState,
  TypeTags,
} from "../../munzee";

const education: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  stage?: number;
  base?: string;

  meta?: TypeMeta;
  alt_icons?: string[];
  points?: PointsInterface;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
}[] = [
  {
    name: "Shark",
    icon: "shark",
    id: 741,
    state: TypeState.Physical,
    stage: 3,
    base: "seaweed",
    hidden: [],
  },
  {
    name: "Seaweed",
    icon: "seaweed",
    id: 742,
    state: TypeState.Physical,
    stage: 1,
    base: "seaweed",
  },
  {
    name: "Fish",
    icon: "fish",
    id: 743,
    state: TypeState.Physical,
    stage: 2,
    base: "seaweed",
  },
  {
    name: "Submarine",
    icon: "submarine",
    id: 744,
    state: TypeState.Virtual,
    stage: 3,
    base: "canoe",
    hidden: [],
  },
  {
    name: "Canoe",
    icon: "canoe",
    id: 745,
    state: TypeState.Virtual,
    stage: 1,
    base: "canoe",
  },
  {
    name: "Motorboat",
    icon: "motorboat",
    id: 746,
    state: TypeState.Virtual,
    stage: 2,
    base: "canoe",
  },
  {
    name: "Egg",
    icon: "egg",
    id: 800,
    state: TypeState.Physical,
    stage: 1,
    base: "egg",
  },
  {
    name: "Dinosaur",
    icon: "dinosaur",
    id: 801,
    state: TypeState.Physical,
    stage: 2,
    base: "egg",
  },
  {
    name: "Bones",
    icon: "bones",
    id: 802,
    state: TypeState.Physical,
    stage: 3,
    base: "egg",
    hidden: [],
  },
  {
    name: "Muscle Car",
    icon: "musclecar",
    id: 807,
    state: TypeState.Virtual,
    stage: 3,
    base: "firstwheel",
    hidden: [],
  },
  {
    name: "First Wheel",
    icon: "firstwheel",
    id: 808,
    state: TypeState.Virtual,
    stage: 1,
    base: "firstwheel",
  },
  {
    name: "Penny-Farthing Bike",
    icon: "penny-farthingbike",
    id: 809,
    state: TypeState.Virtual,
    stage: 2,
    base: "firstwheel",
  },
  {
    name: "King of the Jungle",
    icon: "kingofthejungle",
    id: 835,
    state: TypeState.Physical,
    stage: 3,
    base: "lioncub",
    hidden: [],
  },
  {
    name: "Lion Cub",
    icon: "lioncub",
    id: 837,
    state: TypeState.Physical,
    stage: 1,
    base: "lioncub",
  },
  {
    name: "Lion",
    icon: "lion",
    id: 838,
    state: TypeState.Physical,
    stage: 2,
    base: "lioncub",
  },
  {
    name: "Safari Bus",
    icon: "safaribus",
    id: 839,
    state: TypeState.Virtual,
    stage: 3,
    base: "safaritruck",
    hidden: [],
  },
  {
    name: "Safari Truck",
    icon: "safaritruck",
    id: 840,
    state: TypeState.Virtual,
    stage: 1,
    base: "safaritruck",
  },
  {
    name: "Safari Van",
    icon: "safarivan",
    id: 841,
    state: TypeState.Virtual,
    stage: 2,
    base: "safaritruck",
  },
];

export default education;
