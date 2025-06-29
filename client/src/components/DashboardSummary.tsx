import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


interface Summary {
  totalRevenue: number;
  totalExpense: number;
  totalPendingAmount: number;
  totalTransactions: number;
}

export default function DashboardSummary() {
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await axios.get("http://localhost:5000/api/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p>Loading dashboard summary...</p>;
  if (!data) return <p>Failed to load data.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <SummaryCard title="Total Revenue" value={`₹${data.totalRevenue.toFixed(2)}`} color="text-green-600" />
      <SummaryCard title="Total Expense" value={`₹${data.totalExpense.toFixed(2)}`} color="text-red-600" />
      <SummaryCard title="Pending Amount" value={`₹${data.totalPendingAmount.toFixed(2)}`} color="text-yellow-600" />
      <SummaryCard title="Transactions" value={data.totalTransactions.toString()} color="text-blue-600" />
    </div>
  );
}

function SummaryCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color?: string;
}) {
  return (
    <Card className="shadow-md border">
      <CardContent className="p-5 space-y-2">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
      </CardContent>
    </Card>
  );
}
