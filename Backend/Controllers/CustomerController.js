const Customer = require("../Models/CustomerModels");
const { createCrudController, sendError } = require("./crudController");

const crud = createCrudController(Customer, "Customer");

const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const customer = await Customer.findOne({ where: { email } });
    if (!customer || customer.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const safeCustomer = customer.toJSON();
    delete safeCustomer.password;
    return res.status(200).json({
      message: "Login successful",
      customer: safeCustomer,
    });
  } catch (error) {
    return sendError(res, error, "log in", "Customer");
  }
};

module.exports = {
  createCustomer: crud.create,
  getAllCustomers: crud.getAll,
  getCustomerById: crud.getById,
  loginCustomer,
  updateCustomer: crud.update,
  deleteCustomer: crud.remove,
};
