const express = require("express");
const admin = require("../Controllers/AdminController");
const customer = require("../Controllers/CustomerController");
const order = require("../Controllers/OrderController");
const payment = require("../Controllers/PaymentController");
const product = require("../Controllers/ProductController");

const router = express.Router();

function addCrudRoutes(path, handlers) {
  router.post(path, handlers.create);
  router.get(path, handlers.getAll);
  router.get(`${path}/:id`, handlers.getById);
  router.put(`${path}/:id`, handlers.update);
  router.delete(`${path}/:id`, handlers.remove);
}

addCrudRoutes("/admins", {
  create: admin.createAdmin,
  getAll: admin.getAllAdmins,
  getById: admin.getAdminById,
  update: admin.updateAdmin,
  remove: admin.deleteAdmin,
});
router.post("/admins/login", admin.loginAdmin);

addCrudRoutes("/customers", {
  create: customer.createCustomer,
  getAll: customer.getAllCustomers,
  getById: customer.getCustomerById,
  update: customer.updateCustomer,
  remove: customer.deleteCustomer,
});
router.post("/customers/login", customer.loginCustomer);

addCrudRoutes("/products", {
  create: product.createProduct,
  getAll: product.getAllProducts,
  getById: product.getProductById,
  update: product.updateProduct,
  remove: product.deleteProduct,
});

addCrudRoutes("/orders", {
  create: order.createOrder,
  getAll: order.getAllOrders,
  getById: order.getOrderById,
  update: order.updateOrder,
  remove: order.deleteOrder,
});

addCrudRoutes("/payments", {
  create: payment.createPayment,
  getAll: payment.getAllPayments,
  getById: payment.getPaymentById,
  update: payment.updatePayment,
  remove: payment.deletePayment,
});

module.exports = router;
