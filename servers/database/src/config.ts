import fs from "fs";
import path from "path";

export interface Config {
  mongoURI: string;
}

export default JSON.parse(
  fs.readFileSync(
    process.env.NODE_ENV === "development"
      ? path.resolve(__dirname, "./config.json")
      : "/cuppazee_database.json",
    "utf8"
  )
) as Config;
