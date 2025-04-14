const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Get orders for a specific seller (based on seller's products)
const getSellerOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ "orderItems.seller": req.user._id });
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this seller." });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { getSellerOrders };
