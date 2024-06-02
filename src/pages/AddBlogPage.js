import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../redux/slices/blogSlice';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Editor from '../components/Editor';
import { Navigate } from 'react-router-dom';

const AddBlogPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addBlog({ title, body: content })).unwrap();
    <Navigate to="/" />;
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Blog
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, mb: 4 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor content={content} onChange={setContent} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Blog
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddBlogPage;
