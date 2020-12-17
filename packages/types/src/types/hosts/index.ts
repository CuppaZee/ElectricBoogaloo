import {
  TypeInterface,
  TypeCategoryInterface,
  TypeTags,
  TypeHidden,
} from "../../munzee";

export const types: TypeInterface[] = [];
export const categories: TypeCategoryInterface[] = [
  {
    name: "Bouncer Hosts",
    id: "bouncer_host",
    icon: "expiring_specials_filter",
    parents: ["bouncers"],
  },
];

import flats from "./flats";
for (const t of flats) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: t.state,
    category: "bouncer_host",
    tags: [TypeTags.BouncerHost, TypeTags.BouncerHostFlat],
    meta: {
      host_types: t.hosts,
    },
    hidden: [TypeHidden.Deploy, TypeHidden.Inventory],
  });
}

import myths from "./myths";
for (const t of myths) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: t.state,
    category: "bouncer_host",
    tags: [TypeTags.BouncerHost, TypeTags.BouncerHostMyth, ...(t.tags ?? [])],
    meta: {
      host_types: t.hosts,
    },
    hidden: [TypeHidden.Deploy, TypeHidden.Inventory],
  });
}

import tobs from "./tobs";
for (const t of tobs) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: t.state,
    category: "bouncer_host",
    tags: [TypeTags.BouncerHost, ...(t.tags ?? [])],
    meta: {
      host_types: t.hosts,
    },
    hidden: [TypeHidden.Deploy, TypeHidden.Inventory],
  });
}

import tpobs from "./tpobs";
for (const t of tpobs) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: t.state,
    category: "bouncer_host",
    tags: [TypeTags.BouncerHost, ...(t.tags ?? [])],
    meta: {
      host_types: t.hosts,
    },
    hidden: [TypeHidden.Deploy, TypeHidden.Inventory],
  });
}


import pouch from "./pouch";
for (const t of pouch) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: t.state,
    category: "bouncer_host",
    tags: [TypeTags.BouncerHost, ...(t.tags ?? [])],
    meta: {
      host_types: t.hosts,
    },
    hidden: [TypeHidden.Deploy, TypeHidden.Inventory],
  });
}