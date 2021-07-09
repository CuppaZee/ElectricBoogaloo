import {
  TypeQuery,
  TypeState,
  TypeTags,
} from "@cuppazee/db";

const pouchhosts: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  hosts: TypeQuery[];
  tags?: TypeTags[];
}[] = [
  {
    name: "Water Pouch Creature Host",
    icons: ["waterpouchcreaturehost"],
    id: "waterpouchcreaturehost",
    munzee_id: 1373,
    state: TypeState.Physical,
    hosts: [1370, 1371, 1372],
  },
  {
    name: "Earth Pouch Creature Host",
    icons: ["earthpouchcreaturehost"],
    id: "earthpouchcreaturehost",
    munzee_id: 1641,
    state: TypeState.Physical,
    hosts: [1638, 1639, 1640],
  },
  {
    name: "Mitmegu Pouch Creature Host",
    icons: ["mitmegupouchcreaturehost"],
    id: "mitmegupouchcreaturehost",
    munzee_id: 1756,
    state: TypeState.Physical,
    hosts: [1752, 1753, 1754, 1755],
  },
  {
    name: "Pimedus Host",
    icons: ["pimedushost"],
    id: "pimedushost",
    munzee_id: 1920,
    state: TypeState.Physical,
    hosts: [1919],
  },
  {
    name: "Pimedus Virtual Host",
    icons: ["pimedus_virtual_host"],
    id: "pimedus_virtual_host",
    munzee_id: 1921,
    state: TypeState.Virtual,
    hosts: [1919],
  },
  {
    name: "Air Pouch Creature Host",
    icons: ["airpouchcreaturehost"],
    id: "airpouchcreaturehost",
    munzee_id: 2243,
    state: TypeState.Virtual,
    hosts: [2240, 2241, 2242],
  },
  {
    name: "Electric Pouch Creature Host",
    icons: ["electricpouchcreaturehost"],
    id: "electricpouchcreaturehost",
    state: TypeState.Virtual,
    hosts: [2407, 2408, 2409],
  },
  {
    name: "Funfinity Host",
    icons: ["funfinityhost"],
    id: "funfinityhost",
    state: TypeState.Physical,
    hosts: [2369],
  },
  {
    name: "Funfinity Virtual Host",
    icons: ["funfinityvirtualhost"],
    id: "funfinityvirtualhost",
    state: TypeState.Virtual,
    hosts: [2372],
  },
];

export default pouchhosts;