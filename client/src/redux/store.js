// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import adminReducer from "./adminSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    admin: adminReducer,
    product: productReducer,
  },
});

export default store;
