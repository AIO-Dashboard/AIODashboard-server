import mongoose from "mongoose";
import Order from "../models/Order.js";

import createError from "../utils/createError.js";
import { sendResponse } from "../utils/sendResponse.js";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const listOrders = asyncHandler(async (req, res) => {
  // defaults if frontend doesn't send query params
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 0;
  const skip = (page - 1) * limit;

  // query total count first (but only once, without fetching all)
  const total = await Order.countDocuments();

  // fetch only the needed docs
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("customerId", "firstName lastName email");

  // res.json({
  //   page,
  //   limit,
  //   skip,
  //   total,
  //   orders: orders,
  // });
  sendResponse(res, {
    data: {
      page,
      limit,
      skip,
      total,
      orders: orders,
    },
  });
});

export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    // return res.status(400).json({ message: "Invalid ID" });
    throw createError(400, "Invalid ID");
  }
  const order = await Order.findById(id).populate(
    "customerId",
    "firstName lastName email role phone"
  );
  if (!order) {
    // return res.status(404).json({ message: "Order not found" });
    throw createError(404, "Order not found");
  }
  // res.json(order);
  sendResponse(res, { data: order });
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    // return res.status(400).json({ message: "Invalid ID" });
    throw createError(400, "Invalid ID");
  }
  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    // return res.status(404).json({ message: "Order not found" });
    throw createError(404, "Order not found");
  }
  // res.status(204).send('Order deleted');
  // res.status(204).send();
  sendResponse(res, { status: 204 });
});
