const express = require("express");
const { registerUser, loginUser, getUserProfile,
    getAllUsers, } = require("../controllers/userController");

const { protect, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.route("/").get(protect, isAdmin, getAllUsers); // ✅ This route is protected & admin-only
module.exports = router;



