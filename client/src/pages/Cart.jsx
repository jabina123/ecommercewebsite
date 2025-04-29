import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice"; // Import actions

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart); // Access cart items from store
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId)); // Dispatch remove action
  };

  const handleClearCart = () => {
    dispatch(clearCart()); // Dispatch clear cart action
  };

  return (
    <div className="container my-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item._id} className="list-group-item d-flex justify-content-between">
                <span>{item.name}</span>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-warning mt-3" onClick={handleClearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
