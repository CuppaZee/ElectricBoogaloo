import { TypeInterface, TypeDatabase, TypeCategoryInterface, TypeTags, TypeHidden, TypeState } from './munzee';

const types: TypeInterface[] = [];
const categories: TypeCategoryInterface[] = [
  {
    name: "Events",
    id: "event",
    icon: "event",
    parents: ["root"]
  }
];

import events from './types/events';
for(const e of events) {
  types.push({
    name: e.name,
    icon: e.icon,
    id: e.id,
    alt_icons: [],
    state: TypeState.Physical,
    category: "event",
    tags: [
      TypeTags.TypeEvent,
      TypeTags.TypeEventCustom,
    ],
    hidden: [
      TypeHidden.IconApp,
    ]
  })
}

import credits from './types/credits';
for(const t of credits) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: `credit_${t.icon}`,
    alt_icons: t.alt_icons ?? [],
    state: TypeState.Locationless,
    category: "credit",
    tags: [
      TypeTags.Credit,
    ],
    hidden: [
      TypeHidden.Deploy,
      TypeHidden.Capture,
    ]
  })
}

import other from './types/other';
for(const t of other) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: `other_${t.icon}`,
    alt_icons: [],
    state: TypeState.Locationless,
    category: "other",
    tags: [
      TypeTags.Other,
    ],
    hidden: [
      TypeHidden.All,
    ]
  })
}

import { types as BouncerTypes, categories as BouncerCategories } from './types/bouncers';
import { types as HostTypes, categories as HostCategories } from './types/hosts';
import { types as NormalTypes, categories as NormalCategories } from './types/normal';
import { types as SeasonalTypes, categories as SeasonalCategories } from './types/seasonal';
import { types as CardTypes, categories as CardCategories } from './types/cards';
import { types as EvoTypes, categories as EvoCategories } from './types/evolutions';

const db = new TypeDatabase([
  ...types,
  ...BouncerTypes,
  ...HostTypes,
  ...NormalTypes,
  ...SeasonalTypes,
  ...CardTypes,
  ...EvoTypes,
], [
  ...categories,
  ...BouncerCategories,
  ...HostCategories,
  ...NormalCategories,
  ...SeasonalCategories,
  ...CardCategories,
  ...EvoCategories,
]);

export default db;