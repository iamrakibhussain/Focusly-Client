export const globalErrorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.stack); // Log for debugging

  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    success: false,
    message: isProduction && statusCode === 500 ? "Internal Server Error" : err.message,
    // Hide stack trace in production to prevent leaking sensitive info
    ...(isProduction ? {} : { stack: err.stack }),
  });
};
