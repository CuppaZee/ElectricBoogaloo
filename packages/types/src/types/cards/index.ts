import {
  TypeInterface,
  TypeCategoryInterface,
  TypeTags,
  TypeHidden,
  TypeState,
} from "../../munzee";

export const types: TypeInterface[] = [];
export const categories: TypeCategoryInterface[] = [
  {
    name: "Greetings Cards",
    id: "card",
    icon: "envelope",
    parents: ["root"],
  },
];

import y2020 from "./2020";
import open from "./open";
const years = {
  open: {
    name: "Open Cards",
    types: open,
    tag: TypeTags.CardOpen,
  },
  "2020": {
    name: "2020 Cards",
    types: y2020,
    tag: TypeTags.Card2020,
  },
};
for (const year of Object.keys(years) as (keyof typeof years)[]) {
  categories.push({
    name: years[year].name,
    id: `card_${year}`,
    icon: "envelope",
    parents: ["root"],
  })
  for (const t of years[year].types) {
    types.push({
      name: t.name,
      icon: t.icon,
      id: t.id,
      alt_icons: [],
      state: t.state ?? TypeState.Bouncer,
      category: `card_${year}`,
      tags: [TypeTags.Card, years[year].tag, ...(t.tags ?? [])],
      meta: {
        bouncer_duration: t.duration,
        bouncer_lands_on: t.lands_on,
        ...(t.meta ?? {}),
      },
      hidden: [TypeHidden.Deploy, TypeHidden.Inventory, ...(t.hidden ?? [])],
    });
  }
}
