const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://ahad998867_db_user:nBRDDQnbwS6wjwKi@cluster0.fn5exhp.mongodb.net/";

async function initialize() {
  try {
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
