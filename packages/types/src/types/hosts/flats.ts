import { TypeID, TypeState, TypeTags } from "../../munzee";

const flathosts: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  hosts: TypeID[];
  tags?: TypeTags[];
}[] = [
  {
    name: "Fancy Flat Rob Host",
    icon: "fancyflatrobhost",
    id: 1708,
    state: TypeState.Physical,
    hosts: [1705, 1706, 1707],
  },
  {
    name: "Fancy Flat Rob Virtual Host",
    icon: "fancy_flat_rob_virtual_host",
    id: 1709,
    state: TypeState.Virtual,
    hosts: [1705, 1706, 1707],
  },
  {
    name: "Fancy Flat Matt Host",
    icon: "fancyflatmatthost",
    id: 1988,
    state: TypeState.Physical,
    hosts: [1985, 1986, 1987],
  },
  {
    name: "Fancy Flat Matt Virtual Host",
    icon: "fancy_flat_matt_virtual_host",
    id: 1989,
    state: TypeState.Virtual,
    hosts: [1985, 1986, 1987],
  },
  {
    name: "Fancy Flat Lou Host",
    icon: "fancyflatlouhost",
    id: "fflhost",
    state: TypeState.Physical,
    hosts: ["null_iflatlou", "null_gbflatlou", "null_pflatlou"],
  },
  {
    name: "Fancy Flat Lou Virtual Host",
    icon: "fancy_flat_lou_virtual_host",
    id: "fflvhost",
    state: TypeState.Virtual,
    hosts: ["null_iflatlou", "null_gbflatlou", "null_pflatlou"],
  },
];

export default flathosts;
