import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Thunks
export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    // Set token in cookies
    document.cookie = `token=${response.data.token}; path=/; secure; HttpOnly`;
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  // Clear token from cookies
  document.cookie = 'token=; Max-Age=0; path=/;';
  return;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: true,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
