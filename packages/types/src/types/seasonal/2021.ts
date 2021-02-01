import { SeasonalCategory } from ".";
import { TypeState, TypeTags } from "../../munzee";

const s2021: SeasonalCategory[] = [
  {
    name: "Courier Critters",
    id: "couriercritters2020",
    starts: "2021-02-01T00:00:00-05:00",
    ends: "2021-04-31T23:59:00-05:00",
    pobs: [
      {
        name: "Courier Stork",
        icon: "courierstork",
        id: "null_courierstork",
        lands_on: [],
      },
      {
        name: "Courier Owl",
        icon: "courierowl",
        id: "null_courierowl",
        lands_on: [],
      },
      {
        name: "Courier Pigeon",
        icon: "courierpigeon",
        id: "null_courierpigeon",
        lands_on: [],
      },
    ],
  },
  {
    name: "Special Delivery Cupid",
    id: "specialdeliverycupid2021",
    starts: "2021-02-01T00:00:00-06:00",
    ends: "2021-02-28T23:59:00-06:00",
    pobs: [
      {
        name: "Special Delivery Cupid",
        icon: "specialdeliverycupid",
        id: "null_specialdeliverycupid",
        duration: 5,
        lands_on: [
          "treehouse",
          "skyland",
          "munzee",
          "firemystery",
          "airmystery",
          "poipostoffice",
          type => type.has_tag(TypeTags.TypeVirtual),
          type => type.has_tag(TypeTags.TypeReseller),
          type => type.has_tag(TypeTags.TypeSeasonal),
        ],
      },
    ],
    types: [
      {
        name: "Heart Arrow",
        icon: "heartarrow",
        id: "null_heartarrow",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
    ],
  },
  {
    name: "Buzzle Box",
    id: "buzzlebox2021",
    starts: "2021-01-29T00:00:00-06:00",
    ends: "2021-02-21T23:59:00-06:00",
    specials: [
      {
        name: "Buzzle Box",
        icon: "buzzlebox",
        id: "null_buzzlebox",
        duration: 6,
        lands_on: [
          "munzee",
          "joystick",
          type => type.has_tag(TypeTags.TypeMystery) && type.state === TypeState.Physical,
        ],
      },
    ],
    types: [
      {
        name: "Red Buzzle Piece 1",
        icon: "redbuzzlepiece1",
        id: "null_redbuzzlepiece1",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Red Buzzle Piece 2",
        icon: "redbuzzlepiece2",
        id: "null_redbuzzlepiece2",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Red Buzzle Piece 3",
        icon: "redbuzzlepiece3",
        id: "null_redbuzzlepiece3",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Red Buzzle Piece 4",
        icon: "redbuzzlepiece4",
        id: "null_redbuzzlepiece4",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Green Buzzle Piece 1",
        icon: "greenbuzzlepiece1",
        id: "null_greenbuzzlepiece1",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Green Buzzle Piece 2",
        icon: "greenbuzzlepiece2",
        id: "null_greenbuzzlepiece2",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Green Buzzle Piece 3",
        icon: "greenbuzzlepiece3",
        id: "null_greenbuzzlepiece3",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Green Buzzle Piece 4",
        icon: "greenbuzzlepiece4",
        id: "null_greenbuzzlepiece4",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Yellow Buzzle Piece 1",
        icon: "yellowbuzzlepiece1",
        id: "null_yellowbuzzlepiece1",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Yellow Buzzle Piece 2",
        icon: "yellowbuzzlepiece2",
        id: "null_yellowbuzzlepiece2",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Yellow Buzzle Piece 3",
        icon: "yellowbuzzlepiece3",
        id: "null_yellowbuzzlepiece3",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Yellow Buzzle Piece 4",
        icon: "yellowbuzzlepiece4",
        id: "null_yellowbuzzlepiece4",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
    ],
  },
  {
    name: "Hamilton Hamzee",
    id: "hamiltonhamzee2021",
    starts: "2021-01-21T00:00:00-06:00",
    ends: "2021-03-15T23:59:00-06:00",
    pobs: [
      {
        name: "Hamilton Hamzee",
        icon: "hamiltonhamzee",
        id: "null_hamiltonhamzee",
        duration: 6,
        lands_on: [
          "treehouse",
          "munzee",
          "earthmystery",
          "icemystery",
          type => type.has_tag(TypeTags.TypeSeasonal),
        ],
      },
    ],
  },
  {
    name: "Garden Gnomes",
    id: "gnomes2021",
    starts: "2021-01-01T00:00:00-06:00",
    ends: "2021-12-31T23:59:00-06:00",
    pobs: [
      {
        name: "Garden Gnome",
        icon: "gardengnome",
        id: "null_gardengnome",
        duration: 6,
        lands_on: [type => type.has_tag(TypeTags.TypeVirtual), "munzee"],
      },
      {
        name: "Ice Hockey Garden Gnome",
        icon: "icehockeygardengnome",
        id: "null_icehockeygardengnome",
        duration: 6,
        lands_on: [
          type => type.has_tag(TypeTags.TypeVirtual),
          "munzee",
          "icemystery",
          "treehouse",
          "skyland",
        ],
      },
      {
        name: "Archery Garden Gnome",
        icon: "archerygardengnome",
        id: "null_archerygardengnome",
        duration: 6,
        lands_on: [
          type => type.has_tag(TypeTags.TypeVirtual),
          "munzee",
          "crossbow",
          "treehouse",
          "skyland",
        ],
      },
    ],
    types: [
      {
        name: "Gnome Hockey Helmet",
        icon: "gnomehockeyhelmet",
        id: "null_gnomehockeyhelmet",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
      {
        name: "Gnome Archery Hood",
        icon: "gnomearcheryhood",
        id: "null_gnomearcheryhood",
        state: TypeState.Virtual,
        tags: [TypeTags.ScatterStandalone, TypeTags.Scatter],
        hidden: [],
        meta: {
          scatter_duration: 2,
        },
      },
    ],
  },
];

export default s2021;
