const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: String,
        qty: Number,
        price: Number,
        image: String,
      },
    ],
    totalAmount: { type: Number, required: true }, // Changed from totalPrice to totalAmount
    status: { type: String, default: "Pending" },
    paymentStatus: { type: String, default: "Unpaid" },
    deliveryStatus: { type: String, default: "Not Delivered" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
