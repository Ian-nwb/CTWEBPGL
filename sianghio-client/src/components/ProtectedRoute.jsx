import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  // 1.Auth Check
  if (!user || !user.token) {
    return <Navigate to="/auth/signin" replace />;
  }

  // 2. Block Viewer
  if (user.role === "viewer") {
    localStorage.removeItem("user"); // Clean up
    return <Navigate to="/auth/signin" replace />;
  }

  // 3. Block Editor from Users Page
  if (user.role === "editor" && location.pathname.includes("/dashboard/users")) {
    return <Navigate to="/dashboard" replace />; // Send back to main dashboard
  }

  return <Outlet />;
};

export default ProtectedRoute;