import asyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

// @desc create new order
//@route POST api/orders
//@access PRIVATE

const addOrderItems = asyncHandler(async (req, res) => {
  //
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No ordered items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc get all orders
//@route GET api/orders
//@access PRIVATE

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
});

const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc update order to paid
//@route GET api/orders/:id
//@access PRIVATE

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResault = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc get logged in user
//@route GET api/orders/myorder
//@access PRIVATE

const getUserOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders) {
    res.status(200);
    res.json(orders);
  } else if (orders.length === 0) {
    res.status(404);
    throw new Error("No Orders Yet");
  }
});

export {
  addOrderItems,
  getAllOrders,
  getSingleOrder,
  updateOrderToPaid,
  getUserOrder,
};
