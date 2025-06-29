import axios from "axios";

export const fetchTransactions = async (params: any) => {
  const res = await axios.get("http://localhost:5000/api/transactions", {
    params,
  });
  return res.data;
};
