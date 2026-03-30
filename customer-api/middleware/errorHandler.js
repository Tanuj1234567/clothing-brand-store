const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid customer ID format"
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Email already exists"
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
};

module.exports = errorHandler;
