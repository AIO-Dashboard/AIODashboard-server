export function notFound(_req, res, _next) {
  res.status(404).json({ message: "Not Found" });
}

export function errorHandler(err, _req, res, _next) {
  console.error(
    "-----------------------------------------------------------------------------"
  );
  console.error(err, process.env.NODE_ENV);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    status,
    message: err.message || "Server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

// Todo: Add custom error throws from controllers when applicable
// e.g throw new Error({ status: 401, message: "Unauthorized" });
