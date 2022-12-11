import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getAllOrders,
  getSingleOrder,
  updateOrderToPaid,
  getUserOrder,
} from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/myorder").get(protect, getUserOrder);
router.route("/:id").get(protect, getSingleOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
