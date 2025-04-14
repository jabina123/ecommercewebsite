const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");  // Assuming protect middleware is for user auth

router.route("/").post(protect, createOrder);  // POST /api/orders to create order

module.exports = router;
