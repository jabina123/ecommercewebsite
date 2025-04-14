const express = require("express");
const router = express.Router();
const { getSellerOrders } = require("../controllers/sellerController");
const { protect, isSeller } = require("../middleware/authMiddleware");


router.route("/orders").get(protect, isSeller, getSellerOrders);
module.exports = router;
