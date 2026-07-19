const Payment = require("../Models/PaymentModels");
const { createCrudController } = require("./crudController");

const crud = createCrudController(Payment, "Payment");

module.exports = {
  createPayment: crud.create,
  getAllPayments: crud.getAll,
  getPaymentById: crud.getById,
  updatePayment: crud.update,
  deletePayment: crud.remove,
};
