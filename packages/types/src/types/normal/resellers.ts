import { TypeHidden, TypeID, TypeState, TypeTags } from "../../munzee";

const resellers: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  alt_icons?: string[];
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  scatter?: boolean;
}[] = [
  {
    name: "Munzee Madness Reseller",
    icon: "munzeemadnessreseller",
    id: 510,
    state: TypeState.Physical,
    alt_icons: ["munzeemadness"],
  },
  {
    name: "GeoStuff Reseller",
    icon: "geostuffreseller",
    id: 511,
    state: TypeState.Physical,
    alt_icons: ["geostuff"],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "GeoHobbies Reseller",
    icon: "geohobbiesreseller",
    id: 512,
    state: TypeState.Physical,
    alt_icons: ["geohobbies"],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "DDCards Reseller",
    icon: "ddcardsreseller",
    id: 513,
    state: TypeState.Physical,
    alt_icons: ["ddcards"],
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "NEGS Reseller",
    icon: "negsreseller",
    id: 514,
    state: TypeState.Physical,
    alt_icons: ["negs"],
  },
  {
    name: "GeoLoggers Reseller",
    icon: "geologgersreseller",
    id: 515,
    state: TypeState.Physical,
    alt_icons: ["geologgers"],
  },
  {
    name: "MM Cocoa Beach Reseller",
    icon: "mmcocoabeachreseller",
    id: 516,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Ruja Reseller",
    icon: "rujareseller",
    id: 550,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "Laupe Reseller",
    icon: "laupereseller",
    id: 601,
    state: TypeState.Physical,
    hidden: [TypeHidden.Inventory],
  },
  {
    name: "SCGS Reseller",
    icon: "scgsreseller",
    id: 696,
    state: TypeState.Physical,
  },
  {
    name: "Virtual SCGS Reseller",
    icon: "virtualscgsreseller",
    id: "null_virtualscgsreseller",
    state: TypeState.Virtual,
  },
  {
    name: "Virtual Gold'n Coins Reseller",
    icon: "virtualgold'ncoinsreseller",
    id: "null_virtualgold'ncoinsreseller",
    state: TypeState.Virtual,
  },
  {
    name: "Virtual NEGS Reseller",
    icon: "virtualnegsreseller",
    id: "null_virtualnegsreseller",
    state: TypeState.Virtual,
  },
  {
    name: "Virtual GeoLoggers Reseller",
    icon: "virtualgeologgersreseller",
    id: "null_virtualgeologgersreseller",
    state: TypeState.Virtual,
  },
];

export default resellers;
