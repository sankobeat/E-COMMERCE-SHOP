import express from "express";
import { protect, adminAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserProfileByAdmin,
} from "../controllers/userControllers.js";

router.route("/").get(protect, adminAuth, getAllUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/register").post(registerUser);

router
  .route("/:id")
  .delete(protect, adminAuth, deleteUser)
  .get(protect, adminAuth, getUserById)
  .put(protect, adminAuth, updateUserProfileByAdmin);
export default router;
