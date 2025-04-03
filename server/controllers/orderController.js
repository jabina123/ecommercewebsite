const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const createOrder = asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body); // Debugging line

    const { orderItems, totalAmount, status, paymentStatus, deliveryStatus } = req.body;

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    }

    if (!totalAmount) {
        res.status(400);
        throw new Error("Total amount is required");
    }

    const order = await Order.create({
        user: req.user._id,
        orderItems,
        totalAmount,
        status,
        paymentStatus,
        deliveryStatus,
    });

    res.status(201).json(order);
});


const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate("orderItems.product");
    res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("orderItems.product");
    if (order) res.json(order);
    else {
        res.status(404);
        throw new Error("Order not found");
    }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.status = req.body.status || order.status;
        order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
        order.deliveryStatus = req.body.deliveryStatus || order.deliveryStatus;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        await order.remove();
        res.json({ message: "Order removed" });
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder };
