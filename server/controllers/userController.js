const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utilities/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    console.log("req.user in getUserProfile:", req.user); // Debugging

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



module.exports = { registerUser, loginUser, getUserProfile };
