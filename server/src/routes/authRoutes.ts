import express from "express";
import { signup, login, getMe } from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me",getMe); // 👈 protected route
 // 👈 protected route

export default router;
