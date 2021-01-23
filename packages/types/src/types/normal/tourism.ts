import { TypeID, TypeState, TypeTags } from "../../munzee";

const tourism: {
  name: string;
  icon: string;
  id: TypeID;
  state?: TypeState;
  alt_icons?: string[];
  tags?: TypeTags[];
}[] = [
  {
    name: "TX Historical Location",
    icon: "txhistoricallocation",
    id: 682,
  },
  {
    name: "FL Historical Location",
    icon: "flhistoricallocation",
    id: 1474,
  },
  {
    name: "CA Historical Location",
    icon: "cahistoricallocation",
    id: 1475,
  },
  {
    name: "World Heritage Historical Location",
    icon: "worldheritagehistoricallocation",
    id: 1489,
  },
  {
    name: "Great Britain Iconic Location",
    icon: "greatbritainiconiclocation",
    id: 1552,
  },
  {
    name: "Czech Republic Iconic Location",
    icon: "czechrepubliciconiclocation",
    id: 1767,
  },
  {
    name: "Slovakia Iconic Location",
    icon: "slovakiaiconiclocation",
    id: 1768,
  },
  {
    name: "Washington Iconic Location",
    icon: "washingtoniconiclocation",
    id: 1831,
  },
  {
    name: "New Hampshire Iconic Location",
    icon: "newhampshireiconiclocation",
    id: 2196,
  },
  {
    name: "New Mexico Iconic Location",
    icon: "newmexicoiconiclocation",
    id: 2197,
  },
  {
    name: "Minnesota Historical Location",
    icon: "minnesotaiconiclocation",
    id: "null_minnesotaiconiclocation",
  },
  {
    name: "MHQ Flat Matt",
    icon: "mhqflatmatt",
    id: 1006,
  },
  {
    name: "MHQ Flat Rob",
    icon: "mhqflatrob",
    id: 1007,
  },
  {
    name: "Tower Bridge Flat Lou",
    icon: "towerbridgeflatlou",
    id: 1343,
  },
  {
    name: "Gettysburg Flat Hammock",
    icon: "gettysburgflathammock",
    id: 1582,
  },
  {
    name: "InternationElles",
    icon: "internationelles",
    id: 2046,
    state: TypeState.Physical,
  },
  {
    name: "InternationElles Virtual",
    icon: "internationellesvirtual",
    id: 2047,
  },
];

export default tourism;
