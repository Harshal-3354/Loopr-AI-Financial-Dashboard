// import { useEffect, useState } from "react";
// import { getUserTransactions } from "../services/transaction";

// export default function Dashboard() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getUserTransactions()
//       .then(setTransactions)
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">Your Transactions</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : transactions.length === 0 ? (
//         <p>No transactions found.</p>
//       ) : (
//         <table className="w-full border text-left">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2">Date</th>
//               <th className="p-2">Amount</th>
//               <th className="p-2">Category</th>
//               <th className="p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((txn) => (
//               <tr key={txn.id} className="border-b">
//                 <td className="p-2">{new Date(txn.date).toLocaleDateString()}</td>
//                 <td className="p-2">₹{txn.amount.toFixed(2)}</td>
//                 <td className="p-2">{txn.category}</td>
//                 <td className="p-2">{txn.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

import React from "react";
import DashboardSummary from "../components/DashboardSummary";
import DashboardCharts from "../components/DashboardCharts";
import TransactionTable from "../components/TransactionTable";
import ExportCSVButton from "@/components/ExportCSVButton";

const Dashboard = () => {
  // const token = localStorage.getItem("token") || "";

  return (
    <div className="p-4 space-y-8">
      <DashboardSummary />
      <DashboardCharts />
      <TransactionTable />
      <div className="text-right">
        <ExportCSVButton />
      </div>
    </div>
  );
};

export default Dashboard;


