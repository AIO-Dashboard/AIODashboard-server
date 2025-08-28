import { Router } from "express";
import {
  listOrders,
  getOrder,
  deleteOrder,
  // createOrder,
  // updateOrder,
} from "../controllers/order.controller.js";

const router = Router();

// Todo: Use swagger to document the APIs

// admin and regular roles
router.get("/", listOrders);
router.get("/:id", getOrder);

// admin only
router.delete("/:id", deleteOrder);
// router.post("/", createOrder);
// router.patch("/:id", updateOrder);

export default router;
