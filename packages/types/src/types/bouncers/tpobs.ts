import { TypeID, TypeMeta, TypeTags } from "../../munzee";

export default [
  {
    name: "Hedgehog",
    icon: "hedgehog",
    id: 2427,
    lands_on: [
      "skyland",
      "treehouse",
      "earthmystery",
      "icemystery",
      "flatlou",
      type =>
        type.has_tag(TypeTags.TypeVirtual) &&
        ![
          "virtual",
          "virtual_black",
          "virtual_timberwolf",
          "virtual_gray",
          "virtual_silver",
        ].includes(type.icon),
    ],
    category: "baby_animal",
  },
  {
    name: "Polar Bear",
    icon: "polarbear",
    id: 2428,
    lands_on: [
      "skyland",
      "treehouse",
      "earthmystery",
      "icemystery",
      "flatlou",
      type =>
        type.has_tag(TypeTags.TypeVirtual) &&
        ![
          "virtual",
          "virtual_black",
          "virtual_timberwolf",
          "virtual_gray",
          "virtual_silver",
        ].includes(type.icon),
    ],
    category: "baby_animal",
  },
  {
    name: "Owlet",
    icon: "owlet",
    id: 2429,
    lands_on: [
      "skyland",
      "treehouse",
      "virtual",
      "airmystery",
      "electricmystery",
      "flathammock",
    ],
    category: "baby_animal",
  },
  {
    name: "Trojan Unicorn",
    icon: "trojanunicorn",
    id: "null_trojanunicorn",
    lands_on: [
      "mace",
      "longsword",
      "battleaxe",
      "thehammer",
      "crossbow",
      "catapult",
    ],
    category: "other",
  },
  {
    name: "Baby Fox",
    icon: "babyfox",
    id: 2561,
    lands_on: ["skyland", ":virtual", "airmystery", "poicampground"],
    alt_icons: ["undefined"],
    category: "camp_critter",
  },
  {
    name: "Baby Moose",
    icon: "babymoose",
    id: "null_babymoose",
    lands_on: ["treehouse", "munzee", "earthmystery", "watermystery"],
    category: "camp_critter",
  },
  {
    name: "Baby Squirrel",
    icon: "babysquirrel",
    id: "null_babysquirrel",
    lands_on: [
      "treehouse",
      "munzee",
      "earthmystery",
      "watermystery",
      "skyland",
      ":virtual",
      "airmystery",
      "poicampground",
    ],
    category: "camp_critter",
  },
  {
    name: "Bear Cub",
    icon: "bearcub",
    id: "null_bearcub",
    lands_on: [
      "treehouse",
      "munzee",
      "earthmystery",
      "watermystery",
      "skyland",
      ":virtual",
      "airmystery",
      "poicampground",
    ],
    category: "camp_critter",
  },
  {
    name: "Spyderbot",
    icon: "spyderbot",
    id: "null_spyderbot",
    lands_on: [],
    category: "other",
  },
  {
    name: "Baby Hippo",
    icon: "babyhippo",
    id: "null_babyhippo",
    lands_on: ["treehouse", "munzee", "watermystery"],
    category: "christmas_critter",
  },
  {
    name: "Baby Alpaca",
    icon: "babyalpaca",
    id: "null_babyalpaca",
    lands_on: ["skyland", ":virtual", "electricmystery"],
    category: "christmas_critter",
  },
  {
    name: "Baby Reindeer",
    icon: "babyreindeer",
    id: "null_babyreindeer",
    lands_on: ["treehouse", "munzee", "icemystery", "skyland", ":virtual"],
    category: "christmas_critter",
  },
  {
    name: "Cyborg Santa",
    icon: "cyborgsanta",
    id: "null_cyborgsanta",
    lands_on: [],
    category: "christmas_2020",
  },
  {
    name: "Cybersaurus Rex",
    icon: "cybersaurusrex",
    id: "null_cybersaurusrex",
    lands_on: [],
    category: "christmas_2020",
  },
] as {
  name: string;
  icon: string;
  id: TypeID;
  duration?: number;
  category: string;
  alt_icons: string[];
  tags?: TypeTags[];
  lands_on: TypeID[];
  meta?: TypeMeta;
}[];
