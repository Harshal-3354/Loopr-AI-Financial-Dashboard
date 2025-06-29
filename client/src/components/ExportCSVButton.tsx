import React from "react";
import axios from "axios";

const ExportCSVButton: React.FC = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/export",
        {
          responseType: "blob",
          withCredentials: true, // if you're using cookies for auth
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("CSV Export Error:", error);
      alert("Failed to export CSV");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      📁 Export Transactions CSV
    </button>
  );
};

export default ExportCSVButton;
