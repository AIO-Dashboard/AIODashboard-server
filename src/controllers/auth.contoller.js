import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import createError from "../utils/createError.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

export async function register(req, res, next) {
  try {
    const { username, password, role } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return next(createError(400, "Username already taken"));
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed,
      role: role || "user",
    });

    res.status(201).json({
      message: "User registered",
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return next(createError(400, "Invalid credentials"));
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(createError(400, "Invalid credentials"));
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    return next(err);
  }
}
