import getEvents from "./events";
import getSeasonals from "./seasonals";
import getRegulars from "./regular";
import { Type, TypeQuery, TypeQueryQuery, TypeTags } from "./types";
import getCards from "./cards";

export interface getTypesOptions {
  force?: boolean;
}

export interface TypesResponse<D = TypeQuery> {
  events?: ([string, string, number] | [string, number | null] | [string, string] | string)[];
  types: Type<D>[];
  categories: unknown[];
}

const cache: { data: TypesResponse<string> | null } = {
  data: null,
};

function strip(icon: string) {
  if (icon.startsWith("https://munzee.global")) icon = icon.slice(49, -4);
  var x = decodeURIComponent(icon)
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
  if (x !== "munzee" && x.endsWith("munzee")) return x.replace(/munzee$/, "");
  return x;
}

function checkTypeFilter(type: Type<TypeQuery>, filter: TypeQueryQuery): boolean {
  switch (filter[0]) {
    case "!":
      return !checkTypeFilter(type, filter[1]);
    case "evolution_base":
      return !!type.meta?.evolution_base && filter[1].includes(type.meta?.evolution_base);
    case "is":
      return filter.slice(1).some(i => type.id === i || type.icons.some(icon => typeof i === "string" && strip(icon) === strip(i)))
    case "tag":
      return type.tags.includes(TypeTags[filter[1]]);
  }
}

function checkType(type: Type<TypeQuery>, filters: TypeQueryQuery[]) {
  for (const filter of filters) {
    if(!checkTypeFilter(type, filter)) return false;
  }
  return true;
}

function resolveTypes(types: Type<TypeQuery>[], filter?: TypeQuery[]): string[] | undefined {
  if (!filter) return undefined;
  return Array.from(
    new Set(
      ([] as string[]).concat(
        ...filter.map(i => {
          if (typeof i === "string") {
            console.log(
              i,
              types.filter(t => t.icons.some(ic => strip(ic) === strip(i)) || t.id === i)
            );
            return types.filter(t => t.icons.some(ic => ic === i) || t.id === i).map(i => i.id);
          }
          if (typeof i === "number") {
            return types.filter(t => t.munzee_id === Number(i)).map(i => i.id);
          }
          return [...types.filter(type => checkType(type, i)).map(i => i.id)];
        })
      )
    )
  );
}

function resolveMeta(types: Type<TypeQuery>[]): Type[] {
  return types.map(i => ({
    ...i,
    meta: {
      ...i.meta,
      bouncer_lands_on: resolveTypes(types, i.meta?.bouncer_lands_on),
      scatter_lands_on: resolveTypes(types, i.meta?.scatter_lands_on),
      host_types: resolveTypes(types, i.meta?.host_types),
      scatterer_types: resolveTypes(types, i.meta?.scatterer_types),
    },
  }));
}

export default async function getTypes(options?: getTypesOptions): Promise<TypesResponse<string>> {
  if (options?.force || !cache.data) {
    const seasonals = await getSeasonals();
    const regulars = await getRegulars();
    const events = await getEvents();
    const cards = await getCards();
    cache.data = {
      events: events,
      types: resolveMeta([...seasonals.types, ...regulars.types, ...cards.types]),
      categories: [...seasonals.categories],
    };
  }
  return cache.data;
}
