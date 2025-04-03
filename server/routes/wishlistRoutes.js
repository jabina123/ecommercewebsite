const express = require("express");
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, addToWishlist).get(protect, getWishlist);
router.route("/:id").delete(protect, removeFromWishlist);

module.exports = router;