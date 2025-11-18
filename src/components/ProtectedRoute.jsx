import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    //if not logged in, send to login page
    return <Navigate to="/login" replace />;
  }

  //if logged in, show the original page
  return children;
}
