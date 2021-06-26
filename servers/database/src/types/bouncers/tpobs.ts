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
];


export default tpobs;