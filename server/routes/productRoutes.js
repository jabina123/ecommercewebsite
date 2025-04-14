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

// Public route: Get all products
router.get("/", getProducts);

// Admin or Seller can create a product (Admin and Seller can access this route)
router.post("/", protect, isSeller, upload.single("image"), createProduct);

// Routes for single product management (only admin/seller can update or delete)
router
  .route("/:id")
  .get(getProductById)
  .put(protect, isAdmin, upload.single("image"), updateProduct)  // Only Admin can update product
  .delete(protect, isAdmin, deleteProduct);  // Only Admin can delete product

// Create a review for a product (auth required)
router.route("/:id/reviews").post(protect, createProductReview);

module.exports = router;
