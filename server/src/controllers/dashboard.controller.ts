import { Request, Response } from "express";
import {Transaction} from "../models/Transaction";

export const getDashboardCharts = async (req: Request, res: Response) => {
  try {
    // const userId = req.user?.id;

    // Get all transactions of the logged-in user
    const transactions = await Transaction.find({});

    const monthlyData: Record<string, { revenue: number; expense: number }> = {};
    const categoryBreakdown: Record<string, number> = { Revenue: 0, Expense: 0 };
    let totalRevenue = 0;
    let totalExpense = 0;

    transactions.forEach((tx) => {
      const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });

      if (!monthlyData[month]) {
        monthlyData[month] = { revenue: 0, expense: 0 };
      }

      if (tx.category === "Revenue") {
        monthlyData[month].revenue += tx.amount;
        totalRevenue += tx.amount;
        categoryBreakdown.Revenue += tx.amount;
      } else {
        monthlyData[month].expense += tx.amount;
        totalExpense += tx.amount;
        categoryBreakdown.Expense += tx.amount;
      }
    });

    const monthlyStats = Object.entries(monthlyData).map(([month, values]) => ({
      month,
      ...values,
    }));

    res.json({
      summary: {
        totalRevenue,
        totalExpense,
        net: totalRevenue - totalExpense,
      },
      monthlyStats,
      categoryBreakdown,
    });
  } catch (error) {
    console.error("Chart data fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getTransactions = async (req: Request, res: Response) => {
  try {
    // const userId = req.user?.id;

    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "date",
      sortOrder = "desc",
      category,
      status,
      startDate,
      endDate,
    } = req.query as Record<string, string>;

    const query: any = {  };

    if (search) {
      query.$or = [
        { category: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    if (category) query.category = category;
    if (status) query.status = status;
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const sort: any = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .sort(sort)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    res.json({
      total,
      page: +page,
      limit: +limit,
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
