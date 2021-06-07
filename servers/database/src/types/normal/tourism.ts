import { TypeState, TypeTags } from "@cuppazee/db";

const tourism: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state?: TypeState;
  tags?: TypeTags[];
}[] = [
  {
    name: "TX Historical Location",
    icons: ["txhistoricallocation"],
    id: "txhistoricallocation",
    munzee_id: 682,
  },
  {
    name: "FL Historical Location",
    icons: ["flhistoricallocation"],
    id: "flhistoricallocation",
    munzee_id: 1474,
  },
  {
    name: "CA Historical Location",
    icons: ["cahistoricallocation"],
    id: "cahistoricallocation",
    munzee_id: 1475,
  },
  {
    name: "World Heritage Historical Location",
    icons: ["worldheritagehistoricallocation"],
    id: "worldheritagehistoricallocation",
    munzee_id: 1489,
  },
  {
    name: "Great Britain Iconic Location",
    icons: ["greatbritainiconiclocation"],
    id: "greatbritainiconiclocation",
    munzee_id: 1552,
  },
  {
    name: "Czech Republic Iconic Location",
    icons: ["czechrepubliciconiclocation"],
    id: "czechrepubliciconiclocation",
    munzee_id: 1767,
  },
  {
    name: "Slovakia Iconic Location",
    icons: ["slovakiaiconiclocation"],
    id: "slovakiaiconiclocation",
    munzee_id: 1768,
  },
  {
    name: "Washington Iconic Location",
    icons: ["washingtoniconiclocation"],
    id: "washingtoniconiclocation",
    munzee_id: 1831,
  },
  {
    name: "New Hampshire Iconic Location",
    icons: ["newhampshireiconiclocation"],
    id: "newhampshireiconiclocation",
    munzee_id: 2196,
  },
  {
    name: "New Mexico Iconic Location",
    icons: ["newmexicoiconiclocation"],
    id: "newmexicoiconiclocation",
    munzee_id: 2197,
  },
  {
    name: "Minnesota Historical Location",
    icons: ["minnesotaiconiclocation"],
    id: "minnesotaiconiclocation",
  },
  {
    name: "Australia Iconic Location",
    icons: ["australiaiconiclocation"],
    id: "australiaiconiclocation",
  },
  {
    name: "MHQ Flat Matt",
    icons: ["mhqflatmatt"],
    id: "mhqflatmatt",
    munzee_id: 1006,
  },
  {
    name: "MHQ Flat Rob",
    icons: ["mhqflatrob"],
    id: "mhqflatrob",
    munzee_id: 1007,
  },
  {
    name: "Tower Bridge Flat Lou",
    icons: ["towerbridgeflatlou"],
    id: "towerbridgeflatlou",
    munzee_id: 1343,
  },
  {
    name: "Gettysburg Flat Hammock",
    icons: ["gettysburgflathammock"],
    id: "gettysburgflathammock",
    munzee_id: 1582,
  },
  {
    name: "InternationElles",
    icons: ["internationelles"],
    id: "internationelles",
    munzee_id: 2046,
    state: TypeState.Physical,
  },
  {
    name: "InternationElles Virtual",
    icons: ["internationellesvirtual"],
    id: "internationellesvirtual",
    munzee_id: 2047,
  },
];

export default tourism;
