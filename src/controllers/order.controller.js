import mongoose from "mongoose";
import Order from "../models/Order.js";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const listOrders = asyncHandler(async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  console.log(orders);
  res.json(orders);
});

export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.json(order);
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  // res.status(204).send('Order deleted');
  res.status(204).send();
});

// NA
// export const createOrder = asyncHandler(async (req, res) => {
//   const { title, done } = req.body;
//   if (!title?.trim())
//     return res.status(400).json({ message: "Title is required" });
//   const order = await Order.create({ title: title.trim(), done: !!done });
//   res.status(201).json(order);
// });

// export const updateOrder = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.isValidObjectId(id))
//     return res.status(400).json({ message: "Invalid ID" });
//   const order = await Order.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!order) return res.status(404).json({ message: "Order not found" });
//   res.json(order);
// });
