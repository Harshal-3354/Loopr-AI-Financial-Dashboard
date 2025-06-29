import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";

interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
}

const TransactionTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    sortBy: "date",
    order: "desc",
    limit: 5,
  });

  const fetchData = async () => {
    try {
      const data = await fetchTransactions({ page, ...filters });
      setTransactions(data.transactions);
      setTotal(data.total);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, filters]);

  const totalPages = Math.ceil(total / filters.limit);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="border px-2 py-1 mb-4"
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="text-center border-t">
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>₹ {tx.amount.toFixed(2)}</td>
              <td>{tx.category}</td>
              <td>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex gap-4 justify-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
