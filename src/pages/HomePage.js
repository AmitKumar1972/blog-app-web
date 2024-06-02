import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../redux/slices/blogSlice';
import BlogList from '../components/BlogList';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { getCookie } from '../utils/cookies';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    dispatch(getBlogs());
    const token = getCookie('token');
    setIsAuthenticated(!!token);
  }, [dispatch]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Blogs
        </Typography>
        <TextField
          label="Search Blogs"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isAuthenticated ? (
          <Button component={Link} to="/dashboard" variant="contained" color="primary" sx={{ mt: 2 }}>
            Go to Dashboard
          </Button>
        ) : (
          <Button component={Link} to="/login" variant="contained" color="primary" sx={{ mt: 2 }}>
            Login
          </Button>
        )}
        <BlogList blogs={filteredBlogs} />
      </Box>
    </Container>
  );
};

export default HomePage;
