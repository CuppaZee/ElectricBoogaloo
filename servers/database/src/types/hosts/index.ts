import {
  TypeInterface,
  CategoryInterface,
  TypeTags,
  TypeHidden,
} from "@cuppazee/db";

export const types: TypeInterface[] = [];
export const categories: CategoryInterface[] = [
  {
    name: "Bouncer Hosts",
    id: "bouncer_host",
    icon: "expiring_specials_filter",
    parents: ["bouncer"],
  },
];

import flats from "./flats";
for (const t of flats) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
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
    icons: t.icons,
    id: t.id,
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
    icons: t.icons,
    id: t.id,
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
    icons: t.icons,
    id: t.id,
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
    icons: t.icons,
    id: t.id,
    state: t.state,
    category: "bouncer_host",
    tags: [TypeTags.BouncerHost, ...(t.tags ?? [])],
    meta: {
      host_types: t.hosts,
    },
    hidden: [TypeHidden.Deploy, TypeHidden.Inventory],
  });
}