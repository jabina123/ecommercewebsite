import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  useEffect(() => {

    console.log("Product ID from useParams:", id); 
    const fetchProduct = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };
        const { data } = await axios.get(`/api/products/${id}`, config);
        setProduct(data);
        setName(data.name);
        setPrice(data.price);
        setCountInStock(data.countInStock);
      } catch (error) {
        console.error("Error loading product", error);
      }
    };

    if (userInfo && userInfo.role === "admin") {
      fetchProduct();
    }
  }, [id, userInfo]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      await axios.put(`/api/products/${id}`, { name, price, countInStock }, config);
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>✏️ Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Stock Count</label>
          <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
