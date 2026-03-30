const express = require("express");
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");
const validateCustomerBody = require("../middleware/validateCustomer");

const router = express.Router();

router.route("/").post(validateCustomerBody, createCustomer).get(getAllCustomers);

router.route("/:id").get(getCustomerById).put(validateCustomerBody, updateCustomer).delete(deleteCustomer);

module.exports = router;
