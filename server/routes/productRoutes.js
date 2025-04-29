const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");

const { protect, isAdmin, isSeller } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// ✅ Admin-only route to get all products
router.get("/admin", protect, isAdmin, getProducts);

// 🌐 Public route: Get all products (home/shop page)
router.get("/", getProducts);

// 🆕 Create product (Admin or Seller only, with image upload)
router.post("/", protect, isSeller, upload.single("image"), createProduct);

// 🔍 Get single product details (public)
router.get("/:id", getProductById);

// 📝 Add a product review (Logged-in users only)
router.post("/:id/reviews", protect, createProductReview);

// 🔄 Update a product (Admin only, with image upload)
router.put("/:id", protect, isAdmin, upload.single("image"), updateProduct);

// ❌ Delete a product (Admin only)
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;
