// controllers/transactionController.ts
import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";

export const getUserTransactions = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  try {
    const transactions = await Transaction.find({}).sort({
      date: -1,
    });

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching transactions" });
  }
};
