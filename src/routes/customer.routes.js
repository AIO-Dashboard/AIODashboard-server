import { Router } from "express";
import {
  listCustomers,
  getCustomer,
  deleteCustomer,
  // createCustomer,
  // updateCustomer,
} from "../controllers/customer.controller.js";

import { auth, authorize } from "../middleware/auth.js";

const router = Router();

// Todo: Use swagger to document the APIs

// admin and regular roles
router.get("/", listCustomers);
router.get("/:id", getCustomer);

// admin only
// router.delete("/:id", deleteCustomer);
router.delete("/:id", auth, authorize("admin"), deleteCustomer);
// router.patch("/:id", auth, authorize("admin"), updateCustomer);

// NA
// router.post("/", createCustomer);

export default router;
