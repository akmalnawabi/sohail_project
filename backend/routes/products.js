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

    // Convert relative URLs to absolute URLs
    const productsWithAbsoluteUrls = products.map((product) => {
      if (product.image && !product.image.startsWith("http")) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        // Ensure the image path includes /uploads/ if it's just a filename
        if (
          !product.image.startsWith("/uploads/") &&
          !product.image.includes("/")
        ) {
          product.image = `${baseUrl}/uploads/${product.image}`;
        } else {
          product.image = `${baseUrl}${
            product.image.startsWith("/") ? "" : "/"
          }${product.image}`;
        }
      }
      return product;
    });

    res.json(productsWithAbsoluteUrls);
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

    // Convert relative URL to absolute URL
    if (product.image && !product.image.startsWith("http")) {
      const baseUrl = process.env.BASE_URL || "http://localhost:5000";
      // Ensure the image path includes /uploads/ if it's just a filename
      if (
        !product.image.startsWith("/uploads/") &&
        !product.image.includes("/")
      ) {
        product.image = `${baseUrl}/uploads/${product.image}`;
      } else {
        product.image = `${baseUrl}${product.image.startsWith("/") ? "" : "/"}${
          product.image
        }`;
      }
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Add new product (admin only)
router.post("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, image, price, color, category, inStock } =
      req.body;

    // Validate required fields
    if (!name || !description || !price || !image) {
      return res.status(400).json({
        error: "Name, description, price, and image are required",
      });
    }

    const product = new Product({
      name,
      description,
      image,
      price: Number(price),
      color,
      category: category || "General",
      inStock: inStock !== undefined ? inStock : true,
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
    const { name, description, image, price, color, category, inStock } =
      req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (image) {
      product.image = image;
    }
    if (price !== undefined) product.price = Number(price);
    if (color !== undefined) product.color = color;
    if (category !== undefined) product.category = category;
    if (inStock !== undefined) product.inStock = inStock;

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
