const express = require("express");
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../Controllers/PaymentController");

const router = express.Router();

router.post("/", createPayment);
router.post("/register", createPayment);

router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
