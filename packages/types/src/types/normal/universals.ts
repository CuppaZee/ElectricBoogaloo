import { TypeID, PointsInterface, TypeTags, PointsType } from "../../munzee";

const universals: {
  name: string;
  icon: string;
  id: TypeID;
  alt_icons?: string[];
  tags?: TypeTags[];
  points?: PointsInterface;
}[] = [
  {
    name: "Universal Bash",
    icon: "universal_bash",
    id: 2588,
    points: {
      deploy: 100,
      type: PointsType.Split,
      split: 50,
      min: 10,
      interval: 5,
    },
  },
];

export default universals;