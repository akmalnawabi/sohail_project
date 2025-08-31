const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
    },
    color: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search functionality
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
