import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getAllOrders,
  getSingleOrder,
  updateOrderToPaid,
  getUserOrder,
  markOrderAsDelivered,
} from "../controllers/orderControllers.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, adminAuth, getAllOrders);
router.route("/myorder").get(protect, getUserOrder);
router
  .route("/:id")
  .get(protect, getSingleOrder)
  .put(protect, adminAuth, markOrderAsDelivered);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
