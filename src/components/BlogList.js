import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

const BlogList = ({ blogs }) => {
  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <Link to={`/blog/${blog._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {blog.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {blog.body.substring(0, 100)}...
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  By {blog.author.name} on {new Date(blog.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;
