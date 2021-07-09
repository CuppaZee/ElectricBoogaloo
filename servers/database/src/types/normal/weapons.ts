import { TypePoints, TypeHidden, TypeState, TypeTags } from "@cuppazee/db";

const weapons: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  weapon: "zeecret" | "clan";
  points?: TypePoints;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
}[] = [
  {
    name: "Mace",
    icons: ["mace"],
    id: "mace",
    munzee_id: 52,
    state: TypeState.Physical,
    weapon: "clan",
  },
  {
    name: "Longsword",
    icons: ["longsword"],
    id: "longsword",
    munzee_id: 53,
    state: TypeState.Physical,
    weapon: "clan",
  },
  {
    name: "Battle Axe",
    icons: ["battleaxe"],
    id: "battleaxe",
    munzee_id: 140,
    state: TypeState.Physical,
    weapon: "clan",
  },
  {
    name: "The Hammer",
    icons: ["thehammer"],
    id: "thehammer",
    munzee_id: 306,
    state: TypeState.Physical,
    weapon: "clan",
  },
  {
    name: "Crossbow",
    icons: ["crossbow"],
    id: "crossbow",
    munzee_id: 998,
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
    icons: ["briefcase"],
    id: "briefcase",
    munzee_id: 1246,
    state: TypeState.Physical,
    weapon: "zeecret",
  },
  {
    name: "Catapult",
    icons: ["catapult"],
    id: "catapult",
    munzee_id: 1248,
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
    icons: ["nightvisiongoggles", "nvgoggles"],
    id: "nightvisiongoggles",
    munzee_id: 1359,
    state: TypeState.Virtual,
    weapon: "zeecret",
  },
  {
    name: "Laser Pen",
    icons: ["laserpen"],
    id: "laserpen",
    munzee_id: 2607,
    state: TypeState.Virtual,
    weapon: "zeecret",
    hidden: [TypeHidden.Deploy, TypeHidden.Inventory],
  },
  {
    name: "Walkie Talkie Watch",
    icons: ["walkietalkiewatch"],
    id: "walkietalkiewatch",
    state: TypeState.Physical,
    weapon: "zeecret",
  },
];

export default weapons;