import React from "react";
import { Route, Navigate } from "react-router-dom"; // Import Navigate here

const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  const isAuthenticated = token && role;
  const hasAccess = requiredRole === role;

  if (!isAuthenticated || !hasAccess) {
    return <Navigate to="/login" replace />; // Use Navigate for redirection
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
