import { TypeHidden, TypeQuery, TypeMeta, TypeTags } from "@cuppazee/db";

const tpobs: {
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
    name: "Trojan Unicorn",
    icons: ["trojanunicorn"],
    id: "trojanunicorn",
    munzee_id: 2502,
    lands_on: ["mace", "longsword", "battleaxe", "thehammer", "crossbow", "catapult"],
  },
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
];


export default tpobs;