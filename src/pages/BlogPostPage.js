import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlog } from '../redux/slices/blogSlice';
import { addComment } from '../redux/slices/commentSlice';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const BlogPostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog.blog);
  const auth = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(getBlog(id));
  }, [dispatch, id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (auth.isAuthenticated) {
      dispatch(addComment({ blogId: id, formData: { text: commentText } }));
      setCommentText('');
    } else {
      // Redirect to login or show a message
    }
  };

  return (
    <Container>
      {blog && (
        <Box mt={5}>
          <Typography variant="h3" component="h1" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            {blog.body}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            By {blog.author.name} on {new Date(blog.createdAt).toLocaleDateString()}
          </Typography>
          <Box mt={5}>
            <Typography variant="h5" component="h2">
              Comments
            </Typography>
            <List>
              {blog.comments.map((comment) => (
                <ListItem key={comment._id}>
                  <ListItemText primary={comment.text} secondary={`By ${comment.author.name} on ${new Date(comment.createdAt).toLocaleDateString()}`} />
                </ListItem>
              ))}
            </List>
            {auth.isAuthenticated && (
              <Box component="form" onSubmit={handleCommentSubmit} mt={3}>
                <TextField
                  label="Add a comment"
                  variant="outlined"
                  fullWidth
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Add Comment
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default BlogPostPage;
