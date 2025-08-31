export function sendResponse(res, { status = 200, data = null, error = null }) {
  res.status(status).json({
    success: !error,
    status,
    data,
    error: error
      ? {
          message: error.message || "Something went wrong",
          stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        }
      : undefined,
  });
}
