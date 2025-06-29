// routes/importRoute.ts
import express from "express";
import fs from "fs";
import path from "path";
import { Transaction } from "../models/Transaction";

const router = express.Router();

router.post("/import-transactions", async (req, res) => {
  const filePath = path.join(process.cwd(), "data", "transaction.json");

  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await Transaction.deleteMany(); // Optional: reset
    await Transaction.insertMany(jsonData);

    res.status(200).json({ message: "Transactions imported successfully" });
  } catch (error) {
    res.status(500).json({ message: "Import failed", error });
  }
});

export default router;
