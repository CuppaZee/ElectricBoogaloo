import {
  PointsInterface,
  TypeHidden,
  TypeID,
  TypeMeta,
  TypeState,
  TypeTags,
} from "../../munzee";
import pouchhosts from "../hosts/pouch";

const points: {
  [key: string]: PointsInterface;
} = {
  bouncer_pc_1: {
    capture: 200,
    deploy: 250,
    capon: 100,
  },
  bouncer_pc_2: {
    capture: 300,
    capon: 200,
  },
  bouncer_pc_3: {
    capture: 500,
    capon: 300,
  },
  bouncer_gpc_1: {
    capture: 400,
    deploy: 500,
    capon: 200,
  },
  bouncer_gpc_2: {
    capture: 600,
    capon: 400,
  },
  bouncer_gpc_3: {
    capture: 1000,
    capon: 600,
  },
  gen_megu: {
    capture: 400,
    capon: 100,
  },
  funfinity: {
    deploy: 250,
    capture: 200,
    capon: 250,
  },
};

const pouch: {
  name: string;
  icon: string;
  id: TypeID;
  stage?: number;
  set: "season_1" | "season_2" | "funfinity";
  points?: PointsInterface;
  tags?: TypeTags[];
  lands_on: TypeID[];
  hidden?: TypeHidden[];
  meta?: TypeMeta;
  base?: string;
}[] = [
  {
    name: "Tuli",
    icon: "tuli",
    id: 1240,
    base: "tuli",
    stage: 1,
    lands_on: ["treehouse", "munzee", "firemystery"],
    set: "season_1",
    points: points.bouncer_pc_1,
  },
  {
    name: "Tulimber",
    icon: "tulimber",
    id: 1241,
    base: "tuli",
    stage: 2,
    lands_on: ["munzee", "firemystery"],
    set: "season_1",
    points: points.bouncer_pc_2,
  },
  {
    name: "Tuliferno",
    icon: "tuliferno",
    id: 1242,
    base: "tuli",
    stage: 3,
    lands_on: ["munzee", "firemystery"],
    set: "season_1",
    points: points.bouncer_pc_3,
  },
  {
    name: "Vesi",
    icon: "vesi",
    id: 1370,
    base: "vesi",
    stage: 1,
    lands_on: ["treehouse", "munzee", "watermystery"],
    set: "season_1",
    points: points.bouncer_pc_1,
  },
  {
    name: "Vesial",
    icon: "vesial",
    id: 1371,
    base: "vesi",
    stage: 2,
    lands_on: ["munzee", "watermystery"],
    set: "season_1",
    points: points.bouncer_pc_2,
  },
  {
    name: "Vesisaur",
    icon: "vesisaur",
    id: 1372,
    base: "vesi",
    stage: 3,
    lands_on: ["munzee", "watermystery"],
    set: "season_1",
    points: points.bouncer_pc_3,
  },
  {
    name: "Muru",
    icon: "muru",
    id: 1638,
    base: "muru",
    stage: 1,
    lands_on: ["treehouse", "munzee", "earthmystery"],
    set: "season_1",
    points: points.bouncer_pc_1,
  },
  {
    name: "Muruchi",
    icon: "muruchi",
    id: 1639,
    base: "muru",
    stage: 2,
    lands_on: ["munzee", "earthmystery"],
    set: "season_1",
    points: points.bouncer_pc_2,
  },
  {
    name: "Murutain",
    icon: "murutain",
    id: 1640,
    base: "muru",
    stage: 3,
    lands_on: ["munzee", "earthmystery"],
    set: "season_1",
    points: points.bouncer_pc_3,
  },
  {
    name: "Mitmegu",
    icon: "mitmegu",
    id: 1752,
    base: "mitmegu",
    lands_on: [
      "treehouse",
      "munzee",
      "shamrock",
      "scatter",
      "premium",
      "rockpaperscissors",
      "watermystery",
      "earthmystery",
      "firemystery",
    ],
    set: "season_1",
    points: {
      capture: 200,
      deploy: 250,
      capon: 100,
    },
  },
  {
    name: "Jootmegu",
    icon: "jootmegu",
    id: 1753,
    base: "mitmegu",
    lands_on: ["watermystery"],
    set: "season_1",
    points: points.gen_megu,
  },
  {
    name: "Rohimegu",
    icon: "rohimegu",
    id: 1754,
    base: "mitmegu",
    lands_on: ["earthmystery"],
    set: "season_1",
    points: points.gen_megu,
  },
  {
    name: "Lokemegu",
    icon: "lokemegu",
    id: 1755,
    base: "mitmegu",
    lands_on: ["firemystery"],
    set: "season_1",
    points: points.gen_megu,
  },
  {
    name: "Gleaming Muru",
    icon: "gleamingmuru",
    id: 1850,
    base: "muru",
    tags: [TypeTags.BouncerPCGleaming],
    hidden: [TypeHidden.Bouncers, TypeHidden.Deploy],
    stage: 1,
    lands_on: ["treehouse", "munzee", "earthmystery"],
    set: "season_1",
    points: points.bouncer_gpc_1,
  },
  {
    name: "Gleaming Muruchi",
    icon: "gleamingmuruchi",
    id: 1851,
    base: "muru",
    tags: [TypeTags.BouncerPCGleaming],
    hidden: [TypeHidden.Bouncers, TypeHidden.Deploy],
    stage: 2,
    lands_on: ["munzee", "earthmystery"],
    set: "season_1",
    points: points.bouncer_gpc_2,
  },
  {
    name: "Gleaming Murutain",
    icon: "gleamingmurutain",
    id: 1852,
    base: "muru",
    tags: [TypeTags.BouncerPCGleaming],
    hidden: [TypeHidden.Bouncers, TypeHidden.Deploy],
    stage: 3,
    lands_on: ["munzee", "earthmystery"],
    set: "season_1",
    points: points.bouncer_gpc_3,
  },
  {
    name: "Gleaming Tuli",
    icon: "gleamingtuli",
    id: 1853,
    base: "tuli",
    tags: [TypeTags.BouncerPCGleaming],
    hidden: [TypeHidden.Bouncers, TypeHidden.Deploy],
    stage: 1,
    lands_on: ["treehouse", "munzee", "firemystery"],
    set: "season_1",
    points: points.bouncer_gpc_1,
  },
  {
    name: "Gleaming Tulimber",
    icon: "gleamingtulimber",
    id: 1854,
    base: "tuli",
    tags: [TypeTags.BouncerPCGleaming],
    hidden: [TypeHidden.Bouncers, TypeHidden.Deploy],
    stage: 2,
    lands_on: ["munzee", "firemystery"],
    set: "season_1",
    points: points.bouncer_gpc_2,
  },
  {
    name: "Gleaming Tuliferno",
    icon: "gleamingtuliferno",
    id: 1855,
    base: "tuli",
    tags: [TypeTags.BouncerPCGleaming],
    hidden: [TypeHidden.Bouncers, TypeHidden.Deploy],
    stage: 3,
    lands_on: ["munzee", "firemystery"],
    set: "season_1",
    points: points.bouncer_gpc_3,
  },
  {
    name: "Gleaming Vesi",
    icon: "gleamingvesi",
    id: 1856,
    base: "vesi",
    tags: [TypeTags.BouncerPCGleaming],
    hidden: [TypeHidden.Bouncers, TypeHidden.Deploy],
    stage: 1,
    lands_on: ["treehouse", "munzee", "watermystery"],
    set: "season_1",
    points: points.bouncer_gpc_1,
  },
  {
    name: "Gleaming Vesial",
    icon: "gleamingvesial",
    id: 1857,
    base: "vesi",
    tags: [TypeTags.BouncerPCGleaming],
    hidden: [TypeHidden.Bouncers, TypeHidden.Deploy],
    stage: 2,
    lands_on: ["munzee", "watermystery"],
    set: "season_1",
    points: points.bouncer_gpc_2,
  },
  {
    name: "Gleaming Vesisaur",
    icon: "gleamingvesisaur",
    id: 1858,
    base: "vesi",
    tags: [TypeTags.BouncerPCGleaming],
    hidden: [TypeHidden.Bouncers, TypeHidden.Deploy],
    stage: 3,
    lands_on: ["munzee", "watermystery"],
    set: "season_1",
    points: points.bouncer_gpc_3,
  },
  {
    name: "Pimedus",
    icon: "pimedus",
    id: 1919,
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      ":reseller",
      type => type.has_tag(TypeTags.TypeZodiacChinese),
      "virtual_sapphire",
      "briefcase",
      "thehammer",
      "crossbow",
      "catapult",
    ],
    set: "season_1",
  },
  {
    name: "Puffle",
    icon: "puffle",
    id: 2240,
    base: "puffle",
    stage: 1,
    lands_on: ["skyland", type => type.has_tag(TypeTags.TypeVirtual), "airmystery"],
    set: "season_2",
    points: points.bouncer_pc_1,
  },
  {
    name: "Pufrain",
    icon: "pufrain",
    id: 2241,
    base: "puffle",
    stage: 2,
    lands_on: [type => type.has_tag(TypeTags.TypeVirtual), "airmystery"],
    set: "season_2",
    points: points.bouncer_pc_2,
  },
  {
    name: "Puflawn",
    icon: "puflawn",
    id: 2242,
    base: "puffle",
    stage: 3,
    lands_on: [type => type.has_tag(TypeTags.TypeVirtual), "airmystery"],
    set: "season_2",
    points: points.bouncer_pc_3,
  },
  {
    name: "Magnetus",
    icon: "magnetus",
    id: 2306,
    lands_on: [
      "skyland",
      "treehouse",
      "munzee",
      "airmystery",
      type => type.has_tag(TypeTags.VirtualColourBlue),
      type => type.has_tag(TypeTags.VirtualColourRed),
      "watermystery",
      "joystickvirtual",
      "joystick",
      "virtual_yellow",
      "virtual_goldenrod",
      "virtual_dandelion",
    ],
    set: "season_2",
  },
  {
    name: "Topaas",
    icon: "topaas",
    id: 2366,
    lands_on: ["treehouse", "munzee", "earthmystery", "topaz", "treehouse"],
    set: "funfinity",
    points: points.funfinity,
  },
  {
    name: "Ametust",
    icon: "ametust",
    id: 2367,
    lands_on: [
      "skyland",
      type => type.has_tag(TypeTags.TypeVirtual),
      "earthmystery",
      "virtual_amethyst",
      "treehouse",
    ],
    set: "funfinity",
    points: points.funfinity,
  },
  {
    name: "Oniks",
    icon: "oniks",
    id: 2368,
    lands_on: [
      "skyland",
      type => type.has_tag(TypeTags.TypeVirtual),
      "earthmystery",
      "virtual_onyx",
      "treehouse",
    ],
    set: "funfinity",
    points: points.funfinity,
  },
  {
    name: "Elekter",
    icon: "elekter",
    id: 2407,
    base: "elekter",
    stage: 1,
    lands_on: ["skyland", type => type.has_tag(TypeTags.TypeVirtual), "electricmystery"],
    set: "season_2",
    points: points.ouncer_pc_1,
  },
  {
    name: "Elekjoud",
    icon: "elekjoud",
    id: 2408,
    base: "elekter",
    stage: 2,
    lands_on: [type => type.has_tag(TypeTags.TypeVirtual), "electricmystery"],
    set: "season_2",
    points: points.ouncer_pc_2,
  },
  {
    name: "Elektrivool",
    icon: "elektrivool",
    id: 2409,
    base: "elekter",
    stage: 3,
    lands_on: [type => type.has_tag(TypeTags.TypeVirtual), "electricmystery"],
    set: "season_2",
    points: points.ouncer_pc_3,
  },
  {
    name: "Teemant",
    icon: "teemant",
    id: 2369,
    lands_on: ["treehouse", "munzee", "earthmystery", "diamond"],
    set: "funfinity",
    points: points.funfinity,
  },
  {
    name: "Smaragd",
    icon: "smaragd",
    id: 2370,
    lands_on: [
      "skyland",
      type => type.has_tag(TypeTags.VirtualColourGreen),
      "airmystery",
      "virtual_emerald",
    ],
    set: "funfinity",
    points: points.funfinity,
  },
  {
    name: "Akvamariin",
    icon: "akvamariin",
    id: "null_akvamariin",
    lands_on: ["treehouse", "munzee", "earthmystery", "aquamarine"],
    set: "funfinity",
    points: points.funfinity,
  },
  {
    name: "Rubiin",
    icon: "rubiin",
    id: "null_rubiin",
    lands_on: ["treehouse", "munzee", "firemystery", "ruby"],
    set: "funfinity",
    points: points.funfinity,
  },
  {
    name: "Safiir",
    icon: "safiir",
    id: "null_safiir",
    lands_on: [
      "skyland",
      type => type.has_tag(TypeTags.TypeVirtual),
      "airmystery",
      "virtual_sapphire",
    ],
    set: "funfinity",
    points: points.funfinity,
  },
  {
    name: "Roosa",
    icon: "roosa",
    id: "null_roosa",
    lands_on: ["treehouse", "munzee", "firemystery", "pinkdiamond"],
    set: "funfinity",
    points: points.funfinity,
  },
  {
    name: "Tsitriin",
    icon: "tsitriin",
    id: "null_tsitriin",
    lands_on: [
      type => type.has_tag(TypeTags.TypeVirtual),
      "airmystery",
      "virtual_citrine",
      "skyland",
    ],
    set: "funfinity",
    points: points.funfinity,
  },
  ];

export default pouch;