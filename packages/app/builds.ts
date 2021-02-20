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
    features: [
      {
        title: "Changes Card",
        description: "Added a new Changes Card to the Dashboard",
      },
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
  {
    build: 3,
    date: "2021-02-19",
    features: [
      {
        title: "User Clan Progress",
        description:
          "The Clan Progress page is now available in CuppaZee V2, allowing people who haven't signed up to a clan to view their progress towards Clan Requirements!",
      },
    ],
    improvements: [
      {
        description:
          "Redesigned the ZeeOps Overview to fix the Reward Counter and make it clearer when you've collected your rewards.",
        thanks: "PelicanRouge",
      },
    ],
  },
  {
    build: 4,
    date: "2021-02-19",
    features: [
      {
        title: "Universal Capper",
        description:
          "The Universal Capper is now available in CuppaZee V2, allowing you to quickly and easily capture Universal and Social Munzees, and share your own with the world!",
      },
    ],
    improvements: [
      {
        description: "Added User Challenges to the Sidebar",
      },
    ],
  },
  {
    build: 5,
    date: "2021-02-19",
    features: [
      {
        title: "Blast Checker",
        description:
          "The Blast Checker has now been brought to CuppaZee V2, bringing the ability to check what you'd get (approximately) if you did a Mini, Normal or MEGA blast in a specific location!",
      },
    ],
    fixes: [
      {
        description: "Fixed the Universal Capper when all Universals have already been captured",
        thanks: "Obi-Cal",
      },
    ],
  },
  {
    build: 6,
    date: "2021-02-19",
    features: [
      {
        title: "QRew Checker",
        description:
          "The QRew Checker has returned, with an improved design, better accuracy, lower error rates and faster loading times!",
      },
      {
        title: "Donate Page",
        description: "A page with information on donating has been added to the app.",
      },
    ],
  },
  {
    build: 7,
    date: "2021-02-20",
    fixes: [
      {
        description:
          "Fixed the MHQ time parsing function, correcting the times displayed in the Inventory",
        thanks: "HiTechMD and Noisette",
      },
      {
        description: "Fixed display overflowing on User Activity Filters popup",
        thanks: "mandello",
      },
    ],
  },
];

export default builds;