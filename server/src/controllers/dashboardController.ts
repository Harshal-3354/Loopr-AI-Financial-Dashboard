// src/controllers/dashboardController.ts
import { Request, Response } from 'express';
import {Transaction} from '../models/Transaction';

export const getSummary = async (req: Request, res: Response) => {
  try {
    const [revenueAgg, expenseAgg, pendingAgg, totalTransactions] = await Promise.all([
      Transaction.aggregate([
        { $match: { category: 'Revenue', status: 'Paid' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Transaction.aggregate([
        { $match: { category: 'Expense', status: 'Paid' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Transaction.aggregate([
        { $match: { status: 'Pending' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Transaction.countDocuments()
    ]);

    res.json({
      totalRevenue: revenueAgg[0]?.total || 0,
      totalExpense: expenseAgg[0]?.total || 0,
      totalPendingAmount: pendingAgg[0]?.total || 0,
      totalTransactions
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch summary', error });
  }
};
