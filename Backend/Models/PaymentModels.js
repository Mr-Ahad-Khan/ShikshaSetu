const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Orders",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM("cash", "card", "upi", "netbanking"),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM("pending", "success", "failed", "refunded"),
    allowNull: false,
    defaultValue: "pending",
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
});

module.exports = Payment;
