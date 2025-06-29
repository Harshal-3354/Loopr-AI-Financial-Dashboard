import express from "express";
import { getDashboardCharts } from "../controllers/dashboard.controller";
import { getTransactions } from "../controllers/dashboard.controller";
// import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/charts", getDashboardCharts);



export default router;
