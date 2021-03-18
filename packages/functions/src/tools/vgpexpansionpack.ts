import { Route } from "../types";
import db, { TypeState, TypeTags } from "@cuppazee/types";

const route: Route = {
  path: "vgpexpansionpack",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { list } }) {
        const excludes = new Set(["laserpen", "virtualemerald", "trail", "eventtrail"]);
        const existing: Set<string> = new Set(list.split(",").map((i: string) => db.strip(i)));
        const types = db.types
          .filter(i => !existing.has(i.strippedIcon))
          .filter(i => i.state === TypeState.Virtual)
          .filter(i => !i.has_tag(TypeTags.Scatter))
          .filter(i => !i.has_tag(TypeTags.TypeTourism))
          .filter(i => !i.has_tag(TypeTags.BouncerHost))
          .filter(i => !i.has_tag(TypeTags.TypeDestination))
          .filter(i => !i.meta.evolution_stage || i.meta.evolution_stage === 1)
          .filter(i => !excludes.has(i.strippedIcon));
        return {
          status: "success",
          data: {
            categories: [
              [0, "Virtuals"],
              [3, "Evos"],
              [99, "Other"],
              [199, "Large Deploy Proximity"],
              [1234, "☕ Other"],
              [1235, "✉️ Open"],
              [2020, "✉️ 2020"],
              [2021, "✉️ 2021"],
            ],
            types: [
              [
                "Generic",
                `https://icons.cuppazee.app/64/envelope`,
                "envelope",
                1,
                1235,
                32,
                [-1, -1, -1],
                "",
              ],
              ...types.map(i => [
                i.name.replace(/ Card$/, ""),
                `https://icons.cuppazee.app/64/${i.icon}`,
                i.strippedIcon,
                1,
                i.has_tag(TypeTags.Card)
                  ? i.has_tag(TypeTags.CardOpen)
                    ? 1235
                    : i.has_tag(TypeTags.Card2020) || i.has_tag(TypeTags.Card2020HCCC)
                    ? 2020
                    : 2021
                  : 1234,
                32,
                [-1, -1, -1],
                "",
              ]),
            ],
          },
        };
      },
    },
  ],
};
export default route;
