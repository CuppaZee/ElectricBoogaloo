import { Type } from "@cuppazee/types";

export interface Types {
  title?: string;
  description?: string;
  categories?: string[];
  types?: string[];
  function?: () => Type[];
}

export interface Feature {
  title: string;
  description: string;
  image?: string;
  thanks?: string;
}

export interface Improvement {
  description: string;
  thanks?: string;
}

export interface BugFix {
  description: string;
  thanks?: string;
}

export interface Build {
  build: number;
  date: string;
  description?: string;
  types?: Types[];
  fixes?: BugFix[];
  improvements?: Improvement[];
  features?: Feature[];
}

const builds: Build[] = [
  {
    build: 1,
    date: "2021-02-18",
    // description: "Welcome to CuppaZee!",
    // types: [
    //   {
    //     title: "Laser Shark",
    //     types: ["lasershark"],
    //   },
    // ],
    features: [
      {
        title: "Changes Card",
        description: "Added a new Changes Card to the Dashboard",
      },
      // {
      //   title: "Clan Progress",
      //   description:
      //     "The Clan Progress page is now available in CuppaZee V2, allowing people who haven't signed up to a clan to view their progress!",
      // },
    ],
    improvements: [
      {
        description: "Improved the reliability of the Dashboard on Web and Android",
        thanks: "PelicanRouge",
      },
      {
        description:
          "Reworked CuppaZee's Icon server, allowing more icons to show on the Inventory page to reduce data usage",
      },
    ],
    fixes: [
      {
        description: "Fixed Scrolling on User Activity Filters Popup",
        thanks: "Citygalbex, HiTechMD and mandello",
      },
      {
        description: "Fixed Icon for Greenie (and a few other types)",
        thanks: "c-bn",
      },
    ],
  },
  {
    build: 2,
    date: "2021-02-19",
    features: [
      {
        title: "User Challenges",
        description:
          "CuppaZee's Challenges section has been brought to CuppaZee V2, with a new design and more challenges!",
        thanks: "LympstoneBigtrotters, c-bn, IanZ, MamaDuck71 and CzPeet",
      },
    ],
    improvements: [
      {
        description:
          "Redesigned the Nearby Specials Page in order to provide more detail in a more compact view",
        thanks: "EmileP68 and sverlaan",
      },
    ],
  },
];

export default builds;