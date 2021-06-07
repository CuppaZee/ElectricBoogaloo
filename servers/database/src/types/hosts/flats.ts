import { TypeQuery, TypeState, TypeTags } from "@cuppazee/db";

const flathosts: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  hosts: TypeQuery[];
  tags?: TypeTags[];
}[] = [
  {
    name: "Fancy Flat Rob Host",
    icons: ["fancyflatrobhost"],
    id: "fancyflatrobhost",
    munzee_id: 1708,
    state: TypeState.Physical,
    hosts: [1705, 1706, 1707],
  },
  {
    name: "Fancy Flat Rob Virtual Host",
    icons: ["fancy_flat_rob_virtual_host"],
    id: "fancy_flat_rob_virtual_host",
    munzee_id: 1709,
    state: TypeState.Virtual,
    hosts: [1705, 1706, 1707],
  },
  {
    name: "Fancy Flat Matt Host",
    icons: ["fancyflatmatthost"],
    id: "fancyflatmatthost",
    munzee_id: 1988,
    state: TypeState.Physical,
    hosts: [1985, 1986, 1987],
  },
  {
    name: "Fancy Flat Matt Virtual Host",
    icons: ["fancy_flat_matt_virtual_host"],
    id: "fancy_flat_matt_virtual_host",
    munzee_id: 1989,
    state: TypeState.Virtual,
    hosts: [1985, 1986, 1987],
  },
  {
    name: "Fancy Flat Lou Host",
    icons: ["fancyflatlouhost"],
    id: "fancyflatlouhost",
    state: TypeState.Physical,
    hosts: [2625, 2626, 2627],
  },
  {
    name: "Fancy Flat Lou Virtual Host",
    icons: ["fancy_flat_lou_virtual_host"],
    id: "fancy_flat_lou_virtual_host",
    state: TypeState.Virtual,
    hosts: [2625, 2626, 2627],
  },
];

export default flathosts;
