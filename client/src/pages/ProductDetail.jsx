import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Import addToCart action

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Add product to cart
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Price: ${product.price}</strong></p>
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}  // Add product to cart
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
