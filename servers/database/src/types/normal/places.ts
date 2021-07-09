import { TypePoints, TypeHidden, TypeState, TypeTags } from "@cuppazee/db";

const PlacesPoints = {
  "deploy": 40,
  "capture": 20,
  "capon": 10
};

const places: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state?: TypeState;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  points?: TypePoints;
}[] = [
  {
    name: "POI Airport",
    icons: ["poiairport"],
    id: "poiairport",
    munzee_id: 782,
    points: PlacesPoints,
  },
  {
    name: "POI Sports",
    icons: ["poisports"],
    id: "poisports",
    munzee_id: 783,
    points: PlacesPoints,
  },
  {
    name: "POI University",
    icons: ["poiuniversity"],
    id: "poiuniversity",
    munzee_id: 784,
    points: PlacesPoints,
  },
  {
    name: "POI Museum",
    icons: ["poimuseum"],
    id: "poimuseum",
    munzee_id: 786,
    points: PlacesPoints,
  },
  {
    name: "POI Wildlife",
    icons: ["poiwildlife"],
    id: "poiwildlife",
    munzee_id: 787,
    points: PlacesPoints,
  },
  {
    name: "POI Historical Place",
    icons: ["poihistoricalplace", "poihistorical"],
    id: "poihistoricalplace",
    munzee_id: 1339,
    points: PlacesPoints,
  },
  {
    name: "POI Library",
    icons: ["poilibrary"],
    id: "poilibrary",
    munzee_id: 1340,
    points: PlacesPoints,
  },
  {
    name: "POI First Responders",
    icons: ["poifirstresponders"],
    id: "poifirstresponders",
    munzee_id: 1341,
    points: PlacesPoints,
  },
  {
    name: "POI Faith Place",
    icons: ["poifaithplace", "poifaith"],
    id: "poifaithplace",
    munzee_id: 1342,
    points: PlacesPoints,
  },
  {
    name: "POI Hospital",
    icons: ["poihospital"],
    id: "poihospital",
    munzee_id: 1486,
    points: PlacesPoints,
  },
  {
    name: "POI Post Office",
    icons: ["poipostoffice"],
    id: "poipostoffice",
    munzee_id: 1487,
    points: PlacesPoints,
  },
  {
    name: "POI Cemetery",
    icons: ["poicemetery"],
    id: "poicemetery",
    munzee_id: 1488,
    points: PlacesPoints,
  },
  {
    name: "POI Unique Attraction",
    icons: ["poiuniqueattraction"],
    id: "poiuniqueattraction",
    munzee_id: 1551,
    points: PlacesPoints,
  },
  {
    name: "POI Virtual Garden",
    icons: ["poi_virtual_garden"],
    id: "poi_virtual_garden",
    munzee_id: 1631,
    points: {
      deploy: 40,
      capture: 10,
      capon: 5,
    },
  },
  {
    name: "POI Cinema",
    icons: ["poicinema"],
    id: "poicinema",
    munzee_id: 1770,
    points: PlacesPoints,
  },
  {
    name: "POI Transportation",
    icons: ["poitransportation"],
    id: "poitransportation",
    munzee_id: 1977,
    points: PlacesPoints,
  },
  {
    name: "POI Play Park",
    icons: ["poiplaypark"],
    id: "poiplaypark",
    munzee_id: 1978,
    points: PlacesPoints,
  },
  {
    name: "POI Bank",
    icons: ["poibank"],
    id: "poibank",
    munzee_id: 2445,
    points: PlacesPoints,
  },
  {
    name: "POI Beach",
    icons: ["poibeach"],
    id: "poibeach",
    munzee_id: 2446,
    points: PlacesPoints,
  },
  {
    name: "POI Campground",
    icons: ["poicampground"],
    id: "poicampground",
    munzee_id: 2447,
    points: PlacesPoints,
  },
  {
    name: "POI Golf",
    icons: ["poigolf"],
    id: "poigolf",
    munzee_id: 2448,
    points: PlacesPoints,
  },
  {
    name: "POI Drink Depot",
    icons: ["poidrinkdepot"],
    id: "poidrinkdepot",
    munzee_id: 2690,
    points: PlacesPoints,
  },
  {
    name: "POI Pet",
    icons: ["poipet"],
    id: "poipet",
    points: PlacesPoints,
  },
  {
    name: "POI Entertainment",
    icons: ["poientertainment"],
    id: "poientertainment",
    points: PlacesPoints,
  },
];

export default places;