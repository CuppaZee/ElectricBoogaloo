import { TypePoints, TypeTags, TypePointsType } from "@cuppazee/db";

const universals: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  tags?: TypeTags[];
  points?: TypePoints;
}[] = [
  {
    name: "Universal Bash",
    icons: ["universal_bash"],
    id: "universal_bash",
    munzee_id: 2588,
    points: {
      deploy: 100,
      type: TypePointsType.Split,
      split: 50,
      min: 10,
      interval: 5,
    },
  },
  {
    name: "10th Birthday Universal",
    icons: ["universal_10th_birthday", "10thbirthdayuniversal"],
    id: "10thbirthdayuniversal",
  },
];

export default universals;