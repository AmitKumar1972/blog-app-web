import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  const authLinks = (
    <>
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
        {auth.isAuthenticated ? authLinks : guestLinks}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
