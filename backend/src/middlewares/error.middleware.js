function errorMiddleware(error, req, res, next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";
  let errors = error.errors || [];

  // Customize error message based on error type

  const err = Object.assign({}, error);

  switch (err.name) {
    case "ValidationError":
      message = Object.values(err.errors)
        .map((item) => item.message)
        .join(", ");
      break;
    case "CastError":
      message = `Resource not found: invalid ${err.path}`;
      break;
    case "JsonWebTokenError":
      message = "Token not valid";
      break;
    case "TokenExpiredError":
      message = "Token expired";
      break;
    case "MongoError":
      if (err.code === 11000) {
        message = `Duplicate value for ${Object.keys(err.keyValue)}`;
      }
      break;
    default:
      message: message;
      break;
  }

  // Send response to the user
  res.status(statusCode).json({
    success: false,
    message,
  });
}

export { errorMiddleware };
