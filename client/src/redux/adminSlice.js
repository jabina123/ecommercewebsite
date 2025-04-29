import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, deleteUser, getAllProducts, deleteProduct } from "./actions/adminActions";


const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // USERS
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PRODUCTS
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      // DELETES
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
