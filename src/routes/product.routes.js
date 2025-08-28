import { Router } from "express";
import {
  listProducts,
  getProduct,
  deleteProduct,
  // createProduct,
  // updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Todo: Use swagger to document the APIs

// admin and regular roles
router.get("/", listProducts);
router.get("/:id", getProduct);

// admin only
router.delete("/:id", deleteProduct);
// router.post("/", createProduct);
// router.patch("/:id", updateProduct);

export default router;
