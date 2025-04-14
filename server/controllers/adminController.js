const User = require("../models/userModel.js");

// Get all users
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}); // This line fetches all users from the DB
        res.json(users); // Return users in the response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.remove();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};

module.exports = { getAllUsers, deleteUser };
