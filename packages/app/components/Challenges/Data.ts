import db, { Type, TypeState, TypeTags } from "@cuppazee/types";
import { UserActivityConverterOutput, UserActivityData, UserActivityItem } from "../Activity/Data";

export type ChallengeCategory = {
  name: string;
  icon: string;
  types: Type[];
};

export type ChallengeCategoryWithCompletion = {
  name: string;
  icon: string;
  types: Type[];
  completion: UserActivityItem[];
};

export type Challenge = {
  id: string;
  icon?: string;
  name: string;
  size?: "small" | "large";
  categories: ChallengeCategory[];
};

export type ChallengeWithCompletion = {
  id: string;
  icon?: string;
  name: string;
  size?: "small" | "large";
  categories: ChallengeCategoryWithCompletion[];
};

export const Challenges: Challenge[] = [
  {
    id: "shc_lite",
    name: "Special Hunter LITE",
    size: "large",
    categories: [
      {
        icon: "rainbowunicorn",
        name: "challenges:shc_lite.tob",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerPCEscaped) || i.has_tags(TypeTags.BouncerMythAlterna)
        ),
      },
      {
        icon: "nomad",
        name: "challenges:shc_lite.nomad",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerNomad)),
      },
      {
        icon: "yeti",
        name: "challenges:shc_lite.myth_1",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerMythOriginal) || i.has_tags(TypeTags.BouncerMythClassical)
        ),
      },
      {
        icon: "mermaid",
        name: "challenges:shc_lite.myth_2",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerMythMirror) || i.has_tags(TypeTags.BouncerMythModern)
        ),
      },
      {
        icon: "tuli",
        name: "challenges:shc_lite.pc_1",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerPCS1)),
      },
      {
        icon: "oniks",
        name: "challenges:shc_lite.pc_2",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerPCS2) || i.has_tags(TypeTags.BouncerPCFunfinity)
        ),
      },
      {
        icon: "tuxflatrob",
        name: "challenges:shc_lite.flat",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerFlat)),
      },
      {
        icon: "butterfly",
        name: "challenges:shc_lite.temp",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerTPOB) || i.has_tags(TypeTags.BouncerEvolution)
        ),
      },
      {
        icon: "scattered",
        name: "challenges:shc_lite.scatter",
        types: db.types.filter(i => i.has_tags(TypeTags.Scatter)),
      },
    ],
  },
  {
    id: "shc_pro",
    name: "Special Hunter PRO",
    size: "large",
    categories: [
      {
        icon: "vikerkaar",
        name: "challenges:shc_pro.tob",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerPCEscaped) || i.has_tags(TypeTags.BouncerMythAlterna)
        ),
      },
      {
        icon: "nomad",
        name: "challenges:shc_pro.nomad",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerNomad)),
      },
      {
        icon: "retiredleprechaun",
        name: "challenges:shc_pro.retired",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerRetired)),
      },
      {
        icon: "yeti",
        name: "challenges:shc_pro.myth_1",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerMythOriginal) || i.has_tags(TypeTags.BouncerMythClassical)
        ),
      },
      {
        icon: "cyclops",
        name: "challenges:shc_pro.myth_2",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerMythClassical)),
      },
      {
        icon: "mermaid",
        name: "challenges:shc_lite.myth_3",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerMythMirror)),
      },
      {
        icon: "poseidon",
        name: "challenges:shc_lite.myth_4",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerMythModern)),
      },
      {
        icon: "tuli",
        name: "challenges:shc_lite.pc_1",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerPCS1)),
      },
      {
        icon: "magnetus",
        name: "challenges:shc_lite.pc_2",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerPCS2)),
      },
      {
        icon: "oniks",
        name: "challenges:shc_lite.pc_fun",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerPCFunfinity)),
      },
      {
        icon: "tuxflatrob",
        name: "challenges:shc_lite.flat",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerFlat)),
      },
      {
        icon: "butterfly",
        name: "challenges:shc_lite.temp",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerTPOB) || i.has_tags(TypeTags.BouncerEvolution)
        ),
      },
      {
        icon: "scattered",
        name: "challenges:shc_lite.pscatter",
        types: db.types.filter(i => i.has_tags(TypeTags.Scatter) && i.state === TypeState.Physical),
      },
      {
        icon: "charge",
        name: "challenges:shc_lite.vscatter",
        types: db.types.filter(i => i.has_tags(TypeTags.Scatter) && i.state === TypeState.Virtual),
      },
    ],
  },
  {
    id: "poi",
    name: "Places of Interest",
    size: "small",
    categories:
      db.getCategory("place")?.types.map(i => ({
        icon: i.icon,
        name: i.name,
        types: [i],
      })) ?? [],
  },
  {
    id: "colour",
    icon: "virtualrainbow",
    name: "Virtual Colours",
    size: "small",
    categories:
      db.types
        .filter(i => i.has_tag(TypeTags.TypeVirtual))
        .map(i => ({
          icon: i.icon,
          name: i.name,
          types: [i],
        })) ?? [],
  },
  {
    id: "scatter",
    name: "Scatters",
    size: "small",
    categories:
      db.types
        .filter(i => i.has_tag(TypeTags.Scatter) && !i.category_raw.startsWith("seasonal_"))
        .map(i => ({
          icon: i.icon,
          name: i.name,
          types: [i],
        })) ?? [],
  },
  {
    id: "funfinity",
    icon: "oniks",
    name: "Funfinity Stones",
    size: "small",
    categories:
      db.types
        .filter(i => i.has_tag(TypeTags.BouncerPCFunfinity))
        .map(i => ({
          icon: i.icon,
          name: i.name,
          types: [i],
        })) ?? [],
  },
  {
    id: "zodiac_western",
    icon: "zodiac",
    name: "Western Zodiac",
    size: "small",
    categories:
      db.types
        .filter(i => i.has_tag(TypeTags.TypeZodiacWestern))
        .map(i => ({
          icon: i.icon,
          name: i.name,
          types: [i],
        })) ?? [],
  },
  {
    id: "zodiac_chinese",
    icon: "chinese_zodiac",
    name: "Chinese Zodiac",
    size: "small",
    categories:
      db.types
        .filter(i => i.has_tag(TypeTags.TypeZodiacChinese))
        .map(i => ({
          icon: i.icon,
          name: i.name,
          types: [i],
        })) ?? [],
  },
];

export default function ChallengesConverter(data: UserActivityConverterOutput) {
  const challenges: ChallengeWithCompletion[] = Challenges.map(i => ({
    ...i,
    categories: i.categories.map(c => ({
      ...c,
      completion: [] as UserActivityItem[],
    }))
  }));
  for (const item of data.list.filter(i=>i.type === "capture")) {
    for (const category of challenges.map(i => i.categories).flat()) {
      if (item.munzee_type && category.types.includes(item.munzee_type)) category.completion.push(item);
    }
  }
  return challenges;
}
