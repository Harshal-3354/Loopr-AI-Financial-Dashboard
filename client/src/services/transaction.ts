import axios from "./axios";

export const getUserTransactions = async () => {
  const res = await axios.get("/transactions"); // backend must protect this
  return res.data;
};
