// models/Transaction.ts
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  id: Number,
  date: Date,
  amount: Number,
  category: String,
  status: String,
  user_id: String,
  user_profile: String,
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
