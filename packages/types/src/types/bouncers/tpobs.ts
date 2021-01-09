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
      (type) =>
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
      (type) =>
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
  {
    name: "GingerMech Man",
    icon: "gingermechman",
    id: "null_gingermechman",
    lands_on: [],
    category: "christmas_2020",
  },
  {
    name: "GingerSnapped Man",
    icon: "gingersnappedman",
    id: "null_gingersnappedman",
    lands_on: [],
    category: "christmas_2020",
  },
  {
    name: "ReinDroid",
    icon: "reindroid",
    id: "null_reindroid",
    lands_on: [],
    category: "christmas_2020",
  },
  {
    name: "Fleeting ReinDroid",
    icon: "fleetingreindroid",
    id: "null_fleetingreindroid",
    lands_on: [],
    category: "christmas_2020",
  },
  {
    name: "RUD01PH",
    icon: "rud01ph",
    id: "null_rud01ph",
    lands_on: [],
    category: "christmas_2020",
  },
  {
    name: "Fleeting RUD01PH",
    icon: "fleetingrud01ph",
    id: "null_fleetingrud01ph",
    lands_on: [],
    category: "christmas_2020",
  },
  {
    name: "31F",
    icon: "31f",
    id: "null_31f",
    lands_on: [],
    category: "christmas_2020",
  },
  {
    name: "KrampBot",
    icon: "krampbot",
    id: "null_krampbot",
    lands_on: [],
    category: "christmas_2020",
  },
  {
    name: "Fr057y",
    icon: "fr057y",
    id: "null_fr057y",
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
