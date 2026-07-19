const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  loginOrder,
  deleteOrder,
} = require("../Controllers/OrderController");

const router = express.Router();

router.post("/register", createOrder);
// loginOrder was not implemented in OrderController; avoid registering an undefined handler.
// router.post("/login", loginOrder);

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
