import express from "express";
import { getTransactions } from "../controllers/transaction.controller";
// import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getTransactions);

export default router;
