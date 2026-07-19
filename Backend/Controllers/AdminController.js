const Admin = require("../Models/AdminModels");
const { createCrudController, sendError } = require("./crudController");

const crud = createCrudController(Admin, "Admin");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const safeAdmin = admin.toJSON();
    delete safeAdmin.password;
    return res.status(200).json({ message: "Login successful", admin: safeAdmin });
  } catch (error) {
    return sendError(res, error, "log in", "Admin");
  }
};

module.exports = {
  createAdmin: crud.create,
  getAllAdmins: crud.getAll,
  getAdminById: crud.getById,
  loginAdmin,
  updateAdmin: crud.update,
  deleteAdmin: crud.remove,
};
