// src/routes/dashboardRoutes.ts
import express from 'express';
import { getSummary } from '../controllers/dashboardController';
import { getDashboardCharts} from "../controllers/dashboard.controller";
// import { verifyToken } from "../middlewares/auth.middleware";
import { getTransactions } from '../controllers/dashboard.controller';

const router = express.Router();

router.get('/summary', getSummary);
router.get("/charts", getDashboardCharts);
router.get("/transactions", getTransactions);

export default router;
