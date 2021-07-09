import { TypeQuery, TypeTags } from "@cuppazee/db/lib";

const flats: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  color: TypeTags;
  flat_type: string;
  lands_on: TypeQuery[];
}[] = [
  {
    name: "Beach Flat Rob",
    icons: ["beachflatrob"],
    id: "beachflatrob",
    munzee_id: 1705,
    color: TypeTags.VirtualColourGreen,
    flat_type: "flatrob",
    lands_on: ["icemystery"],
  },
  {
    name: "Cold Flat Rob",
    icons: ["coldflatrob"],
    id: "coldflatrob",
    munzee_id: 1706,
    color: TypeTags.VirtualColourGreen,
    flat_type: "flatrob",
    lands_on: ["watermystery"],
  },
  {
    name: "Tux Flat Rob",
    icons: ["tuxflatrob"],
    id: "tuxflatrob",
    munzee_id: 1707,
    color: TypeTags.VirtualColourGreen,
    flat_type: "flatrob",
    lands_on: [type => type.has_tag(TypeTags.TypeJewel)],
  },
  {
    name: "Matt'er Up Flat Matt",
    icons: ["matt'erupflatmatt"],
    id: "matt'erupflatmatt",
    munzee_id: 1985,
    color: TypeTags.VirtualColourRed,
    flat_type: "flatmatt",
    lands_on: ["poisports", "diamond"],
  },
  {
    name: "Face-Off Flat Matt",
    icons: ["face-offflatmatt"],
    id: "face-offflatmatt",
    munzee_id: 1986,
    color: TypeTags.VirtualColourRed,
    flat_type: "flatmatt",
    lands_on: ["poisports", "icemystery"],
  },
  {
    name: "Footy Flat Matt",
    icons: ["footyflatmatt"],
    id: "footyflatmatt",
    munzee_id: 1987,
    color: TypeTags.VirtualColourRed,
    flat_type: "flatmatt",
    lands_on: ["poisports", "earthmystery"],
  },
  {
    name: "InternationElles Flat Lou",
    icons: ["internationellesflatlou"],
    id: "internationellesflatlou",
    munzee_id: 2625,
    color: TypeTags.VirtualColourLouPink,
    flat_type: "flatlou",
    lands_on: ["shamrock", "flatrob", "poiairport", "poitransportation", "treehouse", "skyland"],
  },
  {
    name: "Team GB Flat Lou",
    icons: ["teamgbflatlou"],
    id: "teamgbflatlou",
    munzee_id: 2626,
    color: TypeTags.VirtualColourLouPink,
    flat_type: "flatlou",
    lands_on: ["firemystery", "flatrob", "poiairport", "poitransportation", "treehouse", "skyland"],
  },
  {
    name: "Polka Dot Flat Lou",
    icons: ["polkadotflatlou"],
    id: "polkadotflatlou",
    munzee_id: 2627,
    color: TypeTags.VirtualColourLouPink,
    flat_type: "flatlou",
    lands_on: ["pinkdiamond", "flatrob", "poiairport", "poitransportation", "treehouse", "skyland"],
  },
];

export default flats;