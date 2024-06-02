import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Thunks
export const getUserProfile = createAsyncThunk('user/getUserProfile', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getUserBlogs = createAsyncThunk('user/getUserBlogs', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/api/blogs/user');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteBlog = createAsyncThunk('user/deleteBlog', async (id, thunkAPI) => {
  try {
    await axios.delete(`/api/blogs/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (profileData, thunkAPI) => {
  try {
    const response = await axios.put('/api/users/profile', profileData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getUserBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(getUserBlogs.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
