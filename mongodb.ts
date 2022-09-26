import "dotenv";
import { MongoClient } from "mongo";

const MONGO_USER = Deno.env.get("MONGO_USER");
const MONGO_PASSWORD = Deno.env.get("MONGO_PASSWORD");

const client = new MongoClient();
await client.connect(
  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@d-ress.iyfsibd.mongodb.net/?authMechanism=SCRAM-SHA-1`,
);

const db = client.database("notes");

export default db;
