import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsers, deleteUser } from "../redux/actions/adminActions"; // You will need to create actions for admin
import { getAllProducts, deleteProduct } from "../redux/actions/productActions"; // You will need to create actions for products

const AdminDashboard = () => {
  const dispatch = useDispatch();
 

  // Redux state
  const { users, products, loading, error } = useSelector((state) => state.admin);

  // Fetch users and products when the admin dashboard loads
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId)); // Add logic for deleting user
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId)); // Add logic for deleting product
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p>Loading...</p>}

      <h3>Users</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Products</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
