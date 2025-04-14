const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get single product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

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

  // Check if the product already exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error("Product already exists");
  }

  // Create a new product
  const product = new Product({
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    seller: req.user._id, // Assign the seller
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update a product (Only Admin or Seller who created the product can update it)
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, brand, category, price, countInStock } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    // Check if the user is the seller or admin
    if (product.seller.toString() === req.user._id.toString() || req.user.role === "admin") {
      product.name = name || product.name;
      product.image = image || product.image;
      product.description = description || product.description;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.price = price || product.price;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(401);
      throw new Error("Not authorized to update this product");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Delete a product (Only Admin or Seller who created the product can delete it)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Check if the user is the seller or admin
    if (product.seller.toString() === req.user._id.toString() || req.user.role === "admin") {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(401);
      throw new Error("Not authorized to delete this product");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Create a product review
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating,
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    // Update product rating
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

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
