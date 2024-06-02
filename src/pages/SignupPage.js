import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { register } from '../redux/slices/authSlice';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { name, email, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        {auth.error && <Alert severity="error">{auth.error}</Alert>}
        <form onSubmit={onSubmit}>
          <Box mb={2}>
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              label="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              fullWidth
              type="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              fullWidth
              type="password"
              label="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
