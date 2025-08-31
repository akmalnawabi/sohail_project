const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Import models
const User = require("./models/User");
const Product = require("./models/Product");

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to E-commerce Backend API" });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Test route to check models
app.get("/api/test-models", async (req, res) => {
  try {
    // Test User model
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();

    res.json({
      message: "Models are working correctly!",
      userCount,
      productCount,
      models: ["User", "Product"],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Use authentication routes
app.use("/api/auth", authRoutes);

// Use product routes
app.use("/api/products", productRoutes);

// Define port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start server after database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Server URL: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });

module.exports = app;
