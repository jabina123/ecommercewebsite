const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");

const addReview = asyncHandler(async (req, res) => {
    const { product, rating, review } = req.body;
    const newReview = await Review.create({ user: req.user._id, product, rating, review });
    res.status(201).json(newReview);
});

const getReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.query.product }).populate("user", "name");
    res.json(reviews);
});

const updateReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
        review.rating = req.body.rating || review.rating;
        review.review = req.body.review || review.review;
        const updatedReview = await review.save();
        res.json(updatedReview);
    } else {
        res.status(404);
        throw new Error("Review not found");
    }
});

const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
        await review.remove();
        res.json({ message: "Review removed" });
    } else {
        res.status(404);
        throw new Error("Review not found");
    }
});

module.exports = { addReview, getReviews, updateReview, deleteReview };
