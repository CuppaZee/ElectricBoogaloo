import { TypeHidden, TypeQuery, TypeMeta, TypeTags } from "@cuppazee/db";

const mechz: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  duration?: number;
  tags?: TypeTags[];
  lands_on: TypeQuery[];
  meta?: TypeMeta;
  hidden?: TypeHidden[];
}[] = [
  {
    name: "Spyderbot",
    icons: ["spyderbot"],
    id: "spyderbot",
    munzee_id: 2589,
    lands_on: [],
  },
  {
    name: "Squashed Spyderbot",
    icons: ["squashedspyderbot"],
    id: "squashedspyderbot",
    lands_on: [],
    hidden: [TypeHidden.Bouncers],
  },
  {
    name: "L.A.S.E.R. Shark",
    icons: ["lasershark"],
    id: "lasershark",
    munzee_id: 2875,
    lands_on: [
      type => type.has_tag(TypeTags.TypeMysteryElemental),
      type => type.has_tag(TypeTags.TypeWeaponZeeops),
    ],
  },
  {
    name: "Golden L.A.S.E.R. Shark",
    icons: ["goldenlasershark"],
    id: "goldenlasershark",
    lands_on: [
      type => type.has_tag(TypeTags.TypeMysteryElemental),
      type => type.has_tag(TypeTags.TypeWeaponZeeops),
      "premium",
    ],
  },
  {
    name: "Arctic L.A.S.E.R. Shark",
    icons: ["arcticlasershark"],
    id: "arcticlasershark",
    lands_on: [
      type => type.has_tag(TypeTags.TypeMysteryElemental),
      type => type.has_tag(TypeTags.TypeWeaponZeeops),
      "joystick",
      "joystick_virtual",
    ],
  },
  {
    name: "GeoLoggers RUMBot",
    icons: ["geologgersrumbot"],
    id: "geologgersrumbot",
    lands_on: [
      "munzee",
      type => type.has_tag(TypeTags.TypeReseller),
      type => type.meta.evolution_base === "coin",
      type => type.has_tag(TypeTags.TypeVirtual),
      "skyland",
      "treehouse",
    ],
  },
  {
    name: "Gold'n Coins RUMBot",
    icons: ["gold'ncoinsrumbot"],
    id: "gold'ncoinsrumbot",
    lands_on: [
      "munzee",
      type => type.has_tag(TypeTags.TypeReseller),
      type => type.meta.evolution_base === "coin",
      type => type.has_tag(TypeTags.TypeVirtual),
      "skyland",
      "treehouse",
    ],
  },
  {
    name: "NEGS RUMBot",
    icons: ["negsrumbot"],
    id: "negsrumbot",
    lands_on: [
      "munzee",
      type => type.has_tag(TypeTags.TypeReseller),
      type => type.meta.evolution_base === "coin",
      type => type.has_tag(TypeTags.TypeVirtual),
      "skyland",
      "treehouse",
    ],
  },
  {
    name: "SCGS RUMBot",
    icons: ["scgsrumbot"],
    id: "scgsrumbot",
    lands_on: [
      "munzee",
      type => type.has_tag(TypeTags.TypeReseller),
      type => type.meta.evolution_base === "coin",
      type => type.has_tag(TypeTags.TypeVirtual),
      "skyland",
      "treehouse",
    ],
  },
  {
    name: "MechaniC4K3",
    icons: ["mechanic4k3"],
    id: "mechanic4k3",
    lands_on: [],
  },
];


export default mechz;