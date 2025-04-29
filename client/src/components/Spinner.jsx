import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="spinner-border text-teal" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
