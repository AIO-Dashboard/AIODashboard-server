import { Router } from "express";
import {
  listProducts,
  getProduct,
  deleteProduct,
  // createProduct,
  // updateProduct,
} from "../controllers/product.controller.js";

import { auth, authorize } from "../middleware/auth.js";

const router = Router();

// Todo: Use swagger to document the APIs

// admin and regular roles
router.get("/", listProducts);
router.get("/:id", getProduct);

// admin only
router.delete("/:id", auth, authorize("admin"), deleteProduct);
// router.post("/", auth, authorize('admin'),  createProduct);
// router.patch("/:id", auth, authorize('admin'),  updateProduct);

export default router;
