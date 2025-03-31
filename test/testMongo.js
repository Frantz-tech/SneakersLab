import { MongoClient } from "mongodb";

async function checkMongo() {
  try {
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    console.log("✅ MongoDB est bien installé et accessible !");
    await client.close();
  } catch (error) {
    console.error("❌ MongoDB n'est pas accessible :", error);
  }
}

checkMongo();
