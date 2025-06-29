import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { Parser } from "json2csv";

export const exportCSV = async (req: Request, res: Response) => {
  try {
    // const userId = req.user?.id;
    const transactions = await Transaction.find({ });

    const fields = ["id", "date", "amount", "category", "status"];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(transactions);

    res.header("Content-Type", "text/csv");
    res.attachment("transactions.csv");
    res.send(csv);
  } catch (error) {
    console.error("CSV export error:", error);
    res.status(500).json({ message: "CSV export failed" });
  }
};
