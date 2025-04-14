
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utilities/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log("Registering user:", req.body);

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, role });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request:", email, password); // Debugging

  // Find user by email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // ✅ Add this line to include role
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized, no user found");
  }

  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});
// Get all users (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = { registerUser, loginUser, getUserProfile, getAllUsers,};
