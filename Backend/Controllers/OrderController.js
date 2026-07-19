const Order = require("../Models/OrderModels");
const { createCrudController } = require("./crudController");

const crud = createCrudController(Order, "Order");

module.exports = {
  createOrder: crud.create,
  getAllOrders: crud.getAll,
  getOrderById: crud.getById,
  updateOrder: crud.update,
  deleteOrder: crud.remove,
};
