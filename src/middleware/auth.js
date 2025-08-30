import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

const JWT_SECRET = process.env.JWT_SECRET;

// Authentication: verify JWT
export function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    // return res.status(401).json({ message: "No token provided" });
    return next(createError(401, "No token provided"));
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    // return res.status(401).json({ message: "Invalid or expired token" });
    return next(createError(401, "Invalid or expired token"));
  }
}

// Authorization: check role
export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(createError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(createError(403, "Forbidden"));
    }

    next();
  };
}
