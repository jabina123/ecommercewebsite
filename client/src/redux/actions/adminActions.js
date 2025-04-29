import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Utility to get token from state
const getAuthConfig = (thunkAPI) => {
  const { auth } = thunkAPI.getState();

  if (!auth || !auth.userInfo || !auth.userInfo.token) {
    throw new Error("User not authenticated");
  }

  return {
    headers: {
      Authorization: `Bearer ${auth.userInfo.token}`,
    },
  };
};

// Get all users
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async (_, thunkAPI) => {
  try {
    const config = getAuthConfig(thunkAPI);
    const response = await axios.get("/api/users", config);
    return response.data;
  } catch (error) {
    console.error("Get users error:", error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Get all products (assuming public)
export const getAllProducts = createAsyncThunk("admin/getAllProducts", async () => {
  const response = await axios.get("/api/products");
  return response.data;
});

// Delete user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, thunkAPI) => {
  try {
    const config = getAuthConfig(thunkAPI);
    await axios.delete(`/api/users/${userId}`, config);
    return userId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Delete product
export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (productId, thunkAPI) => {
  try {
    const config = getAuthConfig(thunkAPI);
    await axios.delete(`/api/products/${productId}`, config);
    return productId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});
