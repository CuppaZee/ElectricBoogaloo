import { TypeMeta, TypeQuery, TypeState, TypeTags } from "@cuppazee/db";

const myths: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  type: "original" | "classical" | "mirror" | "modern";
  tags?: TypeTags[];
  lands_on: TypeQuery[];
  meta?: TypeMeta;
}[] = [
  {
    name: "The Unicorn",
    icons: ["theunicorn"],
    id: "theunicorn",
    munzee_id: 505,
    type: "original",
    lands_on: ["treehouse", "munzee", "shamrock"],
  },
  {
    name: "Leprechaun",
    icons: ["leprechaun"],
    id: "leprechaun",
    munzee_id: 508,
    type: "original",
    lands_on: ["treehouse", "munzee", "shamrock"],
  },
  {
    name: "Dragon",
    icons: ["dragon"],
    id: "dragon",
    munzee_id: 573,
    type: "original",
    lands_on: ["treehouse", "munzee", "firemystery"],
  },
  {
    name: "Yeti",
    icons: ["yeti"],
    id: "yeti",
    munzee_id: 725,
    type: "original",
    lands_on: ["treehouse", "munzee", "icemystery"],
  },
  {
    name: "Faun",
    icons: ["faun"],
    id: "faun",
    munzee_id: 853,
    type: "classical",
    lands_on: ["treehouse", "munzee", "earthmystery"],
  },
  {
    name: "Hydra",
    icons: ["hydra"],
    id: "hydra",
    munzee_id: 953,
    type: "classical",
    lands_on: ["treehouse", "munzee", "watermystery"],
  },
  {
    name: "Pegasus",
    icons: ["pegasus"],
    id: "pegasus",
    munzee_id: 1100,
    type: "classical",
    lands_on: [
      "skyland",
      type => type.has_tag(TypeTags.TypeVirtual),
      "airmystery",
      "electricmystery",
    ],
  },
  {
    name: "Cyclops",
    icons: ["cyclops"],
    id: "cyclops",
    munzee_id: 1168,
    type: "classical",
    lands_on: ["skyland", "treehouse", type => type.has_tag(TypeTags.TypeJewel) && type.munzee_id !== 148],
  },
  {
    name: "Mermaid",
    icons: ["mermaid"],
    id: "mermaid",
    munzee_id: 1378,
    type: "mirror",
    lands_on: [
      "treehouse",
      "munzee",
      "watermystery",
      type => type.has_tag(TypeTags.TypeJewel) && type.state === TypeState.Physical,
    ],
  },
  {
    name: "Fairy",
    icons: ["fairy"],
    id: "fairy",
    munzee_id: 1544,
    type: "mirror",
    lands_on: ["skyland", "treehouse", "munzee", "airmystery", "mystery"],
  },
  {
    name: "Dryad Fairy",
    icons: ["dryadfairy"],
    id: "dryadfairy",
    munzee_id: 1602,
    type: "mirror",
    lands_on: ["skyland", "treehouse", "munzee", "airmystery", "earthmystery"],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Wildfire Fairy",
    icons: ["wildfirefairy"],
    id: "wildfirefairy",
    munzee_id: 1603,
    type: "mirror",
    lands_on: ["skyland", "treehouse", "munzee", "airmystery", "firemystery"],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Battle Unicorn",
    icons: ["battleunicorn"],
    id: "battleunicorn",
    munzee_id: 1604,
    type: "original",
    lands_on: ["treehouse", "munzee", "mace", "longsword", "battleaxe", "thehammer"],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Hippocamp Unicorn",
    icons: ["hippocampunicorn"],
    id: "hippocampunicorn",
    munzee_id: 1605,
    type: "original",
    lands_on: ["treehouse", "munzee", "watermystery", "icemystery"],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Dwarf Leprechaun",
    icons: ["dwarfleprechaun"],
    id: "dwarfleprechaun",
    munzee_id: 1646,
    type: "original",
    lands_on: ["skyland", "treehouse", "munzee", type => type.has_tag(TypeTags.TypeWeaponClan)],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Goblin Leprechaun",
    icons: ["goblinleprechaun"],
    id: "goblinleprechaun",
    munzee_id: 1647,
    type: "original",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      type => type.has_tag(TypeTags.TypeJewel) && type.munzee_id !== 148,
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Hot Spring Mermaid",
    icons: ["hotspringmermaid"],
    id: "hotspringmermaid",
    munzee_id: 1648,
    type: "mirror",
    lands_on: ["treehouse", "munzee", "watermystery", "firemystery"],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Melusine Mermaid",
    icons: ["melusinemermaid"],
    id: "melusinemermaid",
    munzee_id: 1649,
    type: "mirror",
    lands_on: ["skyland", "treehouse", "munzee", "watermystery", "airmystery"],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Banshee",
    icons: ["banshee"],
    id: "banshee",
    munzee_id: 1827,
    type: "mirror",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "shamrock",
      "airmystery",
      type => type.has_tag(TypeTags.VirtualColourBlack),
      type => type.has_tag(TypeTags.VirtualColourGreen),
    ],
  },
  {
    name: "Chinese Dragon",
    icons: ["chinesedragon"],
    id: "chinesedragon",
    munzee_id: 1874,
    type: "original",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "firemystery",
      "airmystery",
      type => type.has_tag(TypeTags.TypeZodiacChinese),
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Wyvern Dragon",
    icons: ["wyverndragon"],
    id: "wyverndragon",
    munzee_id: 1875,
    type: "original",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "airmystery",
      "virtual_amethyst",
      type => type.meta.evolution_base === "coin",
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Lycanthrope Yeti",
    icons: ["lycanthropeyeti"],
    id: "lycanthropeyeti",
    munzee_id: 1876,
    type: "original",
    lands_on: [
      "treehouse",
      "munzee",
      "earthmystery",
      "firemystery",
      type => type.has_tag(TypeTags.TypeZodiacWestern),
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Reptoid Yeti",
    icons: ["reptoidyeti"],
    id: "reptoidyeti",
    munzee_id: 1877,
    type: "original",
    lands_on: ["treehouse", "munzee", "earthmystery", "watermystery"],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Griffin Pegasus",
    icons: ["griffinpegasus"],
    id: "griffinpegasus",
    munzee_id: 1995,
    type: "classical",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      type => type.has_tag(TypeTags.TypeJewel),
      "airmystery",
      type => type.meta.evolution_base == "lioncub",
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Alicorn Pegasus",
    icons: ["alicornpegasus"],
    id: "alicornpegasus",
    munzee_id: 1996,
    type: "classical",
    lands_on: [
      "skyland",
      "treehouse",
      type => type.has_tag(TypeTags.TypeVirtual),
      "airmystery",
      "shamrock",
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Centaur Faun",
    icons: ["centaurfaun"],
    id: "centaurfaun",
    munzee_id: 1997,
    type: "classical",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "earthmystery",
      type => type.has_tag(TypeTags.TypeWeaponClan),
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Krampus Faun",
    icons: ["krampusfaun"],
    id: "krampusfaun",
    munzee_id: 1998,
    type: "classical",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "earthmystery",
      "icemystery",
      type => type.meta.evolution_base === "farmer",
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Nymph",
    icons: ["nymph"],
    id: "nymph",
    munzee_id: 2118,
    type: "mirror",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "earthmystery",
      type => type.has_tag(TypeTags.VirtualColourBrown),
      type => type.has_tag(TypeTags.VirtualColourBlack),
      type => type.has_tag(TypeTags.VirtualColourGreen),
    ],
  },
  {
    name: "Cerberus Hydra",
    icons: ["cerberushydra"],
    id: "cerberushydra",
    munzee_id: 2252,
    type: "classical",
    lands_on: ["treehouse", "munzee", "watermystery", "firemystery"],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Cthulhu Hydra",
    icons: ["cthulhuhydra"],
    id: "cthulhuhydra",
    munzee_id: 2253,
    type: "classical",
    lands_on: ["skyland", "treehouse", "munzee", "watermystery", "airmystery"],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Harpy Banshee",
    icons: ["harpybanshee"],
    id: "harpybanshee",
    munzee_id: 2254,
    type: "mirror",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "shamrock",
      "airmystery",
      type => type.has_tag(TypeTags.TypeJewel),
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Witch Banshee",
    icons: ["witchbanshee"],
    id: "witchbanshee",
    munzee_id: 2255,
    type: "mirror",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "airmystery",
      "firemystery",
      type =>
        [
          "tomatoseed",
          "cornseed",
          "goldencarrotseed",
          "carrotseed",
          "peasseed",
          "farmer",
          "tulipseed",
          "roseseed",
          "lilyseed",
          "carnationseed",
        ].includes(type.meta.evolution_base || ""),
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Minotaur Cyclops",
    icons: ["minotaurcyclops"],
    id: "minotaurcyclops",
    munzee_id: 2477,
    type: "classical",
    lands_on: [
      "treehouse",
      "munzee",
      type => type.has_tag(TypeTags.TypeJewel),
      type => type.has_tag(TypeTags.TypeWeaponClan),
      "rockpaperscissors",
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Balor Cyclops",
    icons: ["balorcyclops"],
    id: "balorcyclops",
    munzee_id: 2478,
    type: "classical",
    lands_on: ["treehouse", "munzee", "shamrock", "electricmystery"],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Vampire Nymph",
    icons: ["vampirenymph"],
    id: "vampirenymph",
    munzee_id: 2479,
    type: "mirror",
    lands_on: [
      "treehouse",
      "skyland",
      "munzee",
      "earthmystery",
      type => type.has_tag(TypeTags.VirtualColourRed),
      type => type.has_tag(TypeTags.VirtualColourGreen),
      "tomato",
      type => type.meta.evolution_base === "farmer",
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Elf Nymph",
    icons: ["elfnymph"],
    id: "elfnymph",
    munzee_id: 2480,
    type: "mirror",
    lands_on: [
      "treehouse",
      "munzee",
      "earthmystery",
      type => type.has_tag(TypeTags.TypeWeaponClan),
      type => type.has_tag(TypeTags.VirtualColourGreen),
      "virtual",
    ],
    tags: [TypeTags.BouncerMythVariant],
  },
  {
    name: "Poseidon",
    icons: ["poseidon"],
    id: "poseidon",
    munzee_id: 2524,
    type: "modern",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "watermystery",
      type => type.has_tag(TypeTags.VirtualColourBlue),
      "aquamarine",
    ],
    meta: {
      scatterer_radius: 1000,
      scatterer_types: [2527, 2528],
      scatterer_min: 3,
      scatterer_max: 3,
    },
  },
  {
    name: "Aphrodite",
    icons: ["aphrodite"],
    id: "aphrodite",
    munzee_id: 2576,
    type: "modern",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "airmystery",
      type => type.has_tag(TypeTags.VirtualColourPink),
      "pinkdiamond",
    ],
    meta: {
      scatterer_radius: 1000,
      scatterer_types: [2579, 2580],
      scatterer_min: 3,
      scatterer_max: 3,
    },
  },
  {
    name: "Hades",
    icons: ["hades"],
    id: "hades",
    type: "modern",
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "firemystery",
      "virtualtimberwolf",
      "virtualsilver",
      "virtualgray",
      "virtualblack",
      "virtualblueviolet",
      "virtualblue",
      "virtualcadetblue",
      "virtualbluegreen",
      "virtualpacificblue",
      "virtualcerulean",
      "virtualindigo",
      "virtualcitrine"
    ],
    meta: {
      scatterer_radius: 1000,
      scatterer_types: ["null_bident", "null_firestarter"],
      scatterer_min: 3,
      scatterer_max: 3,
    },
  },
];

export default myths;
