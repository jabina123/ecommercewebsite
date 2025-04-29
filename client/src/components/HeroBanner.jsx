// src/components/HeroBanner.jsx
import React from "react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="bg-dark text-white p-5 text-center">
      <h1 className="display-4">Welcome to Our Store</h1>
      <p className="lead">
        Explore the best tech gadgets and accessories at unbeatable prices.
      </p>
      <Link to="/products" className="btn btn-outline-light btn-lg mt-3">
        Shop Now
      </Link>
    </div>
  );
};

export default HeroBanner;
