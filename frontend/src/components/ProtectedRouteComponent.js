import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, allowedRole, children }) => {
  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/user-dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
