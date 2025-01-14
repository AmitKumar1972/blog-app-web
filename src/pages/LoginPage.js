import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useForm } from '@mantine/form';
import { getCookie } from '../utils/cookies';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSubmit = async (values) => {
    setEmailError('');
    setPasswordError('');
    setError('');
    setLoading(true);
    try {
      await dispatch(login({
        email: values.email,
        password: values.password,
      })).unwrap();

      <Navigate to="/" />;

    } catch (error) {
      setLoading(false);
      const errorMessage = error.msg || error.response?.data?.message || 'An error occurred. Please try again later.';
      if (errorMessage.includes('Invalid Password')) {
        setPasswordError('The password you entered is incorrect.');
      } else if (errorMessage.includes('Invalid credentials')) {
        setEmailError('No account exists with the provided email address.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }

  };

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
    },
  });


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh'
      }}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          maxWidth: 400,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)} sx={{ mt: 1, mb: 4 }}>
          <TextField
            {...form.getInputProps('email')}
            error={!!emailError || form.errors.email !== undefined}
            helperText={emailError || form.errors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type='email'
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            {...form.getInputProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!passwordError || form.errors.password !== undefined}
            helperText={passwordError || form.errors.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
          {error && <Typography color="error" align="center">{error}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
