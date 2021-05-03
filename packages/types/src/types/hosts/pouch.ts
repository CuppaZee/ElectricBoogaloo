import {
  TypeID,
  TypeState,
  TypeTags,
} from "../../munzee";

const pouchhosts: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  hosts: TypeID[];
  tags?: TypeTags[];
}[] = [
  {
    name: "Water Pouch Creature Host",
    icon: "waterpouchcreaturehost",
    id: 1373,
    state: TypeState.Physical,
    hosts: [1370, 1371, 1372],
  },
  {
    name: "Earth Pouch Creature Host",
    icon: "earthpouchcreaturehost",
    id: 1641,
    state: TypeState.Physical,
    hosts: [1638, 1639, 1640],
  },
  {
    name: "Mitmegu Pouch Creature Host",
    icon: "mitmegupouchcreaturehost",
    id: 1756,
    state: TypeState.Physical,
    hosts: [1752, 1753, 1754, 1755],
  },
  {
    name: "Pimedus Host",
    icon: "pimedushost",
    id: 1920,
    state: TypeState.Physical,
    hosts: [1919],
  },
  {
    name: "Pimedus Virtual Host",
    icon: "pimedus_virtual_host",
    id: 1921,
    state: TypeState.Virtual,
    hosts: [1919],
  },
  {
    name: "Air Pouch Creature Host",
    icon: "airpouchcreaturehost",
    id: 2243,
    state: TypeState.Virtual,
    hosts: [2240, 2241, 2242],
  },
  {
    name: "Electric Pouch Creature Host",
    icon: "electricpouchcreaturehost",
    id: "null_electricpouchcreaturehost",
    state: TypeState.Virtual,
    hosts: [2407, 2408, 2409],
  },
  {
    name: "Funfinity Host",
    icon: "funfinityhost",
    id: "null_funfinityhost",
    state: TypeState.Physical,
    hosts: [2369],
  },
  {
    name: "Funfinity Virtual Host",
    icon: "funfinityvirtualhost",
    id: "null_funfinityvirtualhost",
    state: TypeState.Virtual,
    hosts: [2372],
  },
];

export default pouchhosts;