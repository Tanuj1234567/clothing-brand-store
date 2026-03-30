const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateCustomerBody = (req, res, next) => {
  const { name, email, phone, address } = req.body;

  if (req.method === "POST") {
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "name and email are required"
      });
    }
  }

  if (email && !validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format"
    });
  }

  if (phone && typeof phone !== "string") {
    return res.status(400).json({
      success: false,
      message: "phone must be a string"
    });
  }

  if (address && typeof address !== "string") {
    return res.status(400).json({
      success: false,
      message: "address must be a string"
    });
  }

  next();
};

module.exports = validateCustomerBody;
