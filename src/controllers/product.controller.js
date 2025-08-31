import mongoose from "mongoose";
import Product from "../models/Product.js";

import createError from "../utils/createError.js";
import { sendResponse } from "../utils/sendResponse.js";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const listProducts = asyncHandler(async (req, res) => {
  // defaults if frontend doesn't send query params
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 0;
  const skip = (page - 1) * limit;

  // query total count first (but only once, without fetching all)
  const total = await Product.countDocuments();

  // fetch only the needed docs
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // res.json({
  //   page,
  //   limit,
  //   skip,
  //   total,
  //   products: products,
  // });
  sendResponse(res, {
    data: { page, limit, skip, total, products: products },
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    console.log(
      "error is here ==========================================================="
    );
    // return res.status(400).json({ message: "Invalid ID" });
    throw createError(400, "Invalid ID");
  }
  const product = await Product.findById(id);
  if (!product) {
    console.log(
      "error is here ===========================================================2"
    );
    // return res.status(404).json({ message: "Product not found" });
    throw createError(404, "Product not found");
  }
  // res.json(product);
  sendResponse(res, { data: product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    // return res.status(400).json({ message: "Invalid ID" });
    throw createError(400, "Invalid ID");
  }
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    // return res.status(404).json({ message: "Product not found" });
    throw createError(404, "Product not found");
  }
  // res.status(204).send('Product deleted');
  // res.status(204).send();
  sendResponse(res, { status: 204 });
});

// NA
// export const createProduct = asyncHandler(async (req, res) => {
//   const { title, done } = req.body;
//   if (!title?.trim())
//     return res.status(400).json({ message: "Title is required" });
// throw createError(400, "Title is required");
//   const product = await Product.create({ title: title.trim(), done: !!done });
//   res.status(201).json(product);
// });

// export const updateProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.isValidObjectId(id))
//     return res.status(400).json({ message: "Invalid ID" });
// throw createError(400, "Invalid ID");
//   const product = await Product.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });
// if (!product) {
//   // return res.status(404).json({ message: "Product not found" });
// throw createError(404, "Product not found");
// }
//   res.json(product);
// });
