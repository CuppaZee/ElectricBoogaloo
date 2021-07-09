import {
  TypeInterface,
  CategoryInterface,
  TypeTags,
  TypeHidden,
  TypeState,
} from "@cuppazee/db";

export const types: TypeInterface[] = [];
export const categories: CategoryInterface[] = [
  {
    name: "Normal",
    id: "normal",
    icon: "munzee",
    parents: ["root"],
  },
  {
    name: "Destinations",
    id: "destination",
    icon: "hotel",
    parents: ["normal"],
  },
  {
    name: "Flat Friends",
    id: "flat",
    icon: "flatrob",
    parents: ["normal"],
  },
  {
    name: "Gaming",
    id: "gaming",
    icon: "joystick",
    parents: ["normal"],
  },
  {
    name: "Jewels",
    id: "jewel",
    icon: "diamond",
    parents: ["normal"],
  },
  {
    name: "Misc",
    id: "misc",
    icon: "munzee",
    parents: ["normal"],
  },
  {
    name: "Mysteries",
    id: "mystery",
    icon: "mystery",
    parents: ["normal"],
  },
  {
    name: "Places",
    id: "place",
    icon: "poi_filter",
    parents: ["normal"],
  },
  {
    name: "Resellers",
    id: "reseller",
    icon: "reseller",
    parents: ["normal"],
  },
  {
    name: "Scatters",
    id: "scatter",
    icon: "scattered",
    parents: ["root"],
  },
  {
    name: "Misc Scatters",
    id: "scatter_misc",
    icon: "scattered",
    parents: ["scatter"],
  },
  {
    name: "Elemental Scatters",
    id: "scatter_elemental",
    icon: "frozengreenie",
    parents: ["scatter"],
  },
  {
    name: "Gaming Scatters",
    id: "scatter_gaming",
    icon: "fly",
    parents: ["scatter"],
  },
  {
    name: "Bouncer Scatters",
    id: "scatter_bouncer",
    icon: "flamingarrow",
    parents: ["scatter"],
  },
  {
    name: "ZeeCret Scatters",
    id: "scatter_zeecret",
    icon: "lasertrail1",
    parents: ["scatter"],
  },
  {
    name: "Tourism",
    id: "tourism",
    icon: "tourism",
    parents: ["normal"],
  },
  {
    name: "Universals",
    id: "universal",
    icon: "social",
    parents: ["normal"],
  },
  {
    name: "Virtuals",
    id: "virtual",
    icon: "virtualrainbow",
    parents: ["normal"],
  },
  {
    name: "Clan Weapons",
    id: "weapon_clan",
    icon: "mace",
    parents: ["normal"],
  },
  {
    name: "Zeecret Weapons",
    id: "weapon_zeecret",
    icon: "laserpen",
    parents: ["normal"],
  },
  {
    name: "Western Zodiacs",
    id: "zodiac_western",
    icon: "zodiac",
    parents: ["normal"],
  },
  {
    name: "Chinese Zodiacs",
    id: "zodiac_chinese",
    icon: "chinese_zodiac",
    parents: ["normal"],
  },
  {
    name: "Egyptian Zodiacs",
    id: "zodiac_egyptian",
    icon: "egyptian_zodiac",
    parents: ["normal"],
  },
];

import destinations from "./destinations";
for (const t of destinations) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state,
    category: "destination",
    tags: [TypeTags.TypeDestination, t.type, ...(t.tags ?? [])],
    meta: {
      destination_room_of: t.room_of,
      destination_size: t.size,
      destination_star_level: t.star_level,
      destination_temporary: t.temporary,
    },
    hidden: t.hidden ?? ((t.room_of || (t.star_level && t.star_level > 1)) ? [TypeHidden.Inventory] : []),
  });
}

import flats from "./flats";
for (const t of flats) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state,
    category: "flat",
    tags: [TypeTags.TypeFlat, ...(t.tags ?? [])],
    hidden: t.hidden ?? [],
  });
}

import gaming from "./gaming";
for (const t of gaming) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state,
    category: "gaming",
    tags: [TypeTags.TypeGaming, ...(t.tags ?? [])],
    hidden: t.hidden ?? [],
  });
}

import jewels from "./jewels";
for (const t of jewels) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state,
    category: "jewel",
    tags: [TypeTags.TypeJewel, ...(t.tags ?? [])],
    hidden: t.hidden ?? [],
  });
}

import misc from "./misc";
for (const t of misc) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state,
    category: "misc",
    tags: t.tags ?? [],
    hidden: t.hidden ?? [],
  });
}

import mysteries from "./mysteries";
for (const t of mysteries) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state,
    category: "mystery",
    tags: [TypeTags.TypeMystery, ...(t.tags ?? [])],
    hidden: t.hidden ?? [],
  });
}

import places from "./places";
for (const t of places) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state ?? TypeState.Virtual,
    category: "place",
    tags: [TypeTags.TypePOI, ...(t.tags ?? [])],
    hidden: t.hidden ?? [],
  });
}

import resellers from "./resellers";
for (const t of resellers) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state,
    category: "reseller",
    tags: [TypeTags.TypeReseller, ...(t.tags ?? [])],
    hidden: t.hidden ?? [],
  });
}

import scatters from "./scatters";
for (const t of scatters) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state ?? TypeState.Virtual,
    category: "scatter_" + (t.category ?? "misc"),
    meta: {
      scatter_duration: t.scatter.duration,
      ...t.meta ?? {}
    },
    tags: [
      TypeTags.Scatter,
      ...(t.tags ?? []),
      ...(t.scatter.standalone ? [TypeTags.ScatterStandalone] : []),
    ],
    hidden: [TypeHidden.Inventory, TypeHidden.Deploy],
  });
}

import tourism from "./tourism";
for (const t of tourism) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state ?? TypeState.Virtual,
    category: "tourism",
    tags: [TypeTags.TypeTourism, TypeTags.TypeUnique, ...(t.tags ?? [])],
    hidden: [TypeHidden.Inventory, TypeHidden.Deploy],
  });
}

import universals from "./universals";
for (const t of universals) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: TypeState.Locationless,
    category: "universal",
    tags: t.tags ?? [],
    hidden: [TypeHidden.Inventory],
  });
}

import virtuals from "./virtuals";
for (const t of virtuals) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: TypeState.Virtual,
    category: `virtual`,
    tags: [
      TypeTags.TypeVirtual,
      ...(t.virtual_colors ?? []),
      TypeTags.FunctionBlast,
    ],
    hidden: [TypeHidden.Inventory],
  });
}

import weapons from "./weapons";
for (const t of weapons) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state,
    category: `weapon_${t.weapon}`,
    tags: [
      TypeTags.TypeWeapon,
      {
        zeecret: TypeTags.TypeWeaponZeeops,
        clan: TypeTags.TypeWeaponClan,
      }[t.weapon],
      ...(t.tags ?? []),
    ],
    hidden: t.hidden ?? [],
  });
}

import zodiacs from "./zodiacs";
for (const t of zodiacs) {
  types.push({
    name: t.name,
    icons: t.icons,
    id: t.id,
    state: t.state,
    category: `zodiac_${t.zodiac}`,
    tags: [
      TypeTags.TypeZodiac,
      {
        western: TypeTags.TypeZodiacWestern,
        chinese: TypeTags.TypeZodiacChinese,
        egyptian: TypeTags.TypeZodiacEgyptian,
      }[t.zodiac],
    ],
    hidden: [TypeHidden.Inventory],
  });
}
