import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Banner from "../components/Banner";  // Make sure you have a Banner component

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchAll();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Banner />  {/* Banner appears at the top */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card h-100 shadow">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <Link to={`/product/${product._id}`} className="btn btn-info">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
