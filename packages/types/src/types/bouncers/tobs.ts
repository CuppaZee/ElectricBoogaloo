import { TypeID, TypeMeta, TypeState, TypeTags } from "../../munzee";

const tobs: {
  name: string;
  icon: string;
  id: TypeID;
  tags?: TypeTags[];
  lands_on: TypeID[];
  meta?: TypeMeta;
}[] = [
  {
    name: "Rainbow Unicorn",
    icon: "rainbowunicorn",
    id: 1118,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythOriginal],
    lands_on: ["munzee", "shamrock"],
  },
  {
    name: "Gnome Leprechaun",
    icon: "gnomeleprechaun",
    id: 1151,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythOriginal],
    lands_on: ["munzee", "shamrock", "earthmystery"],
  },
  {
    name: "Ice Dragon",
    icon: "icedragon",
    id: 1164,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythOriginal],
    lands_on: ["munzee", "firemystery", "icemystery"],
  },
  {
    name: "Sasquatch Yeti",
    icon: "sasquatchyeti",
    id: 1210,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythOriginal],
    lands_on: ["munzee", "icemystery", "earthmystery"],
  },
  {
    name: "Fire Pegasus",
    icon: "firepegasus",
    id: 1229,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythClassical],
    lands_on: [":virtual", "airmystery", "firemystery"],
  },
  {
    name: "Cherub",
    icon: "cherub",
    id: 1237,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythClassical],
    lands_on: [":virtual", "airmystery", "earthmystery"],
  },
  {
    name: "Ogre",
    icon: "ogre",
    id: 1268,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythClassical],
    lands_on: ["munzee", ":jewel", "mace", "longsword", "battleaxe", "thehammer", "crossbow"],
  },
  {
    name: "Chimera",
    icon: "chimera",
    id: 1329,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythClassical],
    lands_on: [
      "munzee",
      ":virtual",
      "shamrock",
      type => type.has_tag(TypeTags.TypeMysteryElemental),
      ":jewel",
      ":clan",
    ],
  },
  {
    name: "Siren",
    icon: "siren",
    id: 1485,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythMirror],
    lands_on: ["munzee", "watermystery", "icemystery"],
  },
  {
    name: "Fairy Godmother",
    icon: "fairygodmother",
    id: 1630,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythMirror],
    lands_on: ["munzee", "mystery", ":virtual", "airmystery", ":jewel"],
  },
  {
    name: "Hadavale",
    icon: "hadavale",
    id: 1745,
    tags: [TypeTags.BouncerPC, TypeTags.BouncerPCEscaped],
    lands_on: [
      "icemystery",
      "premium",
      "shamrock",
      "mystery",
      ":reseller",
      type => type.meta.evolution_stage === 1,
      "airmystery",
    ],
  },
  {
    name: "Gorgon",
    icon: "gorgon",
    id: 1929,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythMirror],
    lands_on: [
      "munzee",
      "premium",
      "shamrock",
      type => type.has_tag(TypeTags.TypeZodiacWestern),
      ":jewel",
      "virtual_gold",
      "virtual_yellow",
      "virtual_goldenrod",
      "virtual_dandelion",
    ],
  },
  {
    name: "Mother Earth",
    icon: "motherearth",
    id: 2337,
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerMythAlterna, TypeTags.BouncerMythMirror],
    lands_on: [
      "munzee",
      "shamrock",
      type => type.has_tag(TypeTags.TypeMysteryElemental),
      type => type.has_tag(TypeTags.VirtualColourBrown),
      type => type.has_tag(TypeTags.VirtualColourGreen),
    ],
  },
  {
    name: "Vikerkaar",
    icon: "vikerkaar",
    id: 2716,
    tags: [TypeTags.BouncerPC, TypeTags.BouncerPCEscaped],
    lands_on: [
      "earthmystery",
      "firemystery",
      "airmystery",
      "diamond",
      "ruby",
      "aquamarine",
      "topaz",
      "pinkdiamond",
      "virtual_sapphire",
      "virtual_citrine",
      "virtual_onyx",
      "virtual_amethyst",
      "virtual_emerald",
    ],
  },
];

export default tobs;
