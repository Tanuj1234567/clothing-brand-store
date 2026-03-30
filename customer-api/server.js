const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

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

app.use("/api/customers", customerRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
