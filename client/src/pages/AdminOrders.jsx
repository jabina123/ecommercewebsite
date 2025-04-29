// src/pages/AdminOrders.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(""); // ✅ define setError state

  const { userInfo } = useSelector((state) => state.auth); // ✅ fix userInfo undefined

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };
        const { data } = await axios.get("/api/orders", config);
        setOrders(data);
      } catch (err) {
        console.error("Order fetch failed:", err);
        setError("Failed to load orders");
      }
    };
  
    if (userInfo?.token) {
      fetchOrders();
    }
  }, [userInfo?.token]); // ✅ Added this dependency
  
  return (
    <div className="container mt-4">
      <h2>All Orders</h2>
      {error && <p className="text-danger">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
  {orders.map((order) => (
    <tr key={order._id}>
      <td>{order._id}</td>
      <td>{order.user?.name || "N/A"}</td>
      <td>${Number(order.totalPrice || 0).toFixed(2)}</td>
      <td>{order.isPaid ? "Yes" : "No"}</td>
      <td>{order.isDelivered ? "Yes" : "No"}</td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
};

export default AdminOrders;
