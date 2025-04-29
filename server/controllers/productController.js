const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get single product by ID
const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    res.status(400);
    throw new Error("Product ID is required");
  }

  const product = await Product.findById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Create a new product (Seller can create products)
const createProduct = asyncHandler(async (req, res) => {
  const { name, image, description, brand, category, price, countInStock } = req.body;

  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const product = new Product({
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    seller: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const {
      name,
      price,
      countInStock,
      image,
      description,
      brand,
      category,
    } = req.body;

    product.name = name || product.name;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;
    product.image = image || product.image;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const userId = req.user?._id?.toString();
  const sellerId = product.seller?.toString();

  if (userId === sellerId || req.user.role === "admin") {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(401);
    throw new Error("Not authorized to delete this product");
  }
});

// Create a product review
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
  deleteProduct,
  createProductReview,
};
