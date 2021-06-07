import { TypeHidden, TypeState, TypeTags } from "@cuppazee/db";

const resellers: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  scatter?: boolean;
}[] = [
  {
    name: "Munzee Madness Reseller",
    icons: ["munzeemadnessreseller", "munzeemadness"],
    id: "munzeemadnessreseller",
    munzee_id: 510,
    state: TypeState.Physical,
  },
  {
    name: "GeoStuff Reseller",
    icons: ["geostuffreseller", "geostuff"],
    id: "geostuffreseller",
    munzee_id: 511,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "GeoHobbies Reseller",
    icons: ["geohobbiesreseller", "geohobbies"],
    id: "geohobbiesreseller",
    munzee_id: 512,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "DDCards Reseller",
    icons: ["ddcardsreseller", "ddcards"],
    id: "ddcardsreseller",
    munzee_id: 513,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "NEGS Reseller",
    icons: ["negsreseller", "negs"],
    id: "negsreseller",
    munzee_id: 514,
    state: TypeState.Physical,
  },
  {
    name: "GeoLoggers Reseller",
    icons: ["geologgersreseller", "geologgers"],
    id: "geologgersreseller",
    munzee_id: 515,
    state: TypeState.Physical,
  },
  {
    name: "MM Cocoa Beach Reseller",
    icons: ["mmcocoabeachreseller"],
    id: "mmcocoabeachreseller",
    munzee_id: 516,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Ruja Reseller",
    icons: ["rujareseller"],
    id: "rujareseller",
    munzee_id: 550,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Laupe Reseller",
    icons: ["laupereseller"],
    id: "laupereseller",
    munzee_id: 601,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "SCGS Reseller",
    icons: ["scgsreseller"],
    id: "scgsreseller",
    munzee_id: 696,
    state: TypeState.Physical,
  },
  {
    name: "Virtual SCGS Reseller",
    icons: ["virtualscgsreseller"],
    id: "virtualscgsreseller",
    state: TypeState.Virtual,
  },
  {
    name: "Virtual Gold'n Coins Reseller",
    icons: ["virtualgold'ncoinsreseller"],
    id: "virtualgold'ncoinsreseller",
    state: TypeState.Virtual,
  },
  {
    name: "Virtual NEGS Reseller",
    icons: ["virtualnegsreseller"],
    id: "virtualnegsreseller",
    state: TypeState.Virtual,
  },
  {
    name: "Virtual GeoLoggers Reseller",
    icons: ["virtualgeologgersreseller"],
    id: "virtualgeologgersreseller",
    state: TypeState.Virtual,
  },
];

export default resellers;
