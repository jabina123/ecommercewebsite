// src/pages/AdminEditProduct.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminEditProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // To get the product id from the URL
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };
        const { data } = await axios.get(`/api/products/${id}`, config);
        setProduct(data); // Set the fetched product data
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    if (userInfo && userInfo.role === "admin") {
      fetchProduct();
    }
  }, [userInfo, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      await axios.put(`/api/products/${id}`, product, config); // Sending the updated product data
      navigate("/admin/products"); // Navigate back to the product list page
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  // If product data is not yet fetched, show a loading indicator
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="countInStock" className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            id="countInStock"
            value={product.countInStock}
            onChange={(e) => setProduct({ ...product, countInStock: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
