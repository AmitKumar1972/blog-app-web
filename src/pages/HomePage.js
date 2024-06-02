import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../redux/slices/blogSlice';
import BlogList from '../components/BlogList';
import { Container, Typography, Box, TextField } from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getBlogs());
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
        <BlogList blogs={filteredBlogs} />
      </Box>
    </Container>
  );
};

export default HomePage;
