const express = require("express");
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  loginCustomer,
  deleteCustomer,
} = require("../Controllers/CustomerController");

const router = express.Router();

router.post("/register", createCustomer);
router.post("/login", loginCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
