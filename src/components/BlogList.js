import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Grid, CardMedia, CardActionArea } from '@mui/material';

const BlogList = ({ blogs }) => {
  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              <CardActionArea component={Link} to={`/blog/${blog._id}`} style={{ textDecoration: 'none' }}>
                {blog.image && (
                  <CardMedia
                    component="img"
                    alt={blog.title}
                    height="200"
                    image={blog.image}
                    title={blog.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" component="p" paragraph>
                    {blog.body.substring(0, 200)}...
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    By {blog.author.name} on {new Date(blog.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;
