export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Handle Mongoose Cast Errors (Invalid IDs)
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = `Invalid ${err.path}: ${err.value}`;
  }

  // Handle Mongoose Duplicate Key Errors
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = `Duplicate value for ${Object.keys(err.keyValue).join(
      ", "
    )}. Please use another value.`;
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    err.statusCode = 401;
    err.message = "Your token has expired. Please log in again.";
  }

  const errorResponse = {
    status: err.status,
    message: err.message,
  };

  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
    errorResponse.error = err;
  }

  res.status(err.statusCode).json(errorResponse);
};
