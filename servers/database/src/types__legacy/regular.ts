import { TypesResponse } from ".";
import mongo from "../mongo";
import { TypeHidden, DBType, TypeState, TypeTags } from "./types";

export interface RegularCategory {
  name: string;
  id: string;
  icon?: string;
  parents: string[];
  types: DBType[];
}

export default async function getRegulars(): Promise<TypesResponse> {
  const data = await mongo.collection<RegularCategory>("types_regular").find().toArray();

  const response: TypesResponse = {
    types: [],
    categories: [],
  }

  for (const category of data) {
    for (const { state, hidden, tags, ...t } of category.types) {
      response.types.push({
        ...t,
        state: TypeState[(state as "Physical") ?? "Physical"],
        hidden: hidden?.map(i => TypeHidden[i as "Inventory"]) ?? [TypeHidden.Inventory],
        tags: tags?.map(i => TypeTags[i as "Bouncer"]) ?? [],
        meta: {},
        ...t,
      });
    }
  }
  
  return response;
}