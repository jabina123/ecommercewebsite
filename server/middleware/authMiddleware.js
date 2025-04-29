const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the token exists in the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token from the authorization header
            token = req.headers.authorization.split(" ")[1];
            console.log("Token Extracted:", token);  // Log token for debugging

            // Check if token is null or undefined
            if (!token) {
                res.status(401);
                throw new Error("Token not provided");
            }

            // Verify the token and decode it
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded);  // Log decoded token

            // Attach user to the request object
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                res.status(404);
                throw new Error("User not found");
            }

            console.log("Authenticated User:", req.user);  // Log authenticated user

            // Proceed to next middleware or route handler
            next();
        } catch (error) {
            console.error("Token Verification Error:", error);  // Log any token verification errors
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

const isAdmin = (req, res, next) => {
    console.log("User trying to access admin route:", req.user);
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an admin");
    }
  };
  

const isSeller = (req, res, next) => {
    if (req.user && req.user.role === "seller") {
        next();  // Proceed if the user is a seller
    } else {
        console.log("User is not a seller:", req.user);  // Log user for debugging
        res.status(401);
        throw new Error("Not authorized as seller");
    }
};

module.exports = { protect, isAdmin, isSeller };
