import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userControllers.js";

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/register").post(registerUser);
export default router;
