import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import studentReducer from './slices/studentSlice';
import tpoReducer from './slices/tpoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    tpo: tpoReducer,
  },
});

export default store;
