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
    name: "Bouncers",
    id: "bouncer",
    icon: "theunicorn",
    parents: ["root"],
  },
  {
    name: "Fancy Flats",
    id: "bouncer_fancy_flat",
    icon: "beachflatrob",
    parents: ["bouncer"],
  },
  {
    name: "Nomads",
    id: "bouncer_nomad",
    icon: "nomad",
    parents: ["bouncer"],
  },
  {
    name: "TOBs",
    id: "bouncer_tob",
    icon: "vikerkaar",
    parents: ["bouncer"],
  },
  {
    name: "Original Myth",
    id: "bouncer_myth_original",
    icon: "theunicorn",
    parents: ["bouncer"],
  },
  {
    name: "Classical Myth",
    id: "bouncer_myth_classical",
    icon: "faun",
    parents: ["bouncer"],
  },
  {
    name: "Mirror Myth",
    id: "bouncer_myth_mirror",
    icon: "banshee",
    parents: ["bouncer"],
  },
  {
    name: "Modern Myth",
    id: "bouncer_myth_modern",
    icon: "aphrodite",
    parents: ["bouncer"],
  },
  {
    name: "Retired Bouncers",
    id: "bouncer_retired",
    icon: "retiredpegasus",
    parents: ["bouncer"],
  },
  {
    name: "Pouch Creature S1",
    id: "bouncer_pouch_season_1",
    icon: "tuli",
    parents: ["bouncer"],
  },
  {
    name: "Pouch Creature S2",
    id: "bouncer_pouch_season_2",
    icon: "elekter",
    parents: ["bouncer"],
  },
  {
    name: "Funfinity Stones",
    id: "bouncer_pouch_funfinity",
    icon: "oniks",
    parents: ["bouncer"],
  },
  {
    name: "tPOB Bouncers",
    id: "bouncer_tpob",
    icon: "spyderbot",
    parents: ["bouncer"],
  },
];

import flats from "./flats";
for (const t of flats) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: TypeState.Bouncer,
    category: "bouncer_fancy_flat",
    tags: [TypeTags.Bouncer, TypeTags.BouncerFlat],
    meta: {
      bouncer_duration: 12,
      bouncer_lands_on: [
        (type) => type.has_tag(t.color),
        t.flat_type,
        ...t.lands_on,
      ],
    },
    hidden: [TypeHidden.Inventory],
  });
}

import pouch from "./pouch";
for (const t of pouch) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: TypeState.Bouncer,
    category: `bouncer_pouch_${t.set}`,
    tags: [
      TypeTags.Bouncer,
      TypeTags.BouncerPC,
      {
        season_1: TypeTags.BouncerPCS1,
        season_2: TypeTags.BouncerPCS2,
        funfinity: TypeTags.BouncerPCFunfinity,
      }[t.set],
      [
        TypeTags.BouncerPCStageless,
        TypeTags.BouncerPCStage1,
        TypeTags.BouncerPCStage2,
        TypeTags.BouncerPCStage3,
      ][t.stage || 0],
      ...(t.tags ?? []),
    ],
    meta: {
      bouncer_duration: 12,
      bouncer_lands_on: t.lands_on,
      evolution_base: t.base,
      ...(t.meta ?? {}),
    },
    hidden: [TypeHidden.Inventory],
  });
}

import myths from "./myths";
for (const t of myths) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: TypeState.Bouncer,
    category: `bouncer_myth_${t.type}`,
    tags: [TypeTags.Bouncer, TypeTags.BouncerMyth, ...(t.tags ?? [])],
    meta: {
      bouncer_duration: 12,
      bouncer_lands_on: t.lands_on,
      ...(t.meta ?? {}),
    },
    hidden: [TypeHidden.Inventory],
  });
}

import tobs from "./tobs";
for (const t of tobs) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: TypeState.Bouncer,
    category: `bouncer_tob`,
    tags: [TypeTags.Bouncer, ...(t.tags ?? [])],
    meta: {
      bouncer_duration: 12,
      bouncer_lands_on: t.lands_on,
      ...(t.meta ?? {}),
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
    state: TypeState.Bouncer,
    category: `bouncer_tpob`,
    tags: [TypeTags.Bouncer, TypeTags.BouncerTPOB, ...(t.tags ?? [])],
    meta: {
      bouncer_duration: t.duration || 12,
      bouncer_lands_on: t.lands_on,
      ...(t.meta ?? {}),
    },
    hidden: [TypeHidden.Inventory],
  });
}

import retired from "./retired";
for (const t of retired) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: TypeState.Bouncer,
    category: `bouncer_retired`,
    tags: [TypeTags.Bouncer, ...(t.tags ?? [])],
    meta: {
      bouncer_duration: t.duration ?? 12,
      bouncer_lands_on: t.lands_on,
      ...(t.meta ?? {}),
    },
    hidden: [TypeHidden.Deploy, TypeHidden.Inventory],
  });
}

import nomads from "./nomads";
for (const t of nomads) {
  types.push({
    name: t.name,
    icon: t.icon,
    id: t.id,
    alt_icons: [],
    state: TypeState.Bouncer,
    category: "bouncer_nomad",
    tags: [TypeTags.Bouncer, TypeTags.BouncerNomad],
    meta: {
      bouncer_duration: 12,
      bouncer_lands_on: t.lands_on,
    },
    hidden: [TypeHidden.Deploy, TypeHidden.Inventory, ...(t.hidden ?? [])],
  });
}
