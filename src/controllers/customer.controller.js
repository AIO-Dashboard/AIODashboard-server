import mongoose from "mongoose";
import Customer from "../models/Customer.js";

import createError from "../utils/createError.js";
import { sendResponse } from "../utils/sendResponse.js";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const listCustomers = asyncHandler(async (req, res) => {
  // defaults if frontend doesn't send query params
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 0;
  const skip = (page - 1) * limit;

  // query total count first (but only once, without fetching all)
  const total = await Customer.countDocuments();

  // fetch only the needed docs
  const customers = await Customer.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // res.json({ page, limit, skip, total, customers: customers });
  sendResponse(res, {
    data: {
      page,
      limit,
      skip,
      total,
      customers: customers,
    },
  });
});

export const getCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    // return res.status(400).json({ message: "Invalid ID" });
    throw createError(400, "Invalid ID");
  }
  const customer = await Customer.findById(id);
  if (!customer) {
    // return res.status(404).json({ message: "Customer not found" });
    throw createError(404, "Customer not found");
  }
  // res.json(customer);
  sendResponse(res, { data: customer });
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    // return res.status(400).json({ message: "Invalid ID" });
    throw createError(400, "Invalid ID");
  }
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) {
    // return res.status(404).json({ message: "Customer not found" });
    throw createError(404, "Customer not found");
  }
  // res.status(204).send('Customer deleted');
  // res.status(204).send();
  sendResponse(res, { status: 204 });
});

// export const updateCustomer = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.isValidObjectId(id))
//     return res.status(400).json({ message: "Invalid ID" });
// throw createError(400, "Invalid ID");
//   const customer = await Customer.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });
// if (!customer) {
//   // return res.status(404).json({ message: "Customer not found" });
// throw createError(404, "Customer not found");
// }
//   res.json(customer);
// });
