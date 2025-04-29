import { createSlice } from "@reduxjs/toolkit";

const initialCart = JSON.parse(localStorage.getItem("cart")) || {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart, // Initialize cart with data from localStorage
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state)); // Save cart to localStorage
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state)); // Save updated cart
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart"); // Clear cart from localStorage
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
