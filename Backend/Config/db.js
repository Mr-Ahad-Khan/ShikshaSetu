const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI;

async function initialize() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is required. Add it to Backend/.env before starting the API.");
    }
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed");
    console.error("Check that MONGO_URI is configured and MongoDB Atlas allows this deployment IP.");
    console.error(err.message);

    throw err;
  }
}

module.exports = {
  mongoose,
  initialize,
};
