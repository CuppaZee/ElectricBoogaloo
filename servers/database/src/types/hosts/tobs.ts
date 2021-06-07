import { TypeQuery, TypeState, TypeTags } from "@cuppazee/db";

const tobhosts: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  hosts: TypeQuery[];
  tags?: TypeTags[];
}[] = [
  {
    name: "Fire Pegasus Physical Host",
    icons: ["firepegasusphysicalhost"],
    id: "firepegasusphysicalhost",
    munzee_id: 1232,
    state: TypeState.Physical,
    tags: [
      TypeTags.BouncerHostMyth,
      TypeTags.BouncerHostMythAlterna,
      TypeTags.BouncerHostMythClassical,
    ],
    hosts: [1229],
  },
  {
    name: "Cherub Virtual Host",
    icons: ["cherub_virtual_host"],
    id: "cherub_virtual_host",
    munzee_id: 1238,
    state: TypeState.Virtual,
    tags: [
      TypeTags.BouncerHostMyth,
      TypeTags.BouncerHostMythAlterna,
      TypeTags.BouncerHostMythClassical,
    ],
    hosts: [1237],
  },
  {
    name: "Ogre Host",
    icons: ["ogrehost"],
    id: "ogrehost",
    munzee_id: 1269,
    state: TypeState.Physical,
    tags: [
      TypeTags.BouncerHostMyth,
      TypeTags.BouncerHostMythAlterna,
      TypeTags.BouncerHostMythClassical,
    ],
    hosts: [1268],
  },
  {
    name: "Ogre Virtual Host",
    icons: ["ogre_virtual_host"],
    id: "ogre_virtual_host",
    munzee_id: 1270,
    state: TypeState.Virtual,
    tags: [
      TypeTags.BouncerHostMyth,
      TypeTags.BouncerHostMythAlterna,
      TypeTags.BouncerHostMythClassical,
    ],
    hosts: [1268],
  },
  {
    name: "Chimera Virtual Host",
    icons: ["chimera_virtual_host"],
    id: "chimera_virtual_host",
    munzee_id: 1330,
    state: TypeState.Virtual,
    tags: [
      TypeTags.BouncerHostMyth,
      TypeTags.BouncerHostMythAlterna,
      TypeTags.BouncerHostMythClassical,
    ],
    hosts: [1329],
  },
  {
    name: "Hadavale Host",
    icons: ["hadavalehost"],
    id: "hadavalehost",
    munzee_id: 1746,
    state: TypeState.Physical,
    tags: [TypeTags.BouncerHostPC, TypeTags.BouncerHostPCEscaped],
    hosts: [1745],
  },
  {
    name: "Hadavale Virtual Host",
    icons: ["hadavale_virtual_host"],
    id: "hadavale_virtual_host",
    munzee_id: 1747,
    state: TypeState.Virtual,
    tags: [TypeTags.BouncerHostPC, TypeTags.BouncerHostPCEscaped],
    hosts: [1745],
  },
];

export default tobhosts;
