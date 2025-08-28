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

router.get("/", listOrders);
router.get("/:id", getOrder);
router.delete("/:id", deleteOrder);
// NA
// router.post("/", createOrder);
// router.patch("/:id", updateOrder);

export default router;
