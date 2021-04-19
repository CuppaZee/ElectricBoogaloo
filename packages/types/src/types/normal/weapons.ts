import { PointsInterface, TypeHidden, TypeID, TypeState, TypeTags } from "../../munzee";

const weapons: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  weapon: "zeecret" | "clan";
  alt_icons?: string[];
  points?: PointsInterface;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
}[] = [
  {
    name: "Mace",
    icon: "mace",
    id: 52,
    state: TypeState.Physical,
    weapon: "clan",
  },
  {
    name: "Longsword",
    icon: "longsword",
    id: 53,
    state: TypeState.Physical,
    weapon: "clan",
  },
  {
    name: "Battle Axe",
    icon: "battleaxe",
    id: 140,
    state: TypeState.Physical,
    weapon: "clan",
  },
  {
    name: "The Hammer",
    icon: "thehammer",
    id: 306,
    state: TypeState.Physical,
    weapon: "clan",
  },
  {
    name: "Crossbow",
    icon: "crossbow",
    id: 998,
    state: TypeState.Virtual,
    weapon: "clan",
    points: {
      deploy: 25,
      capture: 20,
      capon: 20,
    },
  },
  {
    name: "Briefcase",
    icon: "briefcase",
    id: 1246,
    state: TypeState.Physical,
    weapon: "zeecret",
  },
  {
    name: "Catapult",
    icon: "catapult",
    id: 1248,
    state: TypeState.Virtual,
    weapon: "clan",
    points: {
      deploy: 30,
      capture: 35,
      capon: 35,
    },
  },
  {
    name: "Night Vision Goggles",
    icon: "nightvisiongoggles",
    id: 1359,
    state: TypeState.Virtual,
    weapon: "zeecret",
    alt_icons: ["nvgoggles"],
  },
  {
    name: "Laser Pen",
    icon: "laserpen",
    id: 2607,
    state: TypeState.Virtual,
    weapon: "zeecret",
    hidden: [TypeHidden.Deploy, TypeHidden.Inventory],
  },
  {
    name: "Walkie Talkie Watch",
    icon: "walkietalkiewatch",
    id: "null_walkietalkiewatch",
    state: TypeState.Physical,
    weapon: "zeecret",
  },
];

export default weapons;