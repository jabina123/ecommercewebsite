import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSellerOrders } from '../redux/actions/sellerActions';



const SellerDashboard = () => {
  const dispatch = useDispatch();

  // Access seller data from Redux store with a fallback to an empty array if it's undefined
  const { sellerOrders = [], loading, error } = useSelector((state) => state.seller || {});

  // Fetch orders when the component mounts
  useEffect(() => {
    dispatch(getSellerOrders()); // Dispatch the action to fetch seller orders
  }, [dispatch]);

  // Display loading or error messages if necessary
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Display orders if available
  if (!sellerOrders.length) {
    return <p>No orders available.</p>;
  }

  return (
    <div>
      <h2>Seller Orders</h2>
      <ul>
        {sellerOrders.map((order) => (
          <li key={order._id}>
            {order.productName} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerDashboard;
