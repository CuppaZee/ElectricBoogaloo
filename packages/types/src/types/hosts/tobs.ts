import { TypeID, TypeMeta, TypeState, TypeTags } from "../../munzee";

export default [
  {
    name: "Fire Pegasus Physical Host",
    icon: "firepegasusphysicalhost",
    id: 1232,
    state: TypeState.Physical,
    tags: [TypeTags.BouncerHostMyth, TypeTags.BouncerHostMythAlterna, TypeTags.BouncerHostMythClassical],
    hosts: [1229],
  },
  {
    name: "Cherub Virtual Host",
    icon: "cherub_virtual_host",
    id: 1238,
    state: TypeState.Virtual,
    tags: [TypeTags.BouncerHostMyth, TypeTags.BouncerHostMythAlterna, TypeTags.BouncerHostMythClassical],
    hosts: [1237],
  },
  {
    name: "Ogre Host",
    icon: "ogrehost",
    id: 1269,
    state: TypeState.Physical,
    tags: [TypeTags.BouncerHostMyth, TypeTags.BouncerHostMythAlterna, TypeTags.BouncerHostMythClassical],
    hosts: [1268],
  },
  {
    name: "Ogre Virtual Host",
    icon: "ogre_virtual_host",
    id: 1270,
    state: TypeState.Virtual,
    tags: [TypeTags.BouncerHostMyth, TypeTags.BouncerHostMythAlterna, TypeTags.BouncerHostMythClassical],
    hosts: [1268],
  },
  {
    name: "Chimera Virtual Host",
    icon: "chimera_virtual_host",
    id: 1330,
    state: TypeState.Virtual,
    tags: [TypeTags.BouncerHostMyth, TypeTags.BouncerHostMythAlterna, TypeTags.BouncerHostMythClassical],
    hosts: [1329],
  },
  {
    name: "Hadavale Host",
    icon: "hadavalehost",
    id: 1746,
    state: TypeState.Physical,
    tags: [TypeTags.BouncerHostPC, TypeTags.BouncerHostPCEscaped],
    hosts: [1745],
  },
  {
    name: "Hadavale Virtual Host",
    icon: "hadavale_virtual_host",
    id: 1747,
    state: TypeState.Virtual,
    tags: [TypeTags.BouncerHostPC, TypeTags.BouncerHostPCEscaped],
    hosts: [1745],
  },
] as {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  hosts: TypeID[];
  tags?: TypeTags[];
}[];