import { MongoClient } from "mongodb";
import config from "../config"

const uri = config.mongoURI;
// Create a new MongoClient
const mongo = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongo.connect();

export default mongo.db("cuppazee");
