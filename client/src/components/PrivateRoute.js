
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
