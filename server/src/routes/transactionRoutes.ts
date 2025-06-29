// routes/transactionRoutes.ts
// import express from "express";
// import { getUserTransactions } from "../controllers/transaction.controller";
// import { protect } from "../middleware/auth";

// const router = express.Router();

// router.get("/", protect, getUserTransactions);

// export default router;

import express from "express";
import { exportCSV } from "../controllers/exportController";
// import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/",  exportCSV);


export default router;

