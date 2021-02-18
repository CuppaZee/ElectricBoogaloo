import {
  TypeInterface,
  TypeCategoryInterface,
  TypeTags,
  TypeHidden,
  TypeState,
  PointsInterface,
  TypeMeta,
  TypeID,
} from "../../munzee";

export const types: TypeInterface[] = [];
export const categories: TypeCategoryInterface[] = [
  {
    name: "Evolutions",
    id: "evolution",
    icon: "evolution",
    parents: ["normal"],
  },
];

import farm from "./farm";
import education from "./education";
import nature from "./nature";
import reseller from "./reseller";
const sets: {
  [key: string]: {
    name: string;
    types: {
      name: string;
      icon: string;
      id: TypeID;
      state: TypeState;
      stage?: number;
      base?: string;
      inventory?: true;
      lands_on?: TypeID[];
      duration?: number;
    
      meta?: TypeMeta;
      alt_icons?: string[];
      points?: PointsInterface;
      tags?: TypeTags[];
      hidden?: TypeHidden[];
    }[];
    tag: TypeTags;
  }
} = {
  farm: {
    name: "Farm Evolutions",
    types: farm,
    tag: TypeTags.EvolutionFarm,
  },
  education: {
    name: "Education Evolutions",
    types: education,
    tag: TypeTags.EvolutionEducation,
  },
  nature: {
    name: "Nature Evolutions",
    types: nature,
    tag: TypeTags.EvolutionNature,
  },
  reseller: {
    name: "Reseller Evolutions",
    types: reseller,
    tag: TypeTags.EvolutionReseller,
  },
};
for (const set of Object.keys(sets) as (keyof typeof sets)[]) {
  categories.push({
    name: sets[set].name,
    id: `evolution_${set}`,
    icon: sets[set].types[0].icon,
    parents: ["evolution"],
  });
  for (const t of sets[set].types) {
    types.push({
      name: t.name,
      icon: t.icon,
      id: t.id,
      alt_icons: [],
      state: t.state,
      category: `evolution_${set}`,
      tags: [TypeTags.Evolution, sets[set].tag, ...(t.tags ?? [])],
      meta: {
        evolution_base: t.base,
        evolution_stage: t.stage,
        ...(t.meta ?? {}),

        bouncer_lands_on: t.lands_on,
        bouncer_duration: t.duration,
      },
      hidden: t.hidden ?? [TypeHidden.Inventory],
    });
  }
}
