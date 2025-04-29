
const express = require("express");
const { getAllOrders } = require("../controllers/orderController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/orders - Get all orders (admin only)
router.get("/", protect, isAdmin, getAllOrders);

module.exports = router;
