const express = require("express");
const router = express.Router();
const { authenticateToken, requireAdmin } = require("../middleware/auth");
const { uploadSingle } = require("../middleware/upload");
const path = require("path");

// Helper function to generate absolute URL
const generateImageUrl = (filename) => {
  // Use environment variable or detect from request
  let baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    // Fallback: detect from request or use default
    baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://afghanproducts.onrender.com"
        : "http://localhost:5000";
  }

  return `${baseUrl}/uploads/${filename}`;
};

// Single image upload (admin only)
router.post("/single", authenticateToken, requireAdmin, (req, res) => {
  uploadSingle(req, res, function (err) {
    if (err) {
      // Handle multer errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "File too large. Maximum size is 5MB." });
      }
      return res.status(400).json({ error: err.message });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Return success with file info
    res.json({
      message: "Image uploaded successfully",
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: generateImageUrl(req.file.filename),
    });
  });
});

// Get uploaded image (public route for serving images)
router.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../uploads", filename);

  res.sendFile(filepath, (err) => {
    if (err) {
      console.error(`Image not found: ${filename}`, err.message);
      res.status(404).json({
        error: "Image not found",
        filename: filename,
        message: "The requested image could not be found on the server",
      });
    }
  });
});

module.exports = router;
