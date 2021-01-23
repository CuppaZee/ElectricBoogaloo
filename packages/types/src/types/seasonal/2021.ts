import { SeasonalCategory } from ".";
import { TypeTags } from "../../munzee";

const s2021: SeasonalCategory[] = [
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
        lands_on: ["treehouse", "munzee", "earthmystery", "icemystery", type => type.has_tag(TypeTags.TypeSeasonal)],
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
    ],
  },
];

export default s2021;
