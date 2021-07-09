import { TypeQuery, TypeState, TypeTags } from "@cuppazee/db";

const tpobhosts: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  hosts: TypeQuery[];
  tags?: TypeTags[];
}[] = [
  {
    name: "Butterfly Host",
    icons: ["butterflyhost"],
    id: "butterflyhost",
    munzee_id: 1843,
    state: TypeState.Physical,
    hosts: [1840, 1841, 1842],
  },
  {
    name: "Butterfly Virtual Host",
    icons: ["butterfly_virtual_host"],
    id: "butterfly_virtual_host",
    munzee_id: 1844,
    state: TypeState.Virtual,
    hosts: [1840, 1841, 1842],
  },
  {
    name: "Frog Host",
    icons: ["froghost"],
    id: "froghost",
    munzee_id: 2113,
    state: TypeState.Physical,
    hosts: [2110, 2111, 2112],
  },
  {
    name: "Frog Virtual Host",
    icons: ["frog_virtual_host"],
    id: "frog_virtual_host",
    munzee_id: 2114,
    state: TypeState.Virtual,
    hosts: [2110, 2111, 2112],
  },
  {
    name: "Temp Bouncer Virtual Host",
    icons: ["tempbouncervirtualhost"],
    id: "tempbouncervirtualhost",
    state: TypeState.Virtual,
    hosts: [2589],
  },
  {
    name: "Temp Bouncer Host",
    icons: ["tempbouncerhost"],
    id: "tempbouncerhost",
    state: TypeState.Physical,
    hosts: ["null_squashedspyderbot"],
  },
];

export default tpobhosts;
