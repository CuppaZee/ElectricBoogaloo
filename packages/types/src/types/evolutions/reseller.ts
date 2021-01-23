import { PointsInterface, TypeHidden, TypeID, TypeMeta, TypeState, TypeTags } from "../../munzee";

const reseller: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  stage?: number;
  base?: string;

  meta?: TypeMeta;
  alt_icons?: string[];
  points?: PointsInterface;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
}[] = [
  {
    name: "Coin",
    icon: "coin",
    id: 1055,
    state: TypeState.Physical,
    stage: 1,
    base: "coin",
  },
  {
    name: "Bag of Coins",
    icon: "bagofcoins",
    id: 1056,
    state: TypeState.Physical,
    stage: 2,
    base: "coin",
  },
  {
    name: "Treasure Chest",
    icon: "treasurechest",
    id: 1057,
    state: TypeState.Physical,
    stage: 3,
    base: "coin",
  },
];

export default reseller;
