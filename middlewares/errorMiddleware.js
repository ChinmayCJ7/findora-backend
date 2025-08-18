// centralized error handler
export const errorMiddleware = (err, req, res, next) => {
  console.error("❌ Error:", err);
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    error: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
