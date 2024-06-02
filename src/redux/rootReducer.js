import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';
import commentReducer from './slices/commentSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  comment: commentReducer,
});

export default rootReducer;
