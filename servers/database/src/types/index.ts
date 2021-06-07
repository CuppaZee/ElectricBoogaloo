import { TypeInterface, CategoryInterface, TypeTags, TypeHidden, TypeState } from '@cuppazee/db';

const types: TypeInterface[] = [];
const categories: CategoryInterface[] = [
  {
    name: "Events",
    id: "event",
    icon: "event",
    parents: [],
  },
  {
    name: "Credits",
    id: "credit",
    icon: "zeds",
    parents: [],
  },
  {
    name: "Other",
    id: "other",
    icon: "mystery",
    parents: [],
  },
  {
    name: "Root",
    id: "root",
    icon: "mystery",
    parents: [],
  },
];

import events from './other/events';

import credits from './other/credits';
for(const t of credits) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: `credit_${t.icons[0]}`,
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

import other from './other/other';
for(const t of other) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: `other_${t.icons[0]}`,
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

import { types as BouncerTypes, categories as BouncerCategories } from './bouncers';
import { types as HostTypes, categories as HostCategories } from './hosts';
import { types as NormalTypes, categories as NormalCategories } from './normal';
import { types as SeasonalTypes, categories as SeasonalCategories } from './seasonal';
import { types as CardTypes, categories as CardCategories } from './cards';
import { types as EvoTypes, categories as EvoCategories } from './evolutions';


export default {
  events: events.map((i, n, a) => ({
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
    ),
  types: [
    ...types,
    ...BouncerTypes,
    ...HostTypes,
    ...NormalTypes,
    ...SeasonalTypes,
    ...CardTypes,
    ...EvoTypes,
  ],
  categories: [
    ...categories,
    ...BouncerCategories,
    ...HostCategories,
    ...NormalCategories,
    ...SeasonalCategories,
    ...CardCategories,
    ...EvoCategories,
  ],
};