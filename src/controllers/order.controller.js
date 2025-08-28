import mongoose from "mongoose";
import Order from "../models/Order.js";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const listOrders = asyncHandler(async (req, res) => {
  // defaults if frontend doesn't send query params
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
  const skip = (page - 1) * limit;

  // query total count first (but only once, without fetching all)
  const total = await Order.countDocuments();

  // fetch only the needed docs
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    page,
    limit,
    skip,
    total,
    orders: orders,
  });
});

export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    // return res.status(400).json({ message: "Invalid ID" });
    throw new Error({ status: 400, message: "Invalid ID" });
  }
  const order = await Order.findById(id);
  if (!order) {
    // return res.status(404).json({ message: "Order not found" });
    throw new Error({ status: 404, message: "Order not found" });
  }
  res.json(order);
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    // return res.status(400).json({ message: "Invalid ID" });
    throw new Error({ status: 400, message: "Invalid ID" });
  }
  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    // return res.status(404).json({ message: "Order not found" });
    throw new Error({ status: 404, message: "Order not found" });
  }
  // res.status(204).send('Order deleted');
  res.status(204).send();
});

// NA
// export const createOrder = asyncHandler(async (req, res) => {
//   const { title, done } = req.body;
//   if (!title?.trim())
//     return res.status(400).json({ message: "Title is required" });
// throw new Error({ status: 400, message: "Title is required" });
//   const order = await Order.create({ title: title.trim(), done: !!done });
//   res.status(201).json(order);
// });

// export const updateOrder = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.isValidObjectId(id))
//     return res.status(400).json({ message: "Invalid ID" });
// throw new Error({ status: 400, message: "Invalid ID" });
//   const order = await Order.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });
// if (!order) {
//   // return res.status(404).json({ message: "Order not found" });
//   throw new Error({ status: 404, message: "Order not found" });
// }
//   res.json(order);
// });
