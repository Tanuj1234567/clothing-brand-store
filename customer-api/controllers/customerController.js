const Customer = require("../models/Customer");

// POST /api/customers
const createCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;

    const customer = await Customer.create({ name, email, phone, address });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer
    });
  } catch (error) {
    return next(error);
  }
};

// GET /api/customers?page=1&limit=10&search=john
const getAllCustomers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search ? String(req.query.search).trim() : "";
    const skip = (page - 1) * limit;

    const filter = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
        }
      : {};

    const [customers, total] = await Promise.all([
      Customer.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Customer.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      count: customers.length,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      data: customers
    });
  } catch (error) {
    return next(error);
  }
};

// GET /api/customers/:id
const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: customer
    });
  } catch (error) {
    return next(error);
  }
};

// PUT /api/customers/:id
const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer
    });
  } catch (error) {
    return next(error);
  }
};

// DELETE /api/customers/:id
const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully"
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
};
