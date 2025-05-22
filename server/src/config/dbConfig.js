import mongoose from "mongoose";
import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from "./serverConfig.js";

export default async function connectDB() {
  try {
    const DB_URL = NODE_ENV === "development" ? DEV_DB_URL : PROD_DB_URL;

    if (!DB_URL) {
      throw new Error(
        "MongoDB URI is undefined. Check your .env file or serverConfig.js."
      );
    }

    await mongoose.connect(DB_URL);
    console.log(`✅ Connected to MongoDB from ${NODE_ENV} environment`);
  } catch (error) {
    console.error("❌ Error connecting to database:", error.message);
  }
}
