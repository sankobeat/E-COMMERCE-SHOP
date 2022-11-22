import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import Product from "../models/productModel.js";

// desc => fetch all products
// route => GET /api/products
// access => public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

// desc => fetch single product by id
// route => GET /api/products/:id
// access => public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const singleProduct = await Product.findById(id);
    if (singleProduct) {
      res.send(singleProduct);
    } else {
      res.status(404);
      throw new Error("Product not found...");
    }
  })
);

export default router;
