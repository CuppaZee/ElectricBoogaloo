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
import y2020hccc from "./2020hccc";
import y2021 from "./2021";
import y2021vccc from "./2021vccc";
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
  "2020hccc": {
    name: "2020 HCCC Cards",
    types: y2020hccc,
    tag: TypeTags.Card2020HCCC,
  },
  "2021": {
    name: "2021 Cards",
    types: y2021,
    tag: TypeTags.Card2021,
  },
  "2021vccc": {
    name: "2021 VCCC Cards",
    types: y2021vccc,
    tag: TypeTags.Card2021VCCC,
  },
};
for (const year of Object.keys(years) as (keyof typeof years)[]) {
  categories.push({
    name: years[year].name,
    id: `card_${year}`,
    icon: "envelope",
    parents: ["card"],
  });
  for (const t of years[year].types) {
    types.push({
      name: t.name,
      icon: t.icon,
      id: t.id,
      alt_icons: [],
      state: t.state ?? TypeState.Virtual,
      category: `card_${year}`,
      tags: [TypeTags.Card, years[year].tag, ...(t.tags ?? [])],
      meta: t.meta ?? {},
      hidden:
        year === "2021" || year === "open"
          ? t.hidden ?? []
          : [TypeHidden.Inventory, ...(t.hidden ?? [])],
    });
  }
}
