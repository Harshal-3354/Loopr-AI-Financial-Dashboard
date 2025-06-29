// scripts/importTransactions.ts
import { connectDB } from "../config/db"; // Import your existing connection
import { Transaction } from "../models/Transaction";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// 1. Configure environment variables with absolute path
const envPath = path.resolve(__dirname, "./../.env");
dotenv.config({ path: envPath });

// 2. Verify environment variables
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1);
}

// 3. File path resolution
const dataPath = path.resolve(__dirname, "./transactions.json");

// 4. Data loading with error handling
const loadTransactionsData = (): any[] => {
  try {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    console.error("❌ Failed to load transactions data:", err);
    process.exit(1);
  }
};

const data = loadTransactionsData();

// 5. Main import function
async function importData() {
  try {
    // Use your existing connection setup
    await connectDB();
    
    console.log("🧹 Clearing existing transactions...");
    await Transaction.deleteMany();

    console.log(`📤 Importing ${data.length} transactions...`);
    const result = await Transaction.insertMany(data);
    console.log(`✅ Successfully imported ${result.length} transactions`);

  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  } finally {
    // Graceful shutdown
    await mongoose.disconnect().catch( (err)=> {
      console.error("⚠️ Failed to disconnect:", err);
    });
    console.log("🚪 MongoDB connection closed");
    process.exit(0);
  }
}

// 6. Execute with error handling
importData().catch(err => {
  console.error("💥 Unhandled error:", err);
  process.exit(1);
});