// Importing required modules using CommonJS syntax
const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/adminController.js");
const { protect, isAdmin } = require("../middleware/authMiddleware.js");

const router = express.Router();

// GET all users (admin only)
router.get("/users", protect, isAdmin, getAllUsers);

// DELETE a user (admin only)
router.delete("/users/:id", protect, isAdmin, deleteUser);

// Exporting the router using CommonJS syntax
module.exports = router;
