const express = require("express");
const { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getOrders);
router.route("/:id").get(protect, getOrderById).put(protect, updateOrderStatus).delete(protect, deleteOrder);

module.exports = router;
