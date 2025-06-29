import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Helper to create JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

// Signup
export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ email, password });
  await user.save();

  const token = generateToken(user._id.toString());

  res
    .cookie("token", token, { httpOnly: true })
    .status(201)
    .json({ message: "Signup successful", userId: user._id });
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user._id.toString());

  res
    .cookie("token", token, { httpOnly: true })
    .json({ message: "Login successful", userId: user._id });
};
// Get current user
export const getMe = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findById(userId).select("-password"); // exclude password
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};
