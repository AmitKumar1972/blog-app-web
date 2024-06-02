import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchUserDetails } from '../redux/slices/authSlice';
import { getCookie } from '../utils/cookies';

const Navbar = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch]);

  const onLogout = async () => {
    await dispatch(logout());
    <Navigate to="/login" />;
  };

  const authLinks = (
    <>
      <Typography variant="h6" component="div">
        {auth.user && `Hello, ${auth.user.name}`}
      </Typography>
      <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
      <Button color="inherit" onClick={onLogout}>Logout</Button>
    </>
  );

  const guestLinks = (
    <>
      <Button color="inherit" component={Link} to="/login">Login</Button>
      <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Blog Application
        </Typography>
        {auth.user ? authLinks : guestLinks}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
