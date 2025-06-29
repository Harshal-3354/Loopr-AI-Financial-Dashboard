import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // backend
  withCredentials: true, // 👈 important for cookies
});

export default instance;
