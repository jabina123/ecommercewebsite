import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice"; // Assuming you have a clearCart action

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Logout user
    dispatch(clearCart()); // Clear cart on logout
    // Optionally, redirect the user to the login page or home page
    window.location.href = "/login"; // For example
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
