const {
  AllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");

const express = require("express");
const router = express.Router();

router.get("/users", AllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
