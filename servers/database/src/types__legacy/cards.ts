import { TypesResponse } from ".";
import mongo from "../mongo";
import { TypeHidden, TypeState, TypeTags } from "./types";

export default async function getCards(): Promise<TypesResponse> {
  const data = await mongo.collection<{ icons: string[]; id: string; year: string; name: string; munzee_id?: number }>("types_cards").find().toArray();

  const response: TypesResponse = {
    types: [],
    categories: [],
  }

  for (const t of data) {
    // types.push({
    //   name: t.name,
    //   icon: t.icon,
    //   id: t.id,
    //   alt_icons: [],
    //   state: t.state ?? TypeState.Virtual,
    //   category: `card_${year}`,
    //   tags: [TypeTags.Card, years[year].tag, ...(t.tags ?? [])],
    //   meta: t.meta ?? {},
    //   hidden:
    //     year === "2021" || year === "open"
    //       ? t.hidden ?? []
    //       : [TypeHidden.Inventory, ...(t.hidden ?? [])],
    // });
    response.types.push({
      ...t,
      state: TypeState.Virtual,
      hidden: t.year === "2021" || t.year === "open" ? undefined : [TypeHidden.Inventory],
      tags: [TypeTags.Card, TypeTags[`Card${t.year}` as `Card2020`]],
      category: `card_${t.year}`,
      meta: {},
    });
  }
  
  return response;
}