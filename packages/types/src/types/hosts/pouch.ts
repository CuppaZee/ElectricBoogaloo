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
];

export default pouchhosts;