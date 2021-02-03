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
    id: "null_motivationalmessagecard1",
  },
  {
    name: "Motivational Message Card 2",
    icon: "motivationalmessagecard2",
    id: "null_motivationalmessagecard2",
  },
  {
    name: "Motivational Message Card 3",
    icon: "motivationalmessagecard3",
    id: "null_motivationalmessagecard3",
  },
  {
    name: "Motivational Message Card 4",
    icon: "motivationalmessagecard4",
    id: "null_motivationalmessagecard4",
  },
];

export default c2021;
