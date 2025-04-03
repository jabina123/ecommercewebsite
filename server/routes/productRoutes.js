const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getProducts);  

router.post("/", upload.single("image"), createProduct); 

router.route("/:id")
  .get(getProductById)
  .put(protect, upload.single("image"), updateProduct)
  .delete(protect, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

module.exports = router;
