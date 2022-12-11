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

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.delete();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found...");
  }
});

//@desc create products
//@route post /api/products
//@access private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.png",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Desc",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update products
//@route put /api/products/:id
//@access private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.description = description || product.description;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    res.json({ message: "Product Not Found" });
  }
});

export {
  getAllProducts,
  getSingleProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
