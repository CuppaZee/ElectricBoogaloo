import { TypeID, PointsInterface, TypeTags, PointsType } from "../../munzee";

export default [
  {
    name: "Universal Bash",
    icon: "universal_bash",
    id: "null_universalbash",
    points: {
      deploy: 100,
      type: PointsType.Split,
      split: 50,
      min: 10,
      interval: 5,
    },
  },
] as {
  name: string;
  icon: string;
  id: TypeID;
  alt_icons?: string[];
  tags?: TypeTags[];
  points?: PointsInterface;
}[];
