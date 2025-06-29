import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import importRoute from "./routes/importRoute";
// import transactionRoutes from "./routes/transactionRoutes";
import dashboardRoutes from './routes/dashboardRoutes';
import transactionRoutes from "./routes/transaction.routes";
import exportRoute from "./routes/transactionRoutes";



dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is working!");
});
app.use("/api/admin", importRoute);
app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/export",exportRoute);


connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
