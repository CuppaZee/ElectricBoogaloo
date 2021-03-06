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
        name: "TOB",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerPCEscaped) || i.has_tags(TypeTags.BouncerMythAlterna)
        ),
      },
      {
        icon: "nomad",
        name: "Nomad",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerNomad)),
      },
      {
        icon: "yeti",
        name: "Original/Classical Myth",
        types: db.types.filter(
          i =>
            (i.has_tags(TypeTags.BouncerMythOriginal) ||
              i.has_tags(TypeTags.BouncerMythClassical)) &&
            !i.has_tag(TypeTags.BouncerMythAlterna) &&
            !i.has_tag(TypeTags.BouncerRetired)
        ),
      },
      {
        icon: "mermaid",
        name: "Mirror/Modern Myth",
        types: db.types.filter(
          i =>
            (i.has_tags(TypeTags.BouncerMythMirror) || i.has_tags(TypeTags.BouncerMythModern)) &&
            !i.has_tag(TypeTags.BouncerMythAlterna) &&
            !i.has_tag(TypeTags.BouncerRetired)
        ),
      },
      {
        icon: "tuli",
        name: "Season 1 Pouch Creature",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerPCS1) && !i.has_tag(TypeTags.BouncerPCEscaped)
        ),
      },
      {
        icon: "Season 2 / Funfinity Pouch Creature",
        name: "challenges:shc_lite.pc_2",
        types: db.types.filter(
          i =>
            (i.has_tags(TypeTags.BouncerPCS2) || i.has_tags(TypeTags.BouncerPCFunfinity)) &&
            !i.has_tag(TypeTags.BouncerPCEscaped) &&
            !i.has_tag(TypeTags.BouncerPCZombie)
        ),
      },
      {
        icon: "tuxflatrob",
        name: "Fancy Flat",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerFlat) && !i.has_tag(TypeTags.BouncerFlatPhantom)
        ),
      },
      {
        icon: "butterfly",
        name: "Temp POB",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerTPOB) || i.has_tags(TypeTags.BouncerEvolution)
        ),
      },
      {
        icon: "scattered",
        name: "Scatter",
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
        name: "TOB",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerPCEscaped) || i.has_tags(TypeTags.BouncerMythAlterna)
        ),
      },
      {
        icon: "nomad",
        name: "Nomad",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerNomad)),
      },
      {
        icon: "retiredleprechaun",
        name: "Retired Bouncer",
        types: db.types.filter(i => i.has_tags(TypeTags.BouncerRetired)),
      },
      {
        icon: "yeti",
        name: "Original Myth",
        types: db.types.filter(
          i =>
            i.has_tags(TypeTags.BouncerMythOriginal) &&
            !i.has_tag(TypeTags.BouncerMythAlterna) &&
            !i.has_tag(TypeTags.BouncerRetired)
        ),
      },
      {
        icon: "cyclops",
        name: "Classical Myth",
        types: db.types.filter(
          i =>
            i.has_tags(TypeTags.BouncerMythClassical) &&
            !i.has_tag(TypeTags.BouncerMythAlterna) &&
            !i.has_tag(TypeTags.BouncerRetired)
        ),
      },
      {
        icon: "mermaid",
        name: "Mirror Myth",
        types: db.types.filter(
          i =>
            i.has_tags(TypeTags.BouncerMythMirror) &&
            !i.has_tag(TypeTags.BouncerMythAlterna) &&
            !i.has_tag(TypeTags.BouncerRetired)
        ),
      },
      {
        icon: "poseidon",
        name: "Modern Myth",
        types: db.types.filter(
          i =>
            i.has_tags(TypeTags.BouncerMythModern) &&
            !i.has_tag(TypeTags.BouncerMythAlterna) &&
            !i.has_tag(TypeTags.BouncerRetired)
        ),
      },
      {
        icon: "tuli",
        name: "Season 1 Pouch Creature",
        types: db.types.filter(
          i =>
            i.has_tags(TypeTags.BouncerPCS1) &&
            !i.has_tag(TypeTags.BouncerPCEscaped) &&
            !i.has_tag(TypeTags.BouncerRetired)
        ),
      },
      {
        icon: "magnetus",
        name: "Season 2 Pouch Creature",
        types: db.types.filter(
          i =>
            i.has_tags(TypeTags.BouncerPCS2) &&
            !i.has_tag(TypeTags.BouncerPCEscaped) &&
            !i.has_tag(TypeTags.BouncerRetired)
        ),
      },
      {
        icon: "oniks",
        name: "Funfinity Stone",
        types: db.types.filter(
          i =>
            i.has_tags(TypeTags.BouncerPCFunfinity) &&
            !i.has_tag(TypeTags.BouncerPCEscaped) &&
            !i.has_tag(TypeTags.BouncerRetired)
        ),
      },
      {
        icon: "tuxflatrob",
        name: "Fancy Flat",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerFlat) && !i.has_tag(TypeTags.BouncerRetired)
        ),
      },
      {
        icon: "butterfly",
        name: "Temp POB",
        types: db.types.filter(
          i => i.has_tags(TypeTags.BouncerTPOB) || i.has_tags(TypeTags.BouncerEvolution)
        ),
      },
      {
        icon: "scattered",
        name: "Physical Scatter",
        types: db.types.filter(i => i.has_tags(TypeTags.Scatter) && i.state === TypeState.Physical),
      },
      {
        icon: "charge",
        name: "Virtual Scatter",
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
    })),
  }));
  for (const item of [...data.list, ...data.list.map(i => i.subCaptures ?? [])]
    .flat()
    .filter(i => i.type === "capture")) {
    for (const category of challenges.map(i => i.categories).flat()) {
      if (item.munzee_type && category.types.includes(item.munzee_type))
        category.completion.push(item);
    }
  }
  return challenges;
}
