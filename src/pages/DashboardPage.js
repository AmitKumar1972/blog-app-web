import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBlogs, deleteBlog, updateUserProfile } from '../redux/slices/userSlice';
import { Container, Typography, Box, Button, TextField, CircularProgress } from '@mui/material';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userBlogs = useSelector((state) => state.user.blogs);
  const [name, setName] = useState(auth.user.name);
  const [profilePicture, setProfilePicture] = useState(auth.user.profilePicture);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getUserBlogs());
    }
  }, [dispatch, auth.isAuthenticated]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateUserProfile({ name, profilePicture }))
      .finally(() => setLoading(false));
  };

  const handleBlogDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Box component="form" onSubmit={handleProfileUpdate} mb={5}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Profile Picture URL"
            variant="outlined"
            fullWidth
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Update Profile'}
          </Button>
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          My Blogs
        </Typography>
        {userBlogs.map((blog) => (
          <Box key={blog._id} mb={3}>
            <Typography variant="h5">{blog.title}</Typography>
            <Typography variant="body2">{blog.body.substring(0, 100)}...</Typography>
            <Button variant="contained" color="secondary" onClick={() => handleBlogDelete(blog._id)} sx={{ mt: 1 }}>
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default DashboardPage;
