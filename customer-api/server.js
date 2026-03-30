const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Customer Management API is running."
  });
});

app.get("/health/db", (_req, res) => {
  const state = mongoose.connection.readyState;
  const stateMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };

  const status = stateMap[state] || "unknown";
  const ok = status === "connected";

  return res.status(ok ? 200 : 503).json({
    success: ok,
    database: {
      status,
      host: mongoose.connection.host || null,
      name: mongoose.connection.name || null
    }
  });
});

app.use("/api/customers", customerRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
