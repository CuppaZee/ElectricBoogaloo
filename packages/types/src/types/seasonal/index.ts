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
    name: "Seasonal Specials",
    id: "seasonal",
    icon: "",
    parents: ["bouncers"],
  },
];

export type SeasonalCategory = {
  name: string;
  id: string;
  starts: string;
  ends: string;
  specials?: {
    name: string;
    icon: string;
    id: TypeID;
    duration?: number;
    lands_on?: TypeID[];
    meta?: TypeMeta;
    state?: TypeState;
    alt_icons?: string[];
    points?: PointsInterface;
    tags?: TypeTags[];
    hidden?: TypeHidden[];
  }[];
  pobs?: {
    name: string;
    icon: string;
    id: TypeID;
    duration?: number;
    alt_icons?: string[];
    tags?: TypeTags[];
    lands_on: TypeID[];
    meta?: TypeMeta;
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
    icon: "expiring_specials_filter",
    parents: year === "2021" ? ["seasonal", "root"] : ["seasonal"],
  });
  for (const c of years[year].categories) {
    categories.push({
      name: c.name,
      id: `seasonal_${year}_${c.name
        .toLowerCase()
        .replace(/\s/g, "-")
        .replace(/[^-a-z0-9]+/g, "")}`,
      icon: (c.specials || c.types)?.[0].icon || "expiring_specials_filter",
      parents: [`seasonal_${year}`],
    });
    for (const t of c.specials ?? []) {
      types.push({
        name: t.name,
        icon: t.icon,
        id: t.id,
        alt_icons: [],
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
        icon: t.icon,
        id: t.id,
        alt_icons: t.alt_icons ?? [],
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
        icon: "",
        id: "",
        state: TypeState.Physical,
        category: `seasonal_${year}_${c.name
          .toLowerCase()
          .replace(/\s/g, "-")
          .replace(/[^-a-z0-9]+/g, "")}`,
        alt_icons: [],
        hidden: [],
        tags: [],
        meta: {},
        ...t,
      });
    }
  }
}
