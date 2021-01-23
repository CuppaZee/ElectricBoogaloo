import { TypeID, TypeTags } from "../../munzee";

const flats: {
  name: string;
  icon: string;
  id: TypeID;
  color: TypeTags;
  flat_type: TypeID;
  lands_on: TypeID[];
}[] = [
  {
    name: "Beach Flat Rob",
    icon: "beachflatrob",
    id: 1705,
    color: TypeTags.VirtualColourGreen,
    flat_type: "flatrob",
    lands_on: ["icemystery"],
  },
  {
    name: "Cold Flat Rob",
    icon: "coldflatrob",
    id: 1706,
    color: TypeTags.VirtualColourGreen,
    flat_type: "flatrob",
    lands_on: ["watermystery"],
  },
  {
    name: "Tux Flat Rob",
    icon: "tuxflatrob",
    id: 1707,
    color: TypeTags.VirtualColourGreen,
    flat_type: "flatrob",
    lands_on: [(type) => type.has_tag(TypeTags.TypeJewel)],
  },
  {
    name: "Matt'er Up Flat Matt",
    icon: "matt'erupflatmatt",
    id: 1985,
    color: TypeTags.VirtualColourRed,
    flat_type: "flatmatt",
    lands_on: ["poisports", "diamond"],
  },
  {
    name: "Face-Off Flat Matt",
    icon: "face-offflatmatt",
    id: 1986,
    color: TypeTags.VirtualColourRed,
    flat_type: "flatmatt",
    lands_on: ["poisports", "icemystery"],
  },
  {
    name: "Footy Flat Matt",
    icon: "footyflatmatt",
    id: 1987,
    color: TypeTags.VirtualColourRed,
    flat_type: "flatmatt",
    lands_on: ["poisports", "earthmystery"],
  },
  {
    name: "InternationElles Flat Lou",
    icon: "internationellesflatlou",
    id: "null_iflatlou",
    color: TypeTags.VirtualColourLouPink,
    flat_type: "flatlou",
    lands_on: [
      "shamrock",
      "flatrob",
      "poiairport",
      "poitransportation",
      "treehouse",
      "skyland",
    ],
  },
  {
    name: "Team GB Flat Lou",
    icon: "teamgbflatlou",
    id: "null_gbflatlou",
    color: TypeTags.VirtualColourLouPink,
    flat_type: "flatlou",
    lands_on: [
      "firemystery",
      "flatrob",
      "poiairport",
      "poitransportation",
      "treehouse",
      "skyland",
    ],
  },
  {
    name: "Polka Dot Flat Lou",
    icon: "polkadotflatlou",
    id: "null_pflatlou",
    color: TypeTags.VirtualColourLouPink,
    flat_type: "flatlou",
    lands_on: [
      "pinkdiamond",
      "flatrob",
      "poiairport",
      "poitransportation",
      "treehouse",
      "skyland",
    ],
  },
];

export default flats;