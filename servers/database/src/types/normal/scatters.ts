import {
  TypePoints,
  TypeHidden,
  TypeMeta,
  TypeState,
  TypeTags,
} from "@cuppazee/db";

const scatters: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  scatter: {
    duration: number;
    standalone?: boolean;
    lands_on?: string[];
  };
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  meta?: TypeMeta;
  points?: TypePoints;
}[] = [
  {
    name: "Scattered",
    icons: ["scattered"],
    id: "scattered",
    munzee_id: 501,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Fire",
    icons: ["fire"],
    id: "fire",
    munzee_id: 560,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Frozen Greenie",
    icons: ["frozengreenie"],
    id: "frozengreenie",
    munzee_id: 697,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Water Droplet",
    icons: ["waterdroplet"],
    id: "waterdroplet",
    munzee_id: 1021,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Feather",
    icons: ["feather"],
    id: "feather",
    munzee_id: 1087,
    state: TypeState.Virtual,
    scatter: {
      standalone: true,
      duration: 2,
    },
    tags: [TypeTags.TypeMysteryElemental],
    meta: {
      scatterer_types: [1088],
      scatterer_min: 0,
      scatterer_max: 3,
      scatterer_radius: undefined,
    },
  },
  {
    name: "Golden Feather",
    icons: ["goldenfeather"],
    id: "goldenfeather",
    munzee_id: 1088,
    state: TypeState.Virtual,
    scatter: {
      standalone: true,
      duration: 2,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Dossier",
    icons: ["dossier"],
    id: "dossier",
    munzee_id: 1247,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
  },
  {
    name: "Boulder",
    icons: ["boulder"],
    id: "boulder",
    munzee_id: 1255,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
  },
  {
    name: "Infrared Virtual",
    icons: ["infraredvirtual"],
    id: "infraredvirtual",
    munzee_id: 1360,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "1st Roll",
    icons: ["1stroll"],
    id: "1stroll",
    munzee_id: 1644,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "2nd Roll",
    icons: ["2ndroll"],
    id: "2ndroll",
    munzee_id: 1645,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Runzee Rob",
    icons: ["runzeerob"],
    id: "runzeerob",
    munzee_id: 2003,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Gold Coin",
    icons: ["goldcoin"],
    id: "goldcoin",
    munzee_id: 2004,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Leap Frog",
    icons: ["leapfrog"],
    id: "leapfrog",
    munzee_id: 2005,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Fly",
    icons: ["fly"],
    id: "fly",
    munzee_id: 2006,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Munch-Man",
    icons: ["munch-man"],
    id: "munch-man",
    munzee_id: 2007,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Ghostzee",
    icons: ["ghostzee"],
    id: "ghostzee",
    munzee_id: 2008,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Bowling - 1st Roll",
    icons: ["bowling-1stroll"],
    id: "bowling-1stroll",
    munzee_id: 2244,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Bowling - 2nd Roll",
    icons: ["bowling-2ndroll"],
    id: "bowling-2ndroll",
    munzee_id: 2245,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Tree",
    icons: ["tree"],
    id: "tree",
    munzee_id: 2403,
    state: TypeState.Physical,
    scatter: {
      duration: 1,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Red Apple",
    icons: ["redapple"],
    id: "redapple",
    munzee_id: 2404,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Cherry Blossom",
    icons: ["cherryblossom"],
    id: "cherryblossom",
    munzee_id: 2405,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Charge",
    icons: ["charge"],
    id: "charge",
    munzee_id: 2392,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      lands_on: [":virtual"],
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Flaming Arrow",
    icons: ["flamingarrow"],
    id: "flamingarrow",
    munzee_id: 2503,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeWeaponClan],
  },
  {
    name: "Trident",
    icons: ["trident"],
    id: "trident",
    munzee_id: 2527,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Lifebuoy",
    icons: ["lifebuoy"],
    id: "lifebuoy",
    munzee_id: 2528,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Peach",
    icons: ["peach"],
    id: "peach",
    munzee_id: 2530,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Pear",
    icons: ["pear"],
    id: "pear",
    munzee_id: 2531,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Glasses",
    icons: ["glasses"],
    id: "glasses",
    munzee_id: 2579,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Shell-Phone",
    icons: ["shell-phone"],
    id: "shell-phone",
    munzee_id: 2580,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Pecan",
    icons: ["pecan"],
    id: "pecan",
    munzee_id: 2603,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Acorn",
    icons: ["acorn"],
    id: "acorn",
    munzee_id: 2604,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Laser Trail 1",
    icons: ["lasertrail1"],
    id: "lasertrail1",
    munzee_id: 2608,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Laser Trail 2",
    icons: ["lasertrail2"],
    id: "lasertrail2",
    munzee_id: 2609,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Laser Trail 3",
    icons: ["lasertrail3"],
    id: "lasertrail3",
    munzee_id: 2610,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Ankh Artifact",
    icons: ["ankhartifact"],
    id: "ankhartifact",
    munzee_id: 2763,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Ouroboros Artifact",
    icons: ["ouroborosartifact"],
    id: "ouroborosartifact",
    munzee_id: 2764,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Djed Artifact",
    icons: ["djedartifact"],
    id: "djedartifact",
    munzee_id: 2765,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Undercover Agent",
    icons: ["undercoveragent"],
    id: "undercoveragent",
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Liaison Agent",
    icons: ["liaisonagent"],
    id: "liaisonagent",
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Dead Branch",
    icons: ["deadbranch"],
    id: "deadbranch",
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Cardinal Feather",
    icons: ["cardinalfeather"],
    id: "cardinalfeather",
    munzee_id: 2849,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "SCGS Reseller Package",
    icons: ["scgsresellerpackage"],
    id: "scgsresellerpackage",
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeReseller],
  },
  {
    name: "Gold'n Coins Reseller Package",
    icons: ["gold'ncoinsresellerpackage"],
    id: "gold'ncoinsresellerpackage",
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeReseller],
  },
  {
    name: "NEGS Reseller Package",
    icons: ["negsresellerpackage"],
    id: "negsresellerpackage",
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeReseller],
  },
  {
    name: "GeoLoggers Reseller Package",
    icons: ["geologgersresellerpackage"],
    id: "geologgersresellerpackage",
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeReseller],
  },
  {
    name: "Clover Leaf",
    icons: ["cloverleaf"],
    id: "cloverleaf",
    state: TypeState.Virtual,
    scatter: {
      standalone: true,
      duration: 2,
    },
  },
  {
    name: "Golden Four Leaf Clover",
    icons: ["goldenfourleafclover"],
    id: "goldenfourleafclover",
    state: TypeState.Virtual,
    scatter: {
      standalone: true,
      duration: 2,
    },
  },
  {
    name: "Scarab Artifact",
    icons: ["scarabartifact"],
    id: "scarabartifact",
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Eye of Ra Artifact",
    icons: ["eyeofraartifact"],
    id: "eyeofraartifact",
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Shen Artifact",
    icons: ["shenartifact"],
    id: "shenartifact",
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Bident",
    icons: ["bident"],
    id: "bident",
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Firestarter",
    icons: ["firestarter"],
    id: "firestarter",
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
];

export default scatters;
