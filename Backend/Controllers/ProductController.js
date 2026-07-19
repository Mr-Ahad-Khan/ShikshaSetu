const Product = require("../Models/ProductModels");

function sendError(res, error, action) {
  const invalidRequest = error.name === "ValidationError" || error.name === "CastError";
  return res.status(invalidRequest ? 400 : 500).json({
    message: `Unable to ${action} product`,
    ...(invalidRequest ? { error: error.message } : {}),
  });
}

const createProduct = async (req, res) => {
  try { return res.status(201).json(await Product.create(req.body)); }
  catch (error) { return sendError(res, error, "create"); }
};
const getAllProducts = async (_req, res) => {
  try { return res.status(200).json(await Product.find().sort({ createdAt: -1 })); }
  catch (error) { return sendError(res, error, "fetch"); }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return product ? res.status(200).json(product) : res.status(404).json({ message: "Product not found" });
  } catch (error) { return sendError(res, error, "fetch"); }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return product ? res.status(200).json(product) : res.status(404).json({ message: "Product not found" });
  } catch (error) { return sendError(res, error, "update"); }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return product ? res.status(200).json({ message: "Product deleted successfully" }) : res.status(404).json({ message: "Product not found" });
  } catch (error) { return sendError(res, error, "delete"); }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
