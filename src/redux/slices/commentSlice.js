import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Thunks
export const addComment = createAsyncThunk('comment/addComment', async ({ blogId, formData }, thunkAPI) => {
  try {
    const response = await axios.post(`/api/comments/${blogId}`, formData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteComment = createAsyncThunk('comment/deleteComment', async (commentId, thunkAPI) => {
  try {
    await axios.delete(`/api/comments/${commentId}`);
    return commentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
