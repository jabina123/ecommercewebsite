import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get seller orders
export const getSellerOrders = createAsyncThunk("order/getSellerOrders", async () => {
  const response = await axios.get("/api/orders/seller");
  return response.data;
});
