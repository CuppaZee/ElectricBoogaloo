import {
  TypePoints,
  TypePointsType,
  TypeHidden,
  TypeState,
  TypeTags,
} from "@cuppazee/db";

const jewels: {
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
    name: "Diamond",
    icons: ["diamond"],
    id: "diamond",
    munzee_id: 40,
    state: TypeState.Physical,
    points: {
      deploy: 65,
      type: TypePointsType.Split,
      split: 80,
      min: 20,
    },
  },
  {
    name: "Ruby",
    icons: ["ruby"],
    id: "ruby",
    munzee_id: 131,
    state: TypeState.Physical,
    points: {
      deploy: 50,
      type: TypePointsType.Split,
      split: 70,
      min: 20,
    },
  },
  {
    name: "Virtual Emerald",
    icons: ["virtual_emerald", "gardenpin"],
    id: "virtual_emerald",
    munzee_id: 148,
    state: TypeState.Virtual,
    points: {
      deploy: 50,
      capture: 40,
      capon: 50,
    },
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Aquamarine",
    icons: ["aquamarine", "aquamarinemunzee"],
    id: "aquamarine",
    munzee_id: 218,
    state: TypeState.Physical,
    points: {
      deploy: 30,
      type: TypePointsType.Split,
      split: 40,
      min: 15,
    },
  },
  {
    name: "Topaz",
    icons: ["topaz"],
    id: "topaz",
    munzee_id: 242,
    state: TypeState.Physical,
    points: {
      deploy: 40,
      type: TypePointsType.Split,
      split: 60,
      min: 15,
    },
  },
  {
    name: "Virtual Amethyst",
    icons: ["virtual_amethyst"],
    id: "virtual_amethyst",
    munzee_id: 290,
    state: TypeState.Virtual,
    points: {
      deploy: 30,
      capture: 50,
      capon: 35,
    },
  },
  {
    name: "Pink Diamond",
    icons: ["pinkdiamond"],
    id: "pinkdiamond",
    munzee_id: 584,
    state: TypeState.Physical,
    points: {
      deploy: 45,
      type: TypePointsType.Split,
      split: 70,
      min: 15,
    },
  },
  {
    name: "Virtual Sapphire",
    icons: ["virtual_sapphire"],
    id: "virtual_sapphire",
    munzee_id: 681,
    state: TypeState.Virtual,
    points: {
      deploy: 45,
      capture: 36,
      capon: 36,
    },
  },
  {
    name: "Virtual Citrine",
    icons: ["virtual_citrine"],
    id: "virtual_citrine",
    munzee_id: 2361,
    state: TypeState.Virtual,
    points: {
      deploy: 40,
      capture: 45,
      capon: 40,
    },
  },
  {
    name: "Virtual Onyx",
    icons: ["virtual_onyx"],
    id: "virtual_onyx",
    munzee_id: 2362,
    state: TypeState.Virtual,
    points: {
      deploy: 50,
      capture: 50,
      capon: 40,
    },
  },
];

export default jewels;