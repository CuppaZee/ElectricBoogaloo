import { TypeID, TypeMeta, TypeState, TypeTags } from "../../munzee";

export default [
  {
    name: "Butterfly Host",
    icon: "butterflyhost",
    id: 1843,
    state: TypeState.Physical,
    hosts: [1840, 1841, 1842],
  },
  {
    name: "Butterfly Virtual Host",
    icon: "butterfly_virtual_host",
    id: 1844,
    state: TypeState.Virtual,
    hosts: [1840, 1841, 1842],
  },
  {
    name: "Frog Host",
    icon: "froghost",
    id: 2113,
    state: TypeState.Physical,
    hosts: [2110, 2111, 2112],
  },
  {
    name: "Frog Virtual Host",
    icon: "frog_virtual_host",
    id: 2114,
    state: TypeState.Virtual,
    hosts: [2110, 2111, 2112],
  },
] as {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  hosts: TypeID[];
  tags?: TypeTags[];
}[];