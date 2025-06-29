// src/components/DashboardCharts.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

export default function DashboardCharts() {
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

 useEffect(() => {
  const fetchCharts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard/charts");
      console.log("API Response:", res.data);

      setLineData(res.data.monthlyStats); // from backend
      setPieData([
        { name: "Revenue", value: res.data.categoryBreakdown.Revenue ?? 0 },
        { name: "Expense", value: res.data.categoryBreakdown.Expense ?? 0 },
      ]);
    } catch (err) {
      console.error("Error fetching chart data:", err);
    }
  };

  fetchCharts();
}, []);



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Line Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Monthly Revenue vs Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#00C49F" />
            <Line type="monotone" dataKey="expense" stroke="#FF8042" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Revenue vs Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
