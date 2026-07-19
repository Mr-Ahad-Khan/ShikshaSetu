const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initialize } = require("./Config/db");
const productRoutes = require("./Routes/ProductRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin))
        return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS"));
    },
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "ShikshaSetu API is running" });
});

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/api/products", productRoutes);

const startServer = async () => {
  try {
    await initialize();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server start nahi hua:", error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
