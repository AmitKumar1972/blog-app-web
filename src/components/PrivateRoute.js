import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const auth = useSelector((state) => state.auth);

  return auth.isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
