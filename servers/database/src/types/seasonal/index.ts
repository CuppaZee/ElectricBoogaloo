import {
  TypeInterface,
  CategoryInterface,
  TypeTags,
  TypeHidden,
  TypeState,
  TypePoints,
  TypeMeta,
  TypeQuery,
} from "@cuppazee/db";

export const types: TypeInterface[] = [];
export const categories: CategoryInterface[] = [
  {
    name: "Seasonal Specials",
    id: "seasonal",
    icon: "",
    parents: ["root", "bouncers"],
  },
];

export type SeasonalCategory = {
  name: string;
  id: string;
  starts: string;
  ends: string;
  specials?: {
    name: string;
    icons: string[];
    id: string;
    munzee_id?: number;
    duration?: number;
    lands_on?: TypeQuery[];
    meta?: TypeMeta;
    state?: TypeState;
    points?: TypePoints;
    tags?: TypeTags[];
    hidden?: TypeHidden[];
  }[];
  pobs?: {
    name: string;
    icons: string[];
    id: string;
    munzee_id?: number;
    duration?: number;
    tags?: TypeTags[];
    lands_on: TypeQuery[];
    meta?: TypeMeta;
    hidden?: TypeHidden[];
  }[];
  types?: Partial<TypeInterface>[];
};

import y2021 from "./2021";
import y2020 from "./2020";
import y2019 from "./2019";
import y2018 from "./2018";
import y2017 from "./2017";
import y2016 from "./2016";
import y2015 from "./2015";
const years: {
  [key: string]: {
    categories: SeasonalCategory[];
    tag: TypeTags;
  };
} = {
  "2021": {
    categories: y2021,
    tag: TypeTags.BouncerSeasonal2021,
  },
  "2020": {
    categories: y2020,
    tag: TypeTags.BouncerSeasonal2020,
  },
  "2019": {
    categories: y2019,
    tag: TypeTags.BouncerSeasonal2019,
  },
  "2018": {
    categories: y2018,
    tag: TypeTags.BouncerSeasonal2018,
  },
  "2017": {
    categories: y2017,
    tag: TypeTags.BouncerSeasonal2017,
  },
  "2016": {
    categories: y2016,
    tag: TypeTags.BouncerSeasonal2016,
  },
  "2015": {
    categories: y2015,
    tag: TypeTags.BouncerSeasonal2015,
  },
};
for (const year of Object.keys(years) as (keyof typeof years)[]) {
  categories.push({
    name: `${year} Seasonal Specials`,
    id: `seasonal_${year}`,
    icon:
      years[year].categories.find(i => i.specials)?.specials?.[0].icons[0] ||
      "expiring_specials_filter",
    parents: year === "2021" ? ["seasonal", "root"] : ["seasonal"],
  });
  for (const c of years[year].categories) {
    categories.push({
      name: c.name,
      id: `seasonal_${year}_${c.name
        .toLowerCase()
        .replace(/\s/g, "-")
        .replace(/[^-a-z0-9]+/g, "")}`,
      icon: (c.specials || c.types)?.[0].icons?.[0] || "expiring_specials_filter",
      parents: [`seasonal_${year}`],
      seasonal: {
        year: Number(year),
        start: new Date(c.starts).valueOf(),
        end: new Date(c.ends).valueOf(),
      },
    });
    for (const t of c.specials ?? []) {
      types.push({
        name: t.name,
        icons: t.icons,
        id: t.id,
        munzee_id: t.munzee_id,
        state: t.state ?? TypeState.Bouncer,
        category: `seasonal_${year}_${c.name
          .toLowerCase()
          .replace(/\s/g, "-")
          .replace(/[^-a-z0-9]+/g, "")}`,
        tags: [TypeTags.Bouncer, TypeTags.BouncerSeasonal, years[year].tag, ...(t.tags ?? [])],
        meta: {
          bouncer_duration: t.duration,
          bouncer_lands_on: t.lands_on,
          ...(t.meta ?? {}),
        },
        hidden: [TypeHidden.Deploy, TypeHidden.Inventory, ...(t.hidden ?? [])],
      });
    }
    for (const t of c.pobs ?? []) {
      types.push({
        name: t.name,
        icons: t.icons,
        id: t.id,
        munzee_id: t.munzee_id,
        state: TypeState.Bouncer,
        category: `seasonal_${year}_${c.name
          .toLowerCase()
          .replace(/\s/g, "-")
          .replace(/[^-a-z0-9]+/g, "")}`,
        tags: [
          TypeTags.Bouncer,
          TypeTags.BouncerSeasonal,
          years[year].tag,
          TypeTags.BouncerTPOB,
          ...(t.tags ?? []),
        ],
        meta: {
          bouncer_duration: t.duration || 12,
          bouncer_lands_on: t.lands_on,
          ...(t.meta ?? {}),
        },
        hidden: [TypeHidden.Inventory],
      });
    }
    for (const t of c.types ?? []) {
      types.push({
        name: "",
        icons: [""],
        id: "",
        state: TypeState.Physical,
        category: `seasonal_${year}_${c.name
          .toLowerCase()
          .replace(/\s/g, "-")
          .replace(/[^-a-z0-9]+/g, "")}`,
        hidden: [TypeHidden.Inventory],
        tags: [],
        meta: {},
        ...t,
      });
    }
  }
}
