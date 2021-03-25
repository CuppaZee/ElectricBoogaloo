import { PointsInterface, TypeHidden, TypeID, TypeMeta, TypeState, TypeTags } from "../../munzee";

const c2021: {
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
    name: "Motivational Message Card 1",
    icon: "motivationalmessagecard1",
    id: 2830,
  },
  {
    name: "Motivational Message Card 2",
    icon: "motivationalmessagecard2",
    id: 2831,
  },
  {
    name: "Motivational Message Card 3",
    icon: "motivationalmessagecard3",
    id: 2832,
  },
  {
    name: "Motivational Message Card 4",
    icon: "motivationalmessagecard4",
    id: 2833,
  },
  {
    name: "Green Cheers Card",
    icon: "greencheerscard",
    id: "null_greencheerscard",
  },
  {
    name: "Kiss Me I'm Irish Card",
    icon: "kissmeimirishcard",
    id: "null_kissmeimirishcard",
  },
  {
    name: "Lucky Charm Card",
    icon: "luckycharmcard",
    id: "null_luckycharmcard",
  },
];

export default c2021;
