import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPostPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AddBlogPage from './pages/AddBlogPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ConditionalNavbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add-blog" element={<PrivateRoute><AddBlogPage /></PrivateRoute>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];
  return !hideNavbarPaths.includes(location.pathname) && <Navbar />;
};

export default App;
