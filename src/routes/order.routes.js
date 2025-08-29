import { Router } from "express";
import {
  listOrders,
  getOrder,
  deleteOrder,
  // createOrder,
  // updateOrder,
} from "../controllers/order.controller.js";

import { auth, authorize } from "../middleware/auth.js";

const router = Router();

// Todo: Use swagger to document the APIs

// admin and regular roles
router.get("/", listOrders);
router.get("/:id", getOrder);

// admin only
router.delete("/:id", auth, authorize("admin"), deleteOrder);

// NA
// router.post("/", createOrder);
// router.patch("/:id", updateOrder);

export default router;
