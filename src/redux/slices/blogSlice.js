import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const getBlogs = createAsyncThunk('blog/getBlogs', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/api/blogs');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getBlog = createAsyncThunk('blog/getBlog', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`/api/blogs/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addBlog = createAsyncThunk('blog/addBlog', async (formData, thunkAPI) => {
  try {
    const response = await axios.post('/api/blogs', formData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateBlog = createAsyncThunk('blog/updateBlog', async ({ id, formData }, thunkAPI) => {
  try {
    const response = await axios.put(`/api/blogs/${id}`, formData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id, thunkAPI) => {
  try {
    await axios.delete(`/api/blogs/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    blog: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.loading = false;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        state.loading = false;
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default blogSlice.reducer;
