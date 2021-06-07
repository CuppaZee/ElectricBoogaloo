import {
  TypePoints,
  TypeHidden,
  TypeMeta,
  TypeState,
  TypeTags,
} from "@cuppazee/db";

const education: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  stage?: number;
  base?: string;

  meta?: TypeMeta;
  points?: TypePoints;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
}[] = [
  {
    name: "Shark",
    icons: ["shark"],
    id: "shark",
    munzee_id: 741,
    state: TypeState.Physical,
    stage: 3,
    base: "seaweed",
    hidden: [],
  },
  {
    name: "Seaweed",
    icons: ["seaweed"],
    id: "seaweed",
    munzee_id: 742,
    state: TypeState.Physical,
    stage: 1,
    base: "seaweed",
  },
  {
    name: "Fish",
    icons: ["fish"],
    id: "fish",
    munzee_id: 743,
    state: TypeState.Physical,
    stage: 2,
    base: "seaweed",
  },
  {
    name: "Submarine",
    icons: ["submarine"],
    id: "submarine",
    munzee_id: 744,
    state: TypeState.Virtual,
    stage: 3,
    base: "canoe",
    hidden: [],
  },
  {
    name: "Canoe",
    icons: ["canoe"],
    id: "canoe",
    munzee_id: 745,
    state: TypeState.Virtual,
    stage: 1,
    base: "canoe",
  },
  {
    name: "Motorboat",
    icons: ["motorboat"],
    id: "motorboat",
    munzee_id: 746,
    state: TypeState.Virtual,
    stage: 2,
    base: "canoe",
  },
  {
    name: "Egg",
    icons: ["egg"],
    id: "egg",
    munzee_id: 800,
    state: TypeState.Physical,
    stage: 1,
    base: "egg",
  },
  {
    name: "Dinosaur",
    icons: ["dinosaur"],
    id: "dinosaur",
    munzee_id: 801,
    state: TypeState.Physical,
    stage: 2,
    base: "egg",
  },
  {
    name: "Bones",
    icons: ["bones"],
    id: "bones",
    munzee_id: 802,
    state: TypeState.Physical,
    stage: 3,
    base: "egg",
    hidden: [],
  },
  {
    name: "Muscle Car",
    icons: ["musclecar"],
    id: "musclecar",
    munzee_id: 807,
    state: TypeState.Virtual,
    stage: 3,
    base: "firstwheel",
    hidden: [],
  },
  {
    name: "First Wheel",
    icons: ["firstwheel"],
    id: "firstwheel",
    munzee_id: 808,
    state: TypeState.Virtual,
    stage: 1,
    base: "firstwheel",
  },
  {
    name: "Penny-Farthing Bike",
    icons: ["penny-farthingbike"],
    id: "penny-farthingbike",
    munzee_id: 809,
    state: TypeState.Virtual,
    stage: 2,
    base: "firstwheel",
  },
  {
    name: "King of the Jungle",
    icons: ["kingofthejungle"],
    id: "kingofthejungle",
    munzee_id: 835,
    state: TypeState.Physical,
    stage: 3,
    base: "lioncub",
    hidden: [],
  },
  {
    name: "Lion Cub",
    icons: ["lioncub"],
    id: "lioncub",
    munzee_id: 837,
    state: TypeState.Physical,
    stage: 1,
    base: "lioncub",
  },
  {
    name: "Lion",
    icons: ["lion"],
    id: "lion",
    munzee_id: 838,
    state: TypeState.Physical,
    stage: 2,
    base: "lioncub",
  },
  {
    name: "Safari Bus",
    icons: ["safaribus"],
    id: "safaribus",
    munzee_id: 839,
    state: TypeState.Virtual,
    stage: 3,
    base: "safaritruck",
    hidden: [],
  },
  {
    name: "Safari Truck",
    icons: ["safaritruck"],
    id: "safaritruck",
    munzee_id: 840,
    state: TypeState.Virtual,
    stage: 1,
    base: "safaritruck",
  },
  {
    name: "Safari Van",
    icons: ["safarivan"],
    id: "safarivan",
    munzee_id: 841,
    state: TypeState.Virtual,
    stage: 2,
    base: "safaritruck",
  },
];

export default education;
