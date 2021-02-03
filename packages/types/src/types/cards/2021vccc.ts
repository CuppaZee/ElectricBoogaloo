import { PointsInterface, TypeHidden, TypeID, TypeMeta, TypeState, TypeTags } from "../../munzee";

const c2021vccc: {
  name: string;
  icon: string;
  id: TypeID;
  duration?: number;
  lands_on?: TypeID[];
  meta?: TypeMeta;
  state?: TypeState;
  alt_icons?: string[];
  points?: PointsInterface;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
}[] = [
  {
    name: "Valentines Mailbox",
    icon: "valentinesmailbox",
    id: "null_valentinesmailbox",
  },
  {
    name: "Valentine Card",
    icon: "valentinecard",
    id: "null_valentinecard",
  },
  {
    name: "Cherub Card",
    icon: "cherubcard",
    id: "null_cherubcard",
  },
  {
    name: "Teddy Bear Card",
    icon: "teddybearcard",
    id: "null_teddybearcard",
  },
];

export default c2021vccc;
