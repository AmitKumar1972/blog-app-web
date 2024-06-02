import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../redux/slices/userSlice';
import BlogList from '../components/BlogList';
import { Container, Typography, Box, Avatar } from '@mui/material';

const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.profile);

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  return (
    <Container>
      {userProfile && (
        <Box mt={5}>
          <Box display="flex" alignItems="center" mb={5}>
            <Avatar alt={userProfile.name} src={userProfile.profilePicture} sx={{ width: 100, height: 100, mr: 3 }} />
            <Typography variant="h4" component="h1">
              {userProfile.name}
            </Typography>
          </Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Blogs by {userProfile.name}
          </Typography>
          <BlogList blogs={userProfile.blogs} />
        </Box>
      )}
    </Container>
  );
};

export default ProfilePage;
