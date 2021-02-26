import { TypeID, TypeMeta, TypeTags } from "../../munzee";

const tpobs: {
  name: string;
  icon: string;
  id: TypeID;
  duration?: number;
  alt_icons?: string[];
  tags?: TypeTags[];
  lands_on: TypeID[];
  meta?: TypeMeta;
}[] = [
  {
    name: "Trojan Unicorn",
    icon: "trojanunicorn",
    id: "null_trojanunicorn",
    lands_on: ["mace", "longsword", "battleaxe", "thehammer", "crossbow", "catapult"],
  },
  {
    name: "Spyderbot",
    icon: "spyderbot",
    id: "null_spyderbot",
    lands_on: [],
  },
  {
    name: "L.A.S.E.R. Shark",
    icon: "lasershark",
    id: "null_lasershark",
    lands_on: [
      type => type.has_tag(TypeTags.TypeMysteryElemental),
      type => type.has_tag(TypeTags.TypeWeaponZeeops),
    ],
  },
];


export default tpobs;