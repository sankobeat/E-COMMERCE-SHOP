import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userControllers.js";

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/register").post(registerUser);
export default router;
