// import { TypesResponse } from ".";
import mongo from "../mongo";
// import { TypeState, TypeTags } from "./types";

export interface EventType {
  id?: number;
  icon?: string;
  name: string;
  missingicon?: boolean;
}

export default async function getEvents(): Promise<
  ([string, string, number] | [string, number | null] | [string, string] | string)[]
> {
  const data = await mongo.collection<EventType>("types_event").find().toArray();

  // const type: EventType[];

  // for (const type of data) {
  //     response.types.push({
  //       name: type.name,
  //       icons: [type.icon],
  //       id: type.icon,
  //       munzee_id: type.id,
  //       state: TypeState.Physical,
  //       category: "event",
  //       tags: [TypeTags.TypeEvent, TypeTags.TypeEventCustom]
  //     })
  // }

  return data
    .map((i, n, a) => ({
      icon: i.icon === i.name.toLowerCase().replace(/\s/g, "") ? undefined : i.icon,
      id: i.id === (a[n - 1]?.id ?? 0) + 1 ? undefined : i.id,
      name: i.name,
    }))
    .map(i =>
      Object.entries(i).filter(x => x[1] !== undefined).length === 1
        ? i.name
        : i.icon
        ? i.id
          ? [i.name, i.icon, i.id]
          : [i.name, i.icon]
        : [i.name, i.id ?? null]
    );
}