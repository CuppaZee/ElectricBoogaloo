import { TypePoints, TypeHidden, TypeMeta, TypeState, TypeTags } from "@cuppazee/db";

const reseller: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  stage?: number;
  base?: string;

  meta?: TypeMeta;
  points?: TypePoints;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
}[] = [
  {
    name: "Coin",
    icons: ["coin"],
    id: "coin",
    munzee_id: 1055,
    state: TypeState.Physical,
    stage: 1,
    base: "coin",
  },
  {
    name: "Bag of Coins",
    icons: ["bagofcoins"],
    id: "bagofcoins",
    munzee_id: 1056,
    state: TypeState.Physical,
    stage: 2,
    base: "coin",
  },
  {
    name: "Treasure Chest",
    icons: ["treasurechest"],
    id: "treasurechest",
    munzee_id: 1057,
    state: TypeState.Physical,
    stage: 3,
    base: "coin",
  },
];

export default reseller;
