import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

const getSingleProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const singleProduct = await Product.findById(id);
  if (singleProduct) {
    res.send(singleProduct);
  } else {
    res.status(404);
    throw new Error("Product not found...");
  }
});

export { getAllProducts, getSingleProductById };
