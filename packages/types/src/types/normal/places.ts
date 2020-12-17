import { PointsInterface, TypeHidden, TypeID, TypeState, TypeTags } from "../../munzee";

const PlacesPoints = {
  "deploy": 40,
  "capture": 20,
  "capon": 10
};

export default [
  {
    name: "POI Airport",
    icon: "poiairport",
    id: 782,
    points: PlacesPoints,
  },
  {
    name: "POI Sports",
    icon: "poisports",
    id: 783,
    points: PlacesPoints,
  },
  {
    name: "POI University",
    icon: "poiuniversity",
    id: 784,
    points: PlacesPoints,
  },
  {
    name: "POI Museum",
    icon: "poimuseum",
    id: 786,
    points: PlacesPoints,
  },
  {
    name: "POI Wildlife",
    icon: "poiwildlife",
    id: 787,
    points: PlacesPoints,
  },
  {
    name: "POI Historical Place",
    icon: "poihistoricalplace",
    id: 1339,
    points: PlacesPoints,
    extra: {
      alt_icons: ["poihistorical"],
    },
  },
  {
    name: "POI Library",
    icon: "poilibrary",
    id: 1340,
    points: PlacesPoints,
  },
  {
    name: "POI First Responders",
    icon: "poifirstresponders",
    id: 1341,
    points: PlacesPoints,
  },
  {
    name: "POI Faith Place",
    icon: "poifaithplace",
    id: 1342,
    points: PlacesPoints,
    extra: {
      alt_icons: ["poifaith"],
    },
  },
  {
    name: "POI Hospital",
    icon: "poihospital",
    id: 1486,
    points: PlacesPoints,
  },
  {
    name: "POI Post Office",
    icon: "poipostoffice",
    id: 1487,
    points: PlacesPoints,
  },
  {
    name: "POI Cemetery",
    icon: "poicemetery",
    id: 1488,
    points: PlacesPoints,
  },
  {
    name: "POI Unique Attraction",
    icon: "poiuniqueattraction",
    id: 1551,
    points: PlacesPoints,
  },
  {
    name: "POI Virtual Garden",
    icon: "poi_virtual_garden",
    id: 1631,
    points: {
      deploy: 40,
      capture: 10,
      capon: 5,
    },
  },
  {
    name: "POI Cinema",
    icon: "poicinema",
    id: 1770,
    points: PlacesPoints,
  },
  {
    name: "POI Transportation",
    icon: "poitransportation",
    id: 1977,
    points: PlacesPoints,
  },
  {
    name: "POI Play Park",
    icon: "poiplaypark",
    id: 1978,
    points: PlacesPoints,
  },
  {
    name: "POI Bank",
    icon: "poibank",
    id: 2445,
    points: PlacesPoints,
  },
  {
    name: "POI Beach",
    icon: "poibeach",
    id: 2446,
    points: PlacesPoints,
  },
  {
    name: "POI Campground",
    icon: "poicampground",
    id: 2447,
    points: PlacesPoints,
  },
  {
    name: "POI Golf",
    icon: "poigolf",
    id: 2448,
    points: PlacesPoints,
  },
  {
    name: "POI Drink Depot",
    icon: "poidrinkdepot",
    id: "null_poidrinkdepot",
    points: PlacesPoints,
  },
] as {
  name: string;
  icon: string;
  id: TypeID;
  state?: TypeState;
  alt_icons?: string[];
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  points?: PointsInterface;
}[];
