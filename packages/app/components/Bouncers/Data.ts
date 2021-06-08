import { CuppaZeeDB } from "@cuppazee/db";

export type BouncerOverviewData = {
  [key: string]: number;
}

export default function BouncerOverviewConverter(db: CuppaZeeDB, data: BouncerOverviewData) {
  const uncategoriesTypes = new Set<string>();
  const output: {[key: string]: number} = {};
  for (const entry of Object.entries(data)) {
    if (!db.getType(entry[0])) {
      uncategoriesTypes.add(entry[0]); 
      output[entry[0]] = entry[1];
    } else {
      output[db.strip(entry[0])] = entry[1];
    }
  }
  return {
    counts: output,
    uncategoriesTypes: Array.from(uncategoriesTypes),
  };
}