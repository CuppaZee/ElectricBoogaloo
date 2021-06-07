import { TypesResponse } from ".";
import mongo from "../mongo";
import { DBType, TypeHidden, TypeMeta, TypePoints, TypeState, TypeTags, TypeQuery } from "./types";

export interface SeasonalSection {
  name: string;
  id: string;
  starts: string;
  ends: string;
  year: number;
  specials?: {
    name: string;
    icons: string[];
    id: string;
    munzee_id?: number;
    duration?: number;
    lands_on: TypeQuery[];
    meta?: TypeMeta;
    points?: TypePoints;
    tags?: string[];
    hidden?: string[];
  }[];
  pobs?: {
    name: string;
    icons: string[];
    id: string;
    munzee_id?: number;
    duration?: number;
    lands_on: TypeQuery[];
    meta?: TypeMeta;
    points?: TypePoints;
    tags?: string[];
    hidden?: string[];
  }[];
  types?: Partial<DBType>[];
}

export default async function getSeasonals(): Promise<TypesResponse> {
  const data = await mongo.collection<SeasonalSection>("types_seasonal").find().toArray();

  const response: TypesResponse = {
    types: [],
    categories: [],
  }

  for (const section of data) {
    for (const t of section.specials ?? []) {
      response.types.push({
        name: t.name,
        icons: t.icons,
        munzee_id: t.munzee_id,
        id: t.id,
        state: TypeState.Bouncer,
        category: `seasonal_${section.year}_${section.id}`,
        tags: [
          TypeTags.Bouncer,
          TypeTags.BouncerSeasonal,
          TypeTags[`BouncerSeasonal${section.year as 2021}` as const],
          ...(t.tags?.map(i => TypeTags[i as `TypeEvent`]) ?? []),
        ],
        meta: {
          bouncer_duration: t.duration,
          bouncer_lands_on: t.lands_on,
          ...(t.meta ?? {}),
        },
        hidden: [TypeHidden.Deploy, TypeHidden.Inventory, ...(t.hidden?.map(i=>TypeHidden[i as 'Inventory']) ?? [])],
      });
    }
    for (const t of section.pobs ?? []) {
      response.types.push({
        name: t.name,
        icons: t.icons,
        munzee_id: t.munzee_id,
        id: t.id,
        state: TypeState.Bouncer,
        category: `seasonal_${section.year}_${section.id}`,
        tags: [
          TypeTags.Bouncer,
          TypeTags.BouncerSeasonal,
          TypeTags[`BouncerSeasonal${section.year as 2021}` as const],
          TypeTags.BouncerTPOB,
          ...(t.tags?.map(i=>TypeTags[i as 'Bouncer']) ?? []),
        ],
        meta: {
          bouncer_duration: t.duration || 12,
          bouncer_lands_on: t.lands_on,
          ...(t.meta ?? {}),
        },
        hidden: [TypeHidden.Inventory],
      });
    }
    for (const { state, tags, hidden, ...t } of section.types ?? []) {
      response.types.push({
        name: "",
        icons: [""],
        id: "",
        state: TypeState[(state as "Physical") ?? "Physical"],
        category: `seasonal_${section.year}_${section.id}`,
        hidden: hidden?.map(i => TypeHidden[i as "Inventory"]) ?? [TypeHidden.Inventory],
        tags: tags?.map(i => TypeTags[i as "Bouncer"]) ?? [],
        meta: {},
        ...t,
      });
    }
  }
  
  return response;
}