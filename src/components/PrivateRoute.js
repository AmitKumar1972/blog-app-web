import React from 'react';
import { Navigate } from 'react-router-dom';

// Helper function to get cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const PrivateRoute = ({ children }) => {
  const token = getCookie('token');

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
