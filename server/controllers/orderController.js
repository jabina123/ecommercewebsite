const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Create order
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, totalAmount, status, paymentStatus, deliveryStatus } = req.body;

  // Ensure orderItems is not empty
  if (orderItems.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  }

  // Enrich the orderItems with seller information
  const enrichedOrderItems = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item.product);
      
      // If product not found, return an error
      if (!product) {
        res.status(400).json({ message: `Product with id ${item.product} not found` });
        return;
      }

      return {
        ...item,
        seller: product.seller, // Attach seller from the product
      };
    })
  );

  // Create the order
  const order = new Order({
    user: req.user._id, // User placing the order
    orderItems: enrichedOrderItems,
    totalAmount,
    status: status || "Pending",
    paymentStatus: paymentStatus || "Unpaid",
    deliveryStatus: deliveryStatus || "Not Delivered",
  });

  // Save the order and return the created order
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

module.exports = { createOrder };
