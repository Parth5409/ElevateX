import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as studentService from '../../services/studentService';

const initialState = {
  profile: null,
  internships: [],
  notifications: [],
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('student/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    return await studentService.getStudentProfile();
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to fetch profile');
  }
});

export const updateProfile = createAsyncThunk('student/updateProfile', async (data, { rejectWithValue }) => {
  try {
    return await studentService.updateStudentProfile(data);
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to update profile');
  }
});

export const fetchInternships = createAsyncThunk('student/fetchInternships', async (_, { rejectWithValue }) => {
  try {
    return await studentService.getStudentInternships();
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to fetch internships');
  }
});

export const requestInternship = createAsyncThunk('student/requestInternship', async (data, { rejectWithValue }) => {
  try {
    return await studentService.submitInternship(data);
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to submit internship');
  }
});

export const fetchNotifications = createAsyncThunk('student/fetchNotifications', async (_, { rejectWithValue }) => {
  try {
    return await studentService.getStudentNotifications();
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to fetch notifications');
  }
});

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInternships.fulfilled, (state, action) => {
        state.internships = action.payload;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      });
  },
});

export default studentSlice.reducer;
