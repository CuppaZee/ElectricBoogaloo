import {
  PointsInterface,
  PointsType,
  TypeHidden,
  TypeID,
  TypeState,
  TypeTags,
} from "../../munzee";

const misc: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  alt_icons?: string[];
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  points?: PointsInterface;
}[] = [
  {
    name: "Greenie",
    icon: "munzee",
    id: 0,
    state: TypeState.Physical,
    alt_icons: ["greenie", "normal", "standard"],
    points: {
      deploy: 19,
      capture: 20,
      capon: 11,
    },
  },
  {
    name: "Premium",
    icon: "premium",
    id: 13,
    state: TypeState.Physical,
    points: {
      deploy: 200,
      capon: 50,
      capture: 50,
    },
  },
  {
    name: "Social",
    icon: "social",
    id: 32,
    state: TypeState.Locationless,
    tags: [TypeTags.TypeSocial],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Event Pin",
    icon: "eventpin",
    id: 60,
    state: TypeState.Physical,
    tags: [TypeTags.TypeEvent, TypeTags.TypeEventStandard],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Trail Munzee",
    icon: "trail",
    id: 190,
    state: TypeState.Physical,
    tags: [TypeTags.TypeTrail],
  },
  {
    name: "Personal Munzee",
    icon: "personalmunzee",
    id: 200,
    state: TypeState.Locationless,
    tags: [TypeTags.TypePersonal],
    points: {
      deploy: 10,
      type: PointsType.Split,
      split: 50,
      min: 10,
    },
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Event Indicator",
    icon: "eventindicator",
    id: 294,
    state: TypeState.Physical,
    tags: [TypeTags.TypeEvent, TypeTags.TypeEventStandard],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Virtual Trail",
    icon: "virtual_trail",
    id: 390,
    state: TypeState.Virtual,
    tags: [TypeTags.TypeTrail],
  },
  {
    name: "Shamrock",
    icon: "shamrock",
    id: 441,
    state: TypeState.Physical,
  },
  {
    name: "Event Trail",
    icon: "eventtrail",
    id: 600,
    tags: [TypeTags.TypeEvent, TypeTags.TypeEventStandard, TypeTags.TypeTrail],
    state: TypeState.Virtual,
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Premium Personal",
    icon: "premiumpersonal",
    id: 1107,
    state: TypeState.Locationless,
    tags: [TypeTags.TypePersonal],
    points: {
      deploy: 25,
      type: PointsType.Split,
      split: 100,
      min: 20,
    },
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Spring Seasonal",
    icon: "springseasonalmunzee",
    id: 1135,
    state: TypeState.Physical,
    tags: [TypeTags.TypeSeasonal],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Summer Seasonal",
    icon: "summerseasonalmunzee",
    id: 1136,
    state: TypeState.Physical,
    tags: [TypeTags.TypeSeasonal],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Fall Seasonal",
    icon: "fallseasonalmunzee",
    id: 1137,
    state: TypeState.Physical,
    tags: [TypeTags.TypeSeasonal],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Winter Seasonal",
    icon: "winterseasonalmunzee",
    id: 1138,
    state: TypeState.Physical,
    tags: [TypeTags.TypeSeasonal],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Seasonal",
    icon: "seasonal",
    id: 1139,
    state: TypeState.Physical,
    tags: [TypeTags.TypeSeasonal],
    hidden: [TypeHidden.Capture, TypeHidden.Deploy],
  },
  {
    name: "Temporary Virtual",
    icon: "temporaryvirtual",
    id: 1245,
    state: TypeState.Virtual,
    alt_icons: ["tempvirt"],
    points: {
      deploy: 30,
      type: PointsType.Split,
      split: 75,
      min: 25,
    },
  },
  {
    name: "QRewzee",
    icon: "qrewzee",
    id: 1880,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory, TypeHidden.Deploy],
  },
  {
    name: "Renovation",
    icon: "renovation",
    id: 2390,
    state: TypeState.Locationless,
    hidden: [TypeHidden.Inventory, TypeHidden.Deploy],
  },
  {
    name: "SleepZee",
    icon: "sleepzee",
    id: 2744,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory, TypeHidden.Deploy],
  },
];

export default misc;