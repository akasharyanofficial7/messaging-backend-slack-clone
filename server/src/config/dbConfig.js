import mongoose from "mongoose";
import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from "./serverConfig.js";

export default async function connectDB() {
  try {
    const DB_URL = NODE_ENV === "development" ? DEV_DB_URL : PROD_DB_URL;

    console.log("DEV_DB_URL:", DEV_DB_URL);

    if (!DEV_DB_URL || !PROD_DB_URL) {
      throw new Error(
        "Database connection string is missing in environment variables."
      );
    }

    await mongoose.connect(
      NODE_ENV === "development" ? DEV_DB_URL : PROD_DB_URL
    );
    console.log(`✅ Connected to MongoDB from ${NODE_ENV} environment`);
  } catch (error) {
    console.error("❌ Error connecting to database:", error.message);
  }
}
