import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  console.log(keyword);
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReview = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReview) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "review added" });
  } else {
    res.status(404);
    res.json({ message: "Product Not Found" });
  }
});

//@desc get top rated products
//@route get api/products/top
//@access public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getAllProducts,
  getSingleProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  addReview,
  getTopProducts,
};
