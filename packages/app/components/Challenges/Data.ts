import db, { Type, TypeTags } from "@cuppazee/types";
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
  name: string;
  size?: "small" | "large";
  categories: ChallengeCategory[];
};

export type ChallengeWithCompletion = {
  id: string;
  name: string;
  size?: "small" | "large";
  categories: ChallengeCategoryWithCompletion[];
};

export const Challenges: Challenge[] = [
  {
    id: "shc_lite",
    name: "Special Hunter LITE",
    size: "small",
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
];

export default function ChallengesConverter(data: UserActivityConverterOutput) {
  const challenges: ChallengeWithCompletion[] = Challenges.map(i => ({
    ...i,
    categories: i.categories.map(c => ({
      ...c,
      completion: [] as UserActivityItem[],
    }))
  }));
  for (const item of data.list) {
    for (const category of challenges.map(i => i.categories).flat()) {
      if (item.munzee_type && category.types.includes(item.munzee_type)) category.completion.push(item);
    }
  }
  return challenges;
}
