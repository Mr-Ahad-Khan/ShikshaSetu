// Ensure the Sequelize instance exports are always the actual Sequelize instance.
// (Some files in this repo previously imported the wrong export.)
require("./AdminModels");
require("./CustomerModels");
require("./OrderModels");
require("./PaymentModels");
require("./ProductModels");

const Customer = require("./CustomerModels");
const Order = require("./OrderModels");
const Product = require("./ProductModels");
const Payment = require("./PaymentModels");

Customer.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(Customer, { foreignKey: "customerId" });

Product.hasMany(Order, { foreignKey: "productId" });
Order.belongsTo(Product, { foreignKey: "productId" });

Order.hasOne(Payment, { foreignKey: "orderId" });
Payment.belongsTo(Order, { foreignKey: "orderId" });

module.exports = {
  Customer,
  Order,
  Product,
  Payment,
};
