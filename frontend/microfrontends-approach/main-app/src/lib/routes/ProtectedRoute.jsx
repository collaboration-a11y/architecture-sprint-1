import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = ({ loggedIn }) => {
  if (loggedIn) {
    return <Outlet />;
  }
  return <Navigate to="/signin" />;
};

export default ProtectedRoute;
