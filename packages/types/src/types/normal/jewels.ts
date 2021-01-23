import {
  PointsInterface,
  PointsType,
  TypeHidden,
  TypeID,
  TypeState,
  TypeTags,
} from "../../munzee";

const jewels: {
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
    name: "Diamond",
    icon: "diamond",
    id: 40,
    state: TypeState.Physical,
    points: {
      deploy: 65,
      type: PointsType.Split,
      split: 80,
      min: 20,
    },
  },
  {
    name: "Ruby",
    icon: "ruby",
    id: 131,
    state: TypeState.Physical,
    points: {
      deploy: 50,
      type: PointsType.Split,
      split: 70,
      min: 20,
    },
  },
  {
    name: "Virtual Emerald",
    icon: "virtual_emerald",
    id: 148,
    state: TypeState.Virtual,
    points: {
      deploy: 50,
      capture: 40,
      capon: 50,
    },
    alt_icons: ["gardenpin"],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Aquamarine",
    icon: "aquamarine",
    id: 218,
    state: TypeState.Physical,
    points: {
      deploy: 30,
      type: PointsType.Split,
      split: 40,
      min: 15,
    },
    alt_icons: ["aquamarinemunzee"],
  },
  {
    name: "Topaz",
    icon: "topaz",
    id: 242,
    state: TypeState.Physical,
    points: {
      deploy: 40,
      type: PointsType.Split,
      split: 60,
      min: 15,
    },
  },
  {
    name: "Virtual Amethyst",
    icon: "virtual_amethyst",
    id: 290,
    state: TypeState.Virtual,
    points: {
      deploy: 30,
      capture: 50,
      capon: 35,
    },
  },
  {
    name: "Pink Diamond",
    icon: "pinkdiamond",
    id: 584,
    state: TypeState.Physical,
    points: {
      deploy: 45,
      type: PointsType.Split,
      split: 70,
      min: 15,
    },
  },
  {
    name: "Virtual Sapphire",
    icon: "virtual_sapphire",
    id: 681,
    state: TypeState.Virtual,
    points: {
      deploy: 45,
      capture: 36,
      capon: 36,
    },
  },
  {
    name: "Virtual Citrine",
    icon: "virtual_citrine",
    id: 2361,
    state: TypeState.Virtual,
    points: {
      deploy: 40,
      capture: 45,
      capon: 40,
    },
  },
  {
    name: "Virtual Onyx",
    icon: "virtual_onyx",
    id: 2362,
    state: TypeState.Virtual,
    points: {
      deploy: 50,
      capture: 50,
      capon: 40,
    },
  },
];

export default jewels;