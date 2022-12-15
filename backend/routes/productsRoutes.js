import express from "express";
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProductById,
  updateProduct,
  addReview,
  getTopProducts,
} from "../controllers/productsControllers.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";
router.route("/").get(getAllProducts).post(protect, adminAuth, createProduct);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(getSingleProductById)
  .delete(protect, adminAuth, deleteProduct)
  .put(protect, adminAuth, updateProduct);
router.route("/:id/reviews").post(protect, addReview);

export default router;
