const express = require("express");
const { addReview, updateReview, deleteReview, getReviews } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, addReview).get(protect, getReviews);
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;