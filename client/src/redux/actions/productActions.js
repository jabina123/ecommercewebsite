// src/redux/actions/productActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get seller products
export const getSellerProducts = createAsyncThunk(
  "product/getSellerProducts",
  async () => {
    const response = await axios.get("/api/products/seller");
    return response.data;
  }
);

// Delete seller product
export const deleteSellerProduct = createAsyncThunk(
  "product/deleteSellerProduct",
  async (productId) => {
    await axios.delete(`/api/products/${productId}`);
    return productId;
  }
);

// Get all products (for Admin)
export const getAllProducts = createAsyncThunk(
  "admin/getAllProducts",
  async () => {
    const response = await axios.get("/api/products");
    return response.data;
  }
);

// Delete any product (for Admin)
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId) => {
    await axios.delete(`/api/products/${productId}`);
    return productId;
  }
);
