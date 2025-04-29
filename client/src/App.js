// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import AdminOrders from "./pages/AdminOrders"; // ✅ new import
import AdminProducts from "./pages/AdminProducts";
import AdminRoute from "./components/AdminRoute";
import SellerRoute from "./components/SellerRoute";
import AdminEditProduct from "./pages/AdminEditProduct";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />

        {/* 🔐 Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} /> {/* ✅ added orders route */}
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route path="/admin/products/:id/edit" element={<AdminRoute />}>
  <Route index element={<AdminEditProduct />} />
</Route>



        {/* 🔐 Seller Dashboard */}
        <Route path="/seller" element={<SellerRoute />}>
          <Route path="dashboard" element={<SellerDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
