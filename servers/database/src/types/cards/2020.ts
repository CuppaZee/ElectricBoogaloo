import {
  TypePoints,
  TypeHidden,
  TypeQuery,
  TypeMeta,
  TypeState,
  TypeTags,
} from "@cuppazee/db";

const c2020: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  duration?: number;
  lands_on?: TypeQuery[];
  meta?: TypeMeta;
  state?: TypeState;
  points?: TypePoints;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
}[] = [
  {
    name: "Earth Day Card 1",
    icons: ["earthdaycard1"],
    id: "earthdaycard1",
    munzee_id: 2422,
  },
  {
    name: "Earth Day Card 2",
    icons: ["earthdaycard2"],
    id: "earthdaycard2",
    munzee_id: 2423,
  },
  {
    name: "Earth Day Card 3",
    icons: ["earthdaycard3"],
    id: "earthdaycard3",
    munzee_id: 2424,
  },
  {
    name: "Stay Home Card",
    icons: ["stayhomecard"],
    id: "stayhomecard",
    munzee_id: 2425,
  },
  {
    name: "Hammercorn Card",
    icons: ["hammercorncard"],
    id: "hammercorncard",
    munzee_id: 2430,
  },
  {
    name: "Clan War Card",
    icons: ["clanwarcard"],
    id: "clanwarcard",
    munzee_id: 2431,
  },
  {
    name: "World Laughter Day Card",
    icons: ["worldlaughterdaycard"],
    id: "worldlaughterdaycard",
    munzee_id: 2433,
  },
  {
    name: "Safe Travels Card",
    icons: ["safetravelscard"],
    id: "safetravelscard",
    munzee_id: 2451,
  },
  {
    name: "May Flowers Card",
    icons: ["mayflowerscard"],
    id: "mayflowerscard",
    munzee_id: 2500,
  },
  {
    name: "World Ocean Day Card",
    icons: ["worldoceandaycard"],
    id: "worldoceandaycard",
    munzee_id: 2529,
  },
  {
    name: "Couch Potato Card",
    icons: ["couch_potato_card", "couchpotatocard"],
    id: "couch_potato_card",
    munzee_id: 2571,
  },
  {
    name: "FrEEZ Flag Card",
    icons: ["freezflagcard", "freez_flag_card"],
    id: "freezflagcard",
    munzee_id: 2572,
  },
  {
    name: "Camp Munzee Card",
    icons: ["campmunzeecard", "camp_munzee_card"],
    id: "campmunzeecard",
    munzee_id: 2581,
  },
  {
    name: "Self Destruct Card",
    icons: ["selfdestructcard"],
    id: "selfdestructcard",
    munzee_id: 2606,
  },
  {
    name: "Halloween Card",
    icons: ["halloweencard"],
    id: "halloweencard",
    munzee_id: 2623,
  },
  {
    name: "Kill Them with Kindness Card",
    icons: ["killthemwithkindnesscard"],
    id: "killthemwithkindnesscard",
    munzee_id: 2691,
  },
  {
    name: "Christmas Event 2020 Card",
    icons: ["christmasevent2020card"],
    id: "christmasevent2020card",
  },
];

export default c2020;