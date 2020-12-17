import { TypeID, TypeMeta, TypeState, TypeTags } from "../../munzee";

export default module.exports = [
  {
    name: "Retired Unicorn",
    icon: "retiredunicorn",
    id: 1535,
    lands_on: ["munzee", "shamrock"],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Retired Leprechaun",
    icon: "retiredleprechaun",
    id: 1536,
    lands_on: ["munzee", "shamrock"],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Retired Dragon",
    icon: "retireddragon",
    id: 1537,
    lands_on: ["munzee", "firemystery"],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Retired Yeti",
    icon: "retiredyeti",
    id: 1538,
    lands_on: ["munzee", "icemystery"],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Retired Faun",
    icon: "retiredfaun",
    id: 1539,
    lands_on: ["munzee", "earthmystery"],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Retired Hydra",
    icon: "retiredhydra",
    id: 1540,
    lands_on: ["munzee", "watermystery"],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Retired Mermaid",
    icon: "retiredmermaid",
    id: 1541,
    lands_on: [
      "munzee",
      "watermystery",
      type => type.has_tag(TypeTags.TypeJewel) && type.state === TypeState.Physical,
    ],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Retired Pegasus",
    icon: "retiredpegasus",
    id: 1542,
    lands_on: [type => type.has_tag(TypeTags.TypeVirtual), "airmystery", "electricmystery"],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Retired Cyclops",
    icon: "retiredcyclops",
    id: 1543,
    lands_on: [type => type.has_tag(TypeTags.TypeJewel) && type.id !== 148],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Retired Fairy",
    icon: "retiredfairy",
    id: 2051,
    lands_on: ["munzee", "airmystery", "mystery"],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Retired Banshee",
    icon: "retiredbanshee",
    id: 2052,
    lands_on: [
      "munzee",
      "shamrock",
      "airmystery",
      type => type.has_tag(TypeTags.VirtualColourBlack),
      type => type.has_tag(TypeTags.VirtualColourGreen),
    ],
    tags: [TypeTags.BouncerMyth, TypeTags.BouncerRetired],
  },
  {
    name: "Zombie Tuli",
    icon: "zombietuli",
    id: 2053,
    lands_on: ["munzee", "firemystery"],
    pouch: true,
    duration: 6,
    tags: [TypeTags.BouncerPC, TypeTags.BouncerPCZombie, TypeTags.BouncerRetired],
  },
  {
    name: "Zombie Vesi",
    icon: "zombievesi",
    id: 2054,
    lands_on: ["munzee", "watermystery"],
    pouch: true,
    duration: 6,
    tags: [TypeTags.BouncerPC, TypeTags.BouncerPCZombie, TypeTags.BouncerRetired],
  },
  {
    name: "Zombie Muru",
    icon: "zombiemuru",
    id: 2055,
    lands_on: ["munzee", "earthmystery"],
    pouch: true,
    duration: 6,
    tags: [TypeTags.BouncerPC, TypeTags.BouncerPCZombie, TypeTags.BouncerRetired],
  },
] as {
  name: string;
  icon: string;
  id: TypeID;
  tags?: TypeTags[];
  lands_on: TypeID[];
  meta?: TypeMeta;
}[];
