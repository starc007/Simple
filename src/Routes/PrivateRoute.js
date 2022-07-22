import React from "react";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const isValidToken = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("Stoken");
  if (!token) {
    return <Navigate to="/" />;
  }

  const isValid = isValidToken(token);
  return isValid ? children : <Navigate to="/" />;
};

export default PrivateRoute;
