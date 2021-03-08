import {
  PointsInterface,
  PointsType,
  TypeHidden,
  TypeID,
  TypeMeta,
  TypeState,
  TypeTags,
} from "../../munzee";

const scatters: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  scatter: {
    duration: number;
    standalone?: boolean;
    lands_on?: string[];
  };
  alt_icons?: string[];
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  meta?: TypeMeta;
  points?: PointsInterface;
}[] = [
  {
    name: "Scattered",
    icon: "scattered",
    id: 501,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Fire",
    icon: "fire",
    id: 560,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Frozen Greenie",
    icon: "frozengreenie",
    id: 697,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Water Droplet",
    icon: "waterdroplet",
    id: 1021,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Feather",
    icon: "feather",
    id: 1087,
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
    icon: "goldenfeather",
    id: 1088,
    state: TypeState.Virtual,
    scatter: {
      standalone: true,
      duration: 2,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Dossier",
    icon: "dossier",
    id: 1247,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
  },
  {
    name: "Boulder",
    icon: "boulder",
    id: 1255,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
  },
  {
    name: "Infrared Virtual",
    icon: "infraredvirtual",
    id: 1360,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "1st Roll",
    icon: "1stroll",
    id: 1644,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "2nd Roll",
    icon: "2ndroll",
    id: 1645,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Runzee Rob",
    icon: "runzeerob",
    id: 2003,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Gold Coin",
    icon: "goldcoin",
    id: 2004,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Leap Frog",
    icon: "leapfrog",
    id: 2005,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Fly",
    icon: "fly",
    id: 2006,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Munch-Man",
    icon: "munch-man",
    id: 2007,
    state: TypeState.Physical,
    scatter: {
      duration: 2,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Ghostzee",
    icon: "ghostzee",
    id: 2008,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Bowling - 1st Roll",
    icon: "bowling-1stroll",
    id: 2244,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Bowling - 2nd Roll",
    icon: "bowling-2ndroll",
    id: 2245,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeGaming],
  },
  {
    name: "Tree",
    icon: "tree",
    id: 2403,
    state: TypeState.Physical,
    scatter: {
      duration: 1,
      lands_on: ["munzee"],
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Red Apple",
    icon: "redapple",
    id: 2404,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Cherry Blossom",
    icon: "cherryblossom",
    id: 2405,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Charge",
    icon: "charge",
    id: 2392,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      lands_on: [":virtual"],
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Flaming Arrow",
    icon: "flamingarrow",
    id: 2503,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
    tags: [TypeTags.TypeWeaponClan],
  },
  {
    name: "Trident",
    icon: "trident",
    id: 2527,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Lifebuoy",
    icon: "lifebuoy",
    id: 2528,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Peach",
    icon: "peach",
    id: 2530,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Pear",
    icon: "pear",
    id: 2531,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Glasses",
    icon: "glasses",
    id: 2579,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Shell-Phone",
    icon: "shell-phone",
    id: 2580,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Pecan",
    icon: "pecan",
    id: 2603,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Acorn",
    icon: "acorn",
    id: 2604,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Laser Trail 1",
    icon: "lasertrail1",
    id: 2608,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Laser Trail 2",
    icon: "lasertrail2",
    id: 2609,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Laser Trail 3",
    icon: "lasertrail3",
    id: 2610,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Ankh Artifact",
    icon: "ankhartifact",
    id: 2763,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Ouroboros Artifact",
    icon: "ouroborosartifact",
    id: 2764,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Djed Artifact",
    icon: "djedartifact",
    id: 2765,
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Undercover Agent",
    icon: "undercoveragent",
    id: "null_undercoveragent",
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Liaison Agent",
    icon: "liaisonagent",
    id: "null_liaisonagent",
    state: TypeState.Virtual,
    scatter: {
      duration: 2,
      standalone: true,
    },
  },
  {
    name: "Dead Branch",
    icon: "deadbranch",
    id: "null_deadbranch",
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "Cardinal Feather",
    icon: "cardinalfeather",
    id: 2849,
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeMysteryElemental],
  },
  {
    name: "SCGS Reseller Package",
    icon: "scgsresellerpackage",
    id: "null_scgsresellerpackage",
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeReseller],
  },
  {
    name: "Gold'n Coins Reseller Package",
    icon: "gold'ncoinsresellerpackage",
    id: "null_gold'ncoinsresellerpackage",
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeReseller],
  },
  {
    name: "NEGS Reseller Package",
    icon: "negsresellerpackage",
    id: "null_negsresellerpackage",
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeReseller],
  },
  {
    name: "GeoLoggers Reseller Package",
    icon: "geologgersresellerpackage",
    id: "null_geologgersresellerpackage",
    state: TypeState.Virtual,
    scatter: {
      duration: 1,
      standalone: true,
    },
    tags: [TypeTags.TypeReseller],
  },
];

export default scatters;
