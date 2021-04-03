import db, { Type, TypeState, TypeTags } from "@cuppazee/types";

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
  avatars?: string[];
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
  {
    build: 8,
    date: "2021-02-20",
    features: [
      {
        title: "User Profile",
        description:
          "Added the User Profile page, allowing you to now search for users to access their activity, stats, etc, as well as tap on users on Clan Stats.",
      },
    ],
    improvements: [
      {
        description: "Moved some items to under a Tools dropdown on the Dashboard User Cards",
      },
    ],
    fixes: [
      {
        description: "Stopped Cap-ons counting towards Challenges",
        thanks: "c-bn and Noisette",
      },
    ],
  },
  {
    build: 9,
    date: "2021-02-20",
    features: [
      {
        title: "Bouncer Maps",
        description:
          "Bouncer Maps have now returned with much better performance! Head to the Bouncers section of the App and tap on a Munzee or the Map Icon next to a category name!",
      },
    ],
    improvements: [
      {
        description:
          "Replaced the message that displayed when you'd completed a week of ZeeOps with a clearer design",
        thanks: "Citygalbex",
      },
    ],
  },
  {
    build: 10,
    date: "2021-02-20",
    improvements: [
      {
        description: "Added settings for the User Inventory",
        thanks: "PelicanRouge",
      },
      {
        description:
          "Moved some items (eg. Evolutions, Virtuals, Jewel Shards, Destination Credits) into more appropriate categories",
        thanks: "PelicanRouge and jnorval",
      },
    ],
    fixes: [
      {
        description: "Adjusted Icon Size on Maps to scale for devices with different pixel ratios",
      },
    ],
  },
  {
    build: 11,
    date: "2021-02-20",
    improvements: [
      {
        description: "Added Countdown to next month's Clan Requirements release",
      },
      {
        description: "Increased Icon Size on Maps for easier viewing",
      },
      {
        description: "Removed various debug information from the app",
      },
    ],
    fixes: [
      {
        description: "Fixed data displayed on Clan Rewards table",
      },
    ],
  },
  {
    build: 12,
    date: "2021-02-20",
    features: [
      {
        title: "Munzee Details",
        description:
          "You can now tap on a Munzee in most places in the app to view details about it!",
      },
    ],
    improvements: [
      {
        description: "Fixed the Activity displayed on the profile page.",
        thanks: "TSwag",
      },
    ],
  },
  {
    build: 13,
    date: "2021-02-20",
    improvements: [
      {
        description: "Added some additional tips and hints to the app",
        thanks: "Barrowman1",
      },
    ],
    fixes: [
      {
        description:
          'Removed the "Bookmarked Clans" button from the Dashboard when no clans are bookmarked.',
      },
      {
        description: "Fixed colour labels not displaying on mobile in Personalisation settings.",
      },
    ],
  },
  {
    build: 14,
    date: "2021-02-20",
    improvements: [
      {
        description: 'Added "Clan Requirements" button to Clans Card on Dashboard',
        thanks: "Barrowman1",
      },
    ],
  },
  {
    build: 15,
    date: "2021-02-20",
    improvements: [
      {
        description: "Fixed the Static Location editor popup",
      },
    ],
  },
  {
    build: 16,
    date: "2021-02-22",
    improvements: [
      {
        description: "Text on Clan Stats is now bold for rows with Bookmarked Users",
        thanks: "Oddleif65",
      },
      {
        description: "Clan Progress now redirects to Clan Stats for people not in a clan",
      },
    ],
    fixes: [
      {
        description: "Fixed Text Centring on Clan Stats",
      },
      {
        description: "Fixed Arrow Icon colour on Bookmarks Settings in Dark Mode",
      },
    ],
  },
  {
    build: 17,
    date: "2021-02-23",
    improvements: [
      {
        description: "Added a link to nzseries1's POI Planner",
        thanks: "nzseries1",
      },
      {
        description: 'Separated deploys on User Activity into "Deploys" and "Passive Deploys".',
      },
    ],
  },
  {
    build: 18,
    date: "2021-02-23",
    fixes: [
      {
        description:
          "Fixed display of bouncers captured inside a Skyland/Treehouse on User Activity Overview",
      },
    ],
    types: [
      {
        title: "L.A.S.E.R. Shark",
        description: "Complete a Secret ZeeOp to get one of these robotic creatures!",
        types: ["lasershark"],
      },
      {
        title: "Virtual Resellers",
        description: "Available now from SCGS, NEGS, Gold'n Coins and GeoLoggers!",
        types: [
          ...db.types.filter(
            i => i.has_tag(TypeTags.TypeReseller) && i.state === TypeState.Virtual
          ),
        ].map(i => i.icon),
      },
    ],
  },
  {
    build: 19,
    date: "2021-02-24",
    fixes: [
      {
        description: "Fixed some bouncers not being included on Challenges page",
        thanks: "Barrowman1",
      },
    ],
  },
  {
    build: 20,
    date: "2021-02-24",
    features: [
      {
        title: "Evo Planner",
        description:
          "A revamped Evolution Planner is now available on CuppaZee V2. As well as having all existing functionality, the new Evolution Planner allows you to more easily figure out when to deploy an evolution to make it evolve on a specific date.",
      },
    ],
  },
  {
    build: 21,
    date: "2021-02-27",
    improvements: [
      {
        description: "Replaced the icons for Bouncers and Seasonal Specials categories.",
      },
      {
        description:
          "Prepared for March 2021 Clan Requirements release - View a countdown to their launch under Clan Requirements > March 2021",
      },
    ],
    types: [
      {
        title: "Flat DHS",
        description:
          "The first Flat Object, Dylan's Flat DHS! Available now in the Freeze Tag Store!",
        types: ["flatdhs"],
      },
      {
        title: "Women's History Month",
        description: "Head out and find these pioneering women bouncing near you!",
        types: [
          ...db.types.filter(
            i =>
              i.category?.id === "seasonal_2021_womens-history-month" &&
              !i.has_tag(TypeTags.Scatter)
          ),
        ].map(i => i.icon),
      },
      {
        description: "Each bouncer scatters out up to 3 of their respective scatters nearby!",
        types: [
          ...db.types.filter(
            i =>
              i.category?.id === "seasonal_2021_womens-history-month" && i.has_tag(TypeTags.Scatter)
          ),
        ].map(i => i.icon),
      },
    ],
  },
  {
    build: 22,
    date: "2021-02-27",
    types: [
      {
        title: "Basketball Garden Gnome",
        description: "The new Garden Gnome skin has been announced for March!",
        types: ["basketballgardengnome", "gnomenogginnet"],
      },
    ],
  },
  {
    build: 23,
    date: "2021-03-01",
    types: [
      {
        title: "Bees!",
        description: "These new buzzing evo bouncers are now available in the MunzPak!",
        types: [
          "bee",
          "beeeggs",
          "beelarvae",
          "beepupae",
          "emptyhoneycomb",
          "honeybee",
          "queenbee",
          "wallabee",
        ],
      },
      {
        title: "More Egyptian Zodiacs",
        description: "CuppaZee now has the Amon-Ra and Osiris egyptian zodiacs in its database!",
        types: ["amon-ra", "osiris"],
      },
    ],
    improvements: [
      {
        description: "The Beevolution Planner now allows you to plan out Bee Evolutions!",
      },
    ],
  },
  {
    build: 24,
    date: "2021-03-02",
    features: [
      {
        title: "New Settings System",
        description:
          "A brand new modular Settings system is now being used in CuppaZee, increasing speed across the app",
      },
    ],
    improvements: [
      {
        description:
          "Removed unnecessary Clan Rewards request from Clan Progress, Clan Stats and Bookmarked Clans pages",
      },
      {
        description: "Various speed and caching improvements across the app",
      },
    ],
  },
  {
    build: 25,
    date: "2021-03-03",
    features: [
      {
        title: "Munzee Types",
        description: "The Munzee Types section of CuppaZee has now been brought to CuppaZee V2!",
      },
    ],
    improvements: [
      {
        description: "Added meta for new Clan Requirements",
      },
    ],
  },
  {
    build: 26,
    date: "2021-03-04",
    types: [
      {
        title: "Reseller Garden Gnomes!",
        description: "These new gnomes are available exclusively at the 4 resellers!",
        types: [
          "aussieexplorergardengnome",
          "goldminergardengnome",
          "queen'sguardsmangardengnome",
          "astronautgardengnome",
          "gnomeminerhat",
          "gnomeexplorerhat",
          "gnomebearskinhat",
          "gnomeastronauthelmet",
        ],
      },
    ],
  },
  {
    build: 27,
    date: "2021-03-06",
    features: [
      {
        title: "Full Translation System!",
        description:
          "After many hours of work, I've now got a full translation system implemented in CuppaZee V2, so we're closer to release than ever! English (UK), English (US), Emojis and Nederlands are the 4 languages available at launch.",
      },
      {
        title: "🇳🇱 Dutch Translations!",
        description:
          "Thanks to the amazing sverlaan, CuppaZee V2 is now near-fully translated to Dutch! You can switch to this language in the Personalisation Settings now!",
        avatars: ["https://munzee.global.ssl.fastly.net/images/avatars/ua2ts8.png"],
      },
    ],
  },
  {
    build: 28,
    date: "2021-03-06",
    features: [
      {
        title: "🇫🇮 Finnish Translations!",
        description:
          "Thanks to stebu, CuppaZee V2 is now near-fully translated to Finnish! You can switch to this language in the Personalisation Settings now!",
        avatars: ["https://munzee.global.ssl.fastly.net/images/avatars/ua1gpu.png"],
      },
      {
        title: "🇩🇪 German Translations!",
        description:
          "Thanks to Bungi, CuppaZee V2 is now near-fully translated to German! You can switch to this language in the Personalisation Settings now!",
        avatars: ["https://munzee.global.ssl.fastly.net/images/avatars/ua3uc5.png"],
      },
    ],
  },
  {
    build: 29,
    date: "2021-03-08",
    fixes: [
      {
        description: "Fixed Points not displaying on the User Profile page",
        thanks: "HiTechMD",
      },
      {
        description: "Fixed Bouncer Hosts not showing on Bouncer Captures page",
      },
      {
        description: "Fixed Evo Bouncers not showing on Bouncers page",
      },
      {
        description: "Fixed searching for Munzee Types and Categories",
      },
      {
        description: "Fixed location of Christmas 2020 Scatters",
      },
    ],
    improvements: [
      {
        description:
          "Removed Greenies and Destination Rooms from Normal Captures page as they always show 0",
      },
    ],
  },
  {
    build: 30,
    date: "2021-03-08",
    features: [
      {
        title: "POI/Destination Planners",
        description:
          "CuppaZee now has POI and Destination planners available (in early beta, expect bugs)! Try them out now!",
      },
    ],
  },
  {
    build: 31,
    date: "2021-03-09",
    improvements: [
      {
        description: "Improved reliability and functionality of POI and Destination planners",
      },
    ],
  },
  {
    build: 32,
    date: "2021-03-10",
    features: [
      {
        title: "Bouncing Soon",
        description: "Find bouncers that are about to bounce! Search by type or player!",
      },
    ],
  },
  {
    build: 33,
    date: "2021-03-12",
    features: [
      {
        title: "Tappable Notifications",
        description:
          "You can now tap on Bouncer notifications to view details on the Munzee, and on Blog notifications to read the blog post. Please be aware that this currently doesn't work when tapping on a notification on iOS when the app is killed, due to an issue with one of CuppaZee's dependencies. This issue will be resolved in a future update.",
      },
    ],
    improvements: [
      {
        description:
          "Reworked system for loading icon symbols to allow for faster loading times and to allow notifications to be tappable.",
      },
    ],
  },
  {
    build: 34,
    date: "2021-03-13",
    improvements: [
      {
        description: "Improved configuration settings for Live Location for lower battery drain",
      },
      {
        description: "Added better error handling for Live Location settings",
      },
      {
        description: "Improved app loading times",
      },
    ],
  },
  {
    build: 35,
    date: "2021-03-13",
    improvements: [
      {
        description: "User Activity/ZeeOps data now starts loading sooner on the dashboard",
      },
    ],
  },
  {
    build: 36,
    date: "2021-03-13",
    improvements: [
      {
        description: "Improved swiping between Dashboard cards on mobile devices",
      },
    ],
  },
  {
    build: 37,
    date: "2021-03-15",
    improvements: [
      {
        description: "Reworked navigation system with better Back Button functionality",
      },
      {
        description: "Reworked User Activity Overview to support filtering and improve performance",
      },
      {
        description: "Added Dashboard button to Header",
      },
      {
        description: "Prepared for release of native Live Location module",
      },
      {
        description: "Fixed issues with Icon flashing",
      },
    ],
  },
  {
    build: 38,
    date: "2021-03-15",
    fixes: [
      {
        description: "Fixed issue with Dashboard Card loading",
      },
      {
        description:
          "Fixed crash on iOS when opening or closing the sidebar with a swipe gesture, or tapping on the background to close the sidebar",
      },
    ],
  },
  {
    build: 39,
    date: "2021-03-16",
    improvements: [
      {
        description: "Added Tools card to the Dashboard",
      },
      {
        description: "Made the sidebar collapsible on Tablets/Desktop",
      },
    ],
  },
  {
    build: 40,
    date: "2021-03-16",
    fixes: [
      {
        description:
          "Fixed issues with User Activity Filter modal covering Safe Areas on some android devices",
      },
    ],
  },
  {
    build: 41,
    date: "2021-03-18",
    improvements: [
      {
        description: "Improved handling of new updates after app installation",
      },
      {
        description: "Added an Easy-Access Subtract View toggle to Clan Stats Cards",
      },
    ],
  },
  {
    build: 42,
    date: "2021-03-18",
    features: [
      {
        title: "New Bouncer Notifications for Android",
        description: `Build 2.0.2 Only. You will need to download this update from Google Play to access this function. Once you've downloaded this update, hit "Save Settings" in the Notification Settings page to activate icons and addresses on Bouncer Notifications!`,
      },
    ],
  },
  {
    build: 43,
    date: "2021-03-19",
    improvements: [
      {
        description: `Added "Report to CuppaZee" button for errors on the Notification Settings page`,
      },
    ],
    fixes: [
      {
        description: `Fixed dropdown icons not displaying in the sidebar`,
        thanks: "PelicanRouge",
      },
    ],
  },
  {
    build: 44,
    date: "2021-03-20",
    improvements: [
      {
        description: `Added theme-based styles for maps in Dark Mode`,
      },
      {
        description: `Added Dark Mode maps on iOS and Android`,
      },
    ],
  },
  {
    build: 45,
    date: "2021-03-22",
    improvements: [
      {
        description: "Added Capture Distance circles to POI and Destination Planner",
        thanks: "nuttynan",
      },
    ],
    fixes: [
      {
        description: "Fixed Crash with Login Page on Android",
      },
      {
        description: "Reverted to old Live Location module on Android",
      },
    ],
  },
  {
    build: 46,
    date: "2021-03-22",
    improvements: [
      {
        description: "Reworked Dashboard for Performance Improvements",
      },
      {
        description: "Improved Performance across the app",
      },
      {
        description: "Improved Page Load Performance",
      },
    ],
  },
  {
    build: 47,
    date: "2021-03-22",
    fixes: [
      {
        description: "Fixed crash on Mobile Device",
      },
      {
        description: "Fixed error when enabling Live Location on iOS",
      },
    ],
  },
  {
    build: 48,
    date: "2021-03-22",
    improvements: [
      {
        description:
          "Added Clan Personalisation popup to make the settings more obvious to new users",
      },
      {
        description: "Improved Dashboard performance when loading",
      },
    ],
  },
  {
    build: 49,
    date: "2021-03-24",
    features: [
      {
        title: "Custom Themes",
        description: "You can now make some custom themes.",
      },
    ],
    types: [
      {
        title: "Weapon Shards",
        types: ["weaponshards"],
      },
      {
        title: "Zee Folk",
        types: ["zeefolk"],
      },
      {
        title: "Virtual Shamrocks",
        types: ["virtualshamrock", "cloverleaf"],
      },
      {
        title: "St. Patrick's Day Cards",
        types: ["greencheerscard", "kissmeimirishcard", "luckycharmcard"],
      },
      {
        title: "Golden L.A.S.E.R. Shark",
        types: ["goldenlasershark"],
      },
    ],
  },
  {
    build: 50,
    date: "2021-04-01",
    types: [
      {
        title: "April Fools' Day",
        types: db.types
          .filter(i => i.category?.id === "seasonal_2021_april-fools")
          .map(i => i.icon),
      },
      {
        title: "Jack in Zee Box",
        types: db.types
          .filter(i => i.category?.id === "seasonal_2021_jack-in-zee-box")
          .map(i => i.icon),
      },
    ],
  },
  {
    build: 51,
    date: "2021-04-02",
    improvements: [
      {
        description:
          "Manually typed in the requirements for April 2021 to override the April Fools' Day requirements. In the case that Munzee does not revert the April Fools' Day requirements by the beginning of the Clan War, CuppaZee should still display accurate stats for the month.",
      },
    ],
  },
  {
    build: 52,
    date: "2021-04-03",
    types: [
      {
        title: "Baby Animals",
        types: db.types
          .filter(i => i.category?.id === "seasonal_2021_baby-animals")
          .map(i => i.icon),
      },
      {
        title: "Thoth Zodiac and New Artifacts",
        types: ["thoth", "scarabartifact", "eyeofraartifact", "shenartifact"],
      },
      {
        title: "Running Garden Gnome",
        types: ["runninggardengnome", "gnomeheadphones"],
      },
    ],
  },
];

export default builds;
