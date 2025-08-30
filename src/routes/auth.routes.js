import express from "express";
import { register, login } from "../controllers/auth.contoller.js";
// import { auth, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// router.get("/profile", auth, (req, res) => {
//   res.json({ message: "Welcome", user: req.user });
// });

export default router;
