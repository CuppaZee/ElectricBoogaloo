import fs from "fs";
import path from "path";

export default JSON.parse(fs.readFileSync(process.env.NODE_ENV === "development" ? path.resolve(__dirname, "../cuppazee.json") : "/cuppazee.json", "utf8"))