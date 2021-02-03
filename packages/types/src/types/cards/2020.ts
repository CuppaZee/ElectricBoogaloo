import {
  PointsInterface,
  TypeHidden,
  TypeID,
  TypeMeta,
  TypeState,
  TypeTags,
} from "../../munzee";

const c2020: {
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
    name: "Earth Day Card 1",
    icon: "earthdaycard1",
    id: 2422,
  },
  {
    name: "Earth Day Card 2",
    icon: "earthdaycard2",
    id: 2423,
  },
  {
    name: "Earth Day Card 3",
    icon: "earthdaycard3",
    id: 2424,
  },
  {
    name: "Stay Home Card",
    icon: "stayhomecard",
    id: 2425,
  },
  {
    name: "Hammercorn Card",
    icon: "hammercorncard",
    id: 2430,
  },
  {
    name: "Clan War Card",
    icon: "clanwarcard",
    id: 2431,
  },
  {
    name: "World Laughter Day Card",
    icon: "worldlaughterdaycard",
    id: 2433,
  },
  {
    name: "Safe Travels Card",
    icon: "safetravelscard",
    id: 2451,
  },
  {
    name: "May Flowers Card",
    icon: "mayflowerscard",
    id: 2500,
  },
  {
    name: "World Ocean Day Card",
    icon: "worldoceandaycard",
    id: "null_worldoceandaycard",
  },
  {
    name: "Couch Potato Card",
    icon: "couch_potato_card",
    id: "null_eventcard",
    alt_icons: ["couchpotatocard"],
  },
  {
    name: "FrEEZ Flag Card",
    icon: "freezflagcard",
    id: "null_freezflagcard",
    alt_icons: ["freez_flag_card"],
  },
  {
    name: "Camp Munzee Card",
    icon: "campmunzeecard",
    id: "null_campmunzeecard",
    alt_icons: ["camp_munzee_card"],
  },
  {
    name: "Self Destruct Card",
    icon: "selfdestructcard",
    id: "null_selfdestructcard",
  },
  {
    name: "Halloween Card",
    icon: "halloweencard",
    id: "null_halloweencard",
  },
  {
    name: "Kill Them with Kindness Card",
    icon: "killthemwithkindnesscard",
    id: "null_killthemwithkindnesscard",
  },
];

export default c2020;