import express from "express";
const router = express.Router();
import {
  getAllProducts,
  getSingleProductById,
} from "../controllers/productsControllers.js";

router.route("/").get(getAllProducts);
router.route("/:id").get(getSingleProductById);

export default router;
