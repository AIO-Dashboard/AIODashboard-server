import { sendResponse } from "../utils/sendResponse.js";

export function notFound(_req, res, _next) {
  sendResponse(res, {
    status: 404,
    error: { message: "Not Found" },
  });
}

export function errorHandler(err, _req, res, _next) {
  console.error("Error:", err);

  sendResponse(res, {
    status: err.status || 500,
    error: { message: err.message || "Server error", stack: err.stack },
  });
}

// Todo: Add custom error throws from controllers when applicable
// e.g throw createError(401, "Unauthorized");
