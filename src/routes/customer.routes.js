import { Router } from "express";
import {
  listCustomers,
  getCustomer,
  deleteCustomer,
  // createCustomer,
  // updateCustomer,
} from "../controllers/customer.controller.js";

const router = Router();

// Todo: Use swagger to document the APIs

// admin and regular roles
router.get("/", listCustomers);
router.get("/:id", getCustomer);

// admin only
router.delete("/:id", deleteCustomer);
// router.patch("/:id", updateCustomer);

// NA
// router.post("/", createCustomer);

export default router;
