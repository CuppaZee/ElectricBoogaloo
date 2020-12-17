import {
  PointsInterface,
  TypeHidden,
  TypeID,
  TypeInterface,
  TypeMeta,
  TypeState,
  TypeTags,
} from "../../munzee";

export default [
  {
    name: "Halloween 2015",
    id: "halloween20152015",
    starts: "2015-00-00T00:00:00-05:00",
    ends: "2015-00-00T00:00:00-05:00",
    specials: [
      {
        name: "Frankenstein Body",
        icon: "frankensteinbody",
        id: 357,
        duration: 12,
        lands_on: ["munzee"],
      },
      {
        name: "Frankenstein Arm",
        icon: "frankensteinarm",
        id: 355,
        duration: 12,
        lands_on: ["munzee"],
      },
      {
        name: "Frankenstein Head",
        icon: "frankensteinhead",
        id: 358,
        duration: 12,
        lands_on: ["munzee"],
      },
      {
        name: "Frankenstein Leg",
        icon: "frankensteinleg",
        id: 356,
        duration: 12,
        lands_on: ["munzee"],
      },
      {
        name: "Creepy Bag",
        icon: "creepybag",
        id: 354,
        duration: 12,
        lands_on: ["munzee"],
      },
    ],
  },
  {
    name: "Back to the Future Day [2015]",
    id: "backto the future day [2015]2015",
    starts: "2015-00-00T00:00:00-05:00",
    ends: "2015-00-00T00:00:00-05:00",
    specials: [
      {
        name: "Back to the Future Day",
        icon: "backtothefutureday",
        id: 346,
        duration: 12,
        lands_on: ["munzee"],
      },
    ],
  },
  {
    name: "4th Birthday [2015]",
    id: "4thbirthday [2015]2015",
    starts: "2015-00-00T00:00:00-05:00",
    ends: "2015-00-00T00:00:00-05:00",
    specials: [
      {
        name: "4th Birthday",
        icon: "4thbirthday",
        id: 265,
        duration: 12,
        lands_on: ["munzee"],
      },
      {
        name: "4th Birthday Cake Strawberry",
        icon: "4thbirthdaycakestrawberry",
        id: 268,
        duration: 12,
        lands_on: ["munzee"],
      },
      {
        name: "4th Birthday Cake Vanilla",
        icon: "4thbirthdaycakevanilla",
        id: 269,
        duration: 12,
        lands_on: ["munzee"],
      },
      {
        name: "4th Birthday Cake Turtle",
        icon: "4thbirthdaycaketurtle",
        id: 266,
        duration: 12,
        lands_on: ["munzee"],
      },
      {
        name: "4th Birthday Cake Chocolate",
        icon: "4thbirthdaycakechocolate",
        id: 267,
        duration: 12,
        lands_on: ["munzee"],
      },
    ],
  },
  {
    name: "May Flowers [2015]",
    id: "mayflowers [2015]2015",
    starts: "2015-00-00T00:00:00-05:00",
    ends: "2015-00-00T00:00:00-05:00",
    specials: [
      {
        name: "May Flowers",
        icon: "mayflowers",
        id: 234,
        duration: 12,
        lands_on: ["munzee"],
      },
    ],
  },
  {
    name: "April Fool's Day 2015",
    id: "aprilfool's day 20152015",
    starts: "2015-00-00T00:00:00-05:00",
    ends: "2015-00-00T00:00:00-05:00",
    specials: [
      {
        name: "Sillyman",
        icon: "sillyman",
        id: 220,
        duration: 12,
        lands_on: ["munzee"],
      },
    ],
  },
  {
    name: "Texas Independence Day [2015]",
    id: "texasindependence day [2015]2015",
    starts: "2015-00-00T00:00:00-05:00",
    ends: "2015-00-00T00:00:00-05:00",
    specials: [
      {
        name: "Texas Independence",
        icon: "texasindependence",
        id: 206,
        duration: 12,
        lands_on: ["munzee"],
      },
    ],
  },
  {
    name: "EventZee Specials [2015]",
    id: "eventzeespecials [2015]2015",
    starts: "2015-00-00T00:00:00-05:00",
    ends: "2015-00-00T00:00:00-05:00",
    specials: [
      {
        name: "EventZee",
        icon: "eventzee",
        id: 202,
        duration: 12,
        lands_on: ["munzee"],
      },
    ],
  },
] as {
  name: string;
  id: string;
  starts: string;
  ends: string;
  specials?: {
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
  }[];
  types?: Partial<TypeInterface>[];
}[];
