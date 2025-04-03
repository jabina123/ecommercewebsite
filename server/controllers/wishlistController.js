const asyncHandler = require("express-async-handler");
const Wishlist = require("../models/wishlistModel");

const addToWishlist = asyncHandler(async (req, res) => {
    const { product } = req.body;
    const wishlistItem = await Wishlist.create({ user: req.user._id, product });
    res.status(201).json(wishlistItem);
});

const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.find({ user: req.user._id }).populate("product");
    res.json(wishlist);
});

const removeFromWishlist = asyncHandler(async (req, res) => {
    const wishlistItem = await Wishlist.findById(req.params.id);
    if (wishlistItem) {
        await wishlistItem.remove();
        res.json({ message: "Item removed from wishlist" });
    } else {
        res.status(404);
        throw new Error("Wishlist item not found");
    }
});

module.exports = { addToWishlist, getWishlist, removeFromWishlist };
