import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ userInfo, children }) {
  if (!userInfo) {
    return <Navigate to="/signin" />;
  }
  return children;
}

export default ProtectedRoute;
