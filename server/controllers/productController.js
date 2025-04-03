const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinaryConfig");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin


// Create Product
const createProduct = asyncHandler(async (req, res) => {
    console.log("Received body data:", req.body);
    console.log("Received file data:", req.file); // Check if file is uploaded

    const { name, price, description, category, brand, countInStock } = req.body;
    const image = req.file ? req.file.path : null; // Get image from Cloudinary

    if (!name || !price || !description || !category || !brand || !countInStock || !image) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const product = await Product.create({
        name,
        price,
        description,
        category,
        brand,
        countInStock,
        image, // Store Cloudinary URL
    });

    if (product) {
        res.status(201).json(product);
    } else {
        res.status(400);
        throw new Error("Invalid product data");
    }
});





  

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    // If a new image is uploaded, replace the old one
    if (req.file) {
        // Delete old image from Cloudinary
        await cloudinary.uploader.destroy(product.cloudinary_id);

        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        product.image = result.secure_url;
        product.cloudinary_id = result.public_id;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(product.cloudinary_id);

    await product.remove();
    res.json({ message: "Product removed" });
});



const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});



module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,createProductReview
};
