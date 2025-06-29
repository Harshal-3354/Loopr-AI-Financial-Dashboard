import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    // const userId = req.user?.id;

    const {
      page = 1,
      limit = 10,
      sortBy = "date",
      order = "desc",
      search = "",
      category,
      status,
    } = req.query;

    const query: any = { };

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { category: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort({ [sortBy as string]: order === "asc" ? 1 : -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    res.json({ total, page: +page, limit: +limit, transactions });
  } catch (error) {
    console.error("Transaction fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
