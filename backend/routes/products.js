const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

// Get all products (public route)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get single product by ID (public route)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Add new product (admin only)
router.post("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, image, price, color } = req.body;

    // Validate required fields
    if (!name || !description || !image || !price || !color) {
      return res.status(400).json({
        error: "Name, description, image, price, and color are required",
      });
    }

    const product = new Product({
      name,
      description,
      image,
      price: Number(price),
      color,
    });

    await product.save();
    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Update product (admin only)
router.put("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, image, price, color } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (image) product.image = image;
    if (price) product.price = Number(price);
    if (color) product.color = color;

    await product.save();
    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete product (admin only)
router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
